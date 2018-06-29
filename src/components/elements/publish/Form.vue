<template lang="pug">
  section.publish-form(:class="{'_loaded': loaded}")
    .publish-form__title: h1 Отправить новость
    .publish-form__content
      form.publish-form__form(
        @submit.prevent=""
      )
        .publish-form__row
          .publish-form__row-title Название
          Textarea(
            :error="getErrorMessage($v.title)"
            :valid="!$v.title.$invalid"
            @input="$v.title.$touch()"
            v-model="title"
            :maxlength="140"
          )
        .publish-form__row
          .publish-form__row-title
            span Символьный код
            span.publish-form__question
              Icon(
                :name="'question'"
                width=16
                height=16
                v-tooltip.click.top=`{
                  content: 'Адрес, который будет выводиться в url. Должен быть уникальным.'
                }`
              )
          Textarea(
            :error="getErrorMessage($v.code)"
            :valid="!$v.code.$invalid"
            @input="$v.code.$touch()"
            v-model="code"
            :maxlength="50"
          )
        .publish-form__row
          .publish-form__row-title Категория
          Textarea(
            :error="getErrorMessage($v.category)"
            :valid="!$v.category.$invalid"
            @input="$v.category.$touch()"
            v-model="category"
            :maxlength="50"
          )
        .publish-form__row
          .publish-form__row-title Путь к картинке для анонса
          Textarea(
            :rows=1
            v-model="previewPicture"
            :maxlength="1000"
          )
        .publish-form__row
          .publish-form__row-title Описание для анонса
          Textarea(
            :rows=3
            v-model="previewText"
            :maxlength="311"
          )
        .publish-form__row
          .publish-form__row-title
            span Детальное описание
            span.publish-form__question
              Icon(
                :name="'question'"
                width=16
                height=16
                v-tooltip.click.top=`{
                  content: 'Можно использовать HTML.'
                }`
              )
          Textarea(
            :rows=5
            :error="getErrorMessage($v.detailText)"
            :valid="!$v.detailText.$invalid"
            @input="$v.detailText.$touch()"
            v-model="detailText"
            :maxlength="5000"
          )
        .publish-form__row._controls
          Button(
            :view="'fz16'"
            @click="submit"
          ) Отправить
          Button(
            v-if="this.state === 'edit'"
            :view="'fz16'"
            @click="$router.push('/blog/')"
          ) Отмена
</template>

<script>
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import Textarea from 'Components/elements/general/Textarea';
import Button from 'Components/elements/general/Button';
import Icon from 'Components/elements/general/Icon';
import callErrorModal from '@/helpers/callErrorModal';

export default {
  components: {
    Textarea,
    Button,
    Icon,
  },
  props: {
    postCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      id: '',
      title: '',
      code: '',
      category: '',
      previewPicture: '',
      previewText: '',
      detailText: '',
      submitted: false,
      loaded: false,
    };
  },
  computed: {
    ...mapState({
      userId: state => state.auth.userId,
      username: state => state.auth.username,
    }),
    state() {
      return this.postCode && this.postCode.length ? 'edit' : 'post';
    },
  },
  created() {
    this.loaded = true;
    if (this.state === 'edit') {
      this.fetchData(this.postCode);
    }
    this.$Progress.finish();
  },
  watch: {
    state(type) {
      if (type === 'edit') {
        this.fetchData(this.postCode);
      }
    },
  },
  methods: {
    getErrorMessage(field) {
      let message = '';

      if (field.$error && this.submitted) {
        if (field.checkTitle === false) {
          message = 'Только буквы, числа и пунктуация: ", . : ; ! ?"';
        }

        if (field.checkCode === false) {
          message = 'Только латиница и числа';
        }

        if (field.required === false) {
          message = 'Обязательное поле';
        }
      }

      return message;
    },
    submit() {
      this.$v.$touch();
      this.submitted = true;

      if (!this.$v.$invalid) {
        let method = 'post';

        if (this.state === 'edit') {
          method = 'put';
        }

        this.axios[method]('/api/posts/', {
          title: this.title,
          id: this.id,
          code: this.code.toLowerCase(),
          category: this.category ? this.category : 'Без категории',
          previewText: this.previewText,
          previewPicture: this.previewPicture,
          detailText: this.detailText,
          username: this.username,
          userId: this.userId,
        }).then((response) => {
          this.$modal.show('response', { message: response.data.message });

          this.submitted = false;
          this.title = '';
          this.code = '';
          this.category = '';
          this.previewPicture = '';
          this.previewText = '';
          this.detailText = '';

          this.$router.push('/blog/');
        }).catch((error) => {
          callErrorModal(this, error);
        });
      }
    },
    fetchData(code) {
      this.axios.get(`/api/posts/post/${code}/`).then((response) => {
        this.id = response.data.post._id;
        this.title = response.data.post.title;
        this.code = response.data.post.code;
        this.category = response.data.post.category;
        this.previewPicture = response.data.post.previewPicture;
        this.previewText = response.data.post.previewText;
        this.detailText = response.data.post.detailText;
      }).catch((error) => {
        this.$router.push('/publish/');
        callErrorModal(this, error);
      });
    },
  },
  validations() {
    const checkTitle = (value) => {
      if (typeof value === 'undefined' || value === null || value === '') {
        return true;
      }
      return !/[^(а-яА-ЯЁёa-zA-Z0-9,.:;!?\-\s)]/.test(value);
    };

    const checkCode = (value) => {
      if (typeof value === 'undefined' || value === null || value === '') {
        return true;
      }
      return !/[^(a-zA-Z0-9)]/.test(value);
    };

    return {
      title: { checkTitle, required },
      category: { checkTitle },
      code: { checkCode, required },
      detailText: { required },
    };
  },
};
</script>

<style lang="stylus">
  .publish-form
    card()
    opacity 0
    transition opacity .2s

    &._loaded
      opacity 1

    &__title
      margin-bottom 45px

      h1
        font-family 'Roboto Slab', sans-serif
        margin 0
        font-size 34px
        font-weight normal

    &__row

      &._controls
        text-align right

        button + button
          margin-left 10px

      & + &
        margin-top 25px

    &__row-title
      font-family 'Roboto Slab', sans-serif
      font-size 18px
      margin-bottom 15px

    &__question
      position relative
      top 2px
      left 10px
      cursor pointer

    +phone()
      padding-top 20px

      &__title
        margin-bottom 25px
        text-align center

        h1
          font-size 24px

      &__row-title
        font-size 16px
        margin-bottom 10px

      &__row

        & + &
          margin-top 15px

        &._controls
          margin-top 20px

</style>

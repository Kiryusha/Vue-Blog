<template lang="pug">
  section.publish(:class="{'_loaded': loaded}")
    .title: h1 Отправить новость
    .content
      form.form(
        @submit.prevent=""
      )
        .row
          .row-title Название
          Textarea(
            :error="getErrorMessage($v.title)"
            :valid="!$v.title.$invalid"
            @input="$v.title.$touch()"
            v-model="title"
            :maxlength="140"
          )
        .row
          .row-title
            span Символьный код
            span.question
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
        .row
          .row-title Категория
          Textarea(
            :error="getErrorMessage($v.category)"
            :valid="!$v.category.$invalid"
            @input="$v.category.$touch()"
            v-model="category"
            :maxlength="50"
          )
        .row
          .row-title Путь к картинке для анонса
          Textarea(
            :rows=1
            v-model="previewPicture"
            :maxlength="1000"
          )
        .row
          .row-title Описание для анонса
          Textarea(
            :rows=3
            v-model="previewText"
            :maxlength="311"
          )
        .row
          .row-title
            span Детальное описание
            span.question
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
        .row._controls
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
import { mapState, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import Textarea from 'Components/elements/general/Textarea';
import Button from 'Components/elements/general/Button';
import Icon from 'Components/elements/general/Icon';

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
      post: state => state.post.data,
      userId: state => state.user.id,
      username: state => state.user.name,
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
    ...mapActions([
      'fetchPost',
      'sendPost',
      'updatePost',
    ]),
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
    async submit() {
      this.$v.$touch();
      this.submitted = true;

      if (!this.$v.$invalid) {
        const data = {
          title: this.title,
          id: this.id,
          code: this.code.toLowerCase(),
          category: this.category ? this.category : 'Без категории',
          previewText: this.previewText,
          previewPicture: this.previewPicture,
          detailText: this.detailText,
          username: this.username,
          userId: this.userId,
        };

        if (this.state === 'edit') {
          this.response = await this.updatePost(data);
        } else {
          this.response = await this.sendPost(data);
        }

        if (this.response) {
          this.$modal.show('response', { message: this.response.data.message });
        }

        this.submitted = false;
        this.title = '';
        this.code = '';
        this.category = '';
        this.previewPicture = '';
        this.previewText = '';
        this.detailText = '';

        this.$router.push('/blog/');
      }
    },
    async fetchData(code) {
      await this.fetchPost(code);

      this.id = this.post._id;
      this.title = this.post.title;
      this.code = this.post.code;
      this.category = this.post.category;
      this.previewPicture = this.post.previewPicture;
      this.previewText = this.post.previewText;
      this.detailText = this.post.detailText;
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

<style lang="stylus" scoped>
  .publish
    card()
    opacity 0
    transition opacity .2s

    &._loaded
      opacity 1

    .title
      margin-bottom 45px

      h1
        font-family 'Roboto Slab', sans-serif
        margin 0
        font-size 34px
        font-weight normal

    .row

      &._controls
        text-align right

        button + button
          margin-left 10px

      & + .row
        margin-top 25px

    .row-title
      font-family 'Roboto Slab', sans-serif
      font-size 18px
      margin-bottom 15px

    .question
      position relative
      top 2px
      left 10px
      cursor pointer

    +phone()
      padding-top 20px

      .title
        margin-bottom 25px
        text-align center

        h1
          font-size 24px

      .row-title
        font-size 16px
        margin-bottom 10px

      .row

        & + .row
          margin-top 15px

        &._controls
          margin-top 20px

</style>

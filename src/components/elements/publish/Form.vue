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
            :error="getErrorMessage($v.title)",
            :valid="!$v.title.$invalid",
            @input="$v.title.$touch()",
            v-model="title",
            :maxlength="200"
          )
        .publish-form__row
          .publish-form__row-title Символьный код
          Textarea(
            :error="getErrorMessage($v.code)",
            :valid="!$v.code.$invalid",
            @input="$v.code.$touch()",
            v-model="code",
            :maxlength="50"
          )
        .publish-form__row
          .publish-form__row-title Категория
          Textarea(
            :error="getErrorMessage($v.category)",
            :valid="!$v.category.$invalid",
            @input="$v.category.$touch()",
            v-model="category",
            :maxlength="50"
          )
        .publish-form__row
          .publish-form__row-title Путь к картинке для анонса
          Textarea(
            :rows=1
            v-model="previewPicture",
            :maxlength="1000"
          )
        .publish-form__row
          .publish-form__row-title Описание для анонса
          Textarea(
            :rows=3
            v-model="previewText",
            :maxlength="1000"
          )
        .publish-form__row
          .publish-form__row-title Детальное описание,
            b  HTML
          Textarea(
            :rows=5
            :error="getErrorMessage($v.detailText)",
            :valid="!$v.detailText.$invalid",
            @input="$v.detailText.$touch()",
            v-model="detailText",
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
            @click="$router.push({ path: '/blog/' })"
          ) Отмена
</template>

<script>
import axios from 'axios';
import { required } from 'vuelidate/lib/validators';
import Textarea from '../../elements/general/Textarea';
import Button from '../../elements/general/Button';

export default {
  components: {
    Textarea,
    Button,
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
      sadfsd: 'asdfasd',
    };
  },
  computed: {
    state() {
      return this.postCode && this.postCode.length ? 'edit' : 'post';
    },
  },
  mounted() {
    this.loaded = true;
    this.$Progress.finish();
    if (this.state === 'edit') {
      this.fetchData(this.postCode);
    }
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
        this.$Progress.start();

        let method = 'post';

        if (this.state === 'edit') {
          method = 'put';
        }

        axios[method]('/api/posts/', {
          title: this.title,
          id: this.id,
          code: this.code.toLowerCase(),
          category: this.category,
          previewText: this.previewText,
          previewPicture: this.previewPicture,
          detailText: this.detailText,
          username: this.$store.state.username,
          userId: this.$store.state.userId,
        }).then((res) => {
          if (res.status === 200) {
            this.$modal.show('response', { message: res.data.message });

            if (res.data.unique) {
              this.submitted = false;
              this.title = '';
              this.code = '';
              this.category = '';
              this.previewPicture = '';
              this.previewText = '';
              this.detailText = '';
            }

            if (res.data.unique ||
                res.data.success) {
              this.$router.push('/blog/');
            }
          }

          this.$Progress.finish();
        });
      }
    },
    fetchData(code) {
      this.$Progress.start();

      axios.get(`/api/posts/post/${code}/`).then((response) => {
        if (response.data) {
          this.id = response.data._id;
          this.title = response.data.title;
          this.code = response.data.code;
          this.category = response.data.category;
          this.previewPicture = response.data.previewPicture;
          this.previewText = response.data.previewText;
          this.detailText = response.data.detailText;
        }
        this.$Progress.finish();
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
      category: { checkTitle, required },
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

</style>

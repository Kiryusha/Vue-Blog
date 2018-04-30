<template lang="pug">
  section.publish-form
      .publish-form__title: h1 Отправить новость
      .publish-form__content
        form.publish-form__form(
          @submit.prevent="onSubmit"
        )
          .publish-form__row
            .publish-form__row-title Название
            Textarea(
              :error="getErrorMessage($v.title)",
              :valid="!$v.title.$invalid",
              @input="$v.title.$touch()",
              v-model="title"
            )
          .publish-form__row
            .publish-form__row-title Символьный код
            Textarea(
              :error="getErrorMessage($v.code)",
              :valid="!$v.code.$invalid",
              @input="$v.code.$touch()",
              v-model="code"
            )
          .publish-form__row
            .publish-form__row-title Категория
            Textarea(
              :error="getErrorMessage($v.category)",
              :valid="!$v.category.$invalid",
              @input="$v.category.$touch()",
              v-model="category"
            )
          .publish-form__row
            .publish-form__row-title Разметка новости,
              b  HTML
            Textarea(
              :rows=5
              :error="getErrorMessage($v.markup)",
              :valid="!$v.markup.$invalid",
              @input="$v.markup.$touch()",
              v-model="markup"
            )
          .publish-form__row._tar
            Button Отправить
</template>

<script>
// import axios from 'axios';
import { required } from 'vuelidate/lib/validators';
import Textarea from '../../elements/general/Textarea';
import Button from '../../elements/general/Button';

export default {
  components: {
    Textarea,
    Button,
  },
  data() {
    return {
      title: '',
      code: '',
      category: '',
      markup: '',
      submitted: false,
    };
  },
  mounted() {
    this.$Progress.finish();
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
          message = 'Поле обязательно для заполнения';
        }
      }

      return message;
    },
    onSubmit() {
      this.$v.$touch();
      this.submitted = true;

      if (!this.$v.$invalid) {
        // this.$Progress.start();

        this.$modal.show('response');

        // axios.post('/static/data/post.json', {
        //   TITLE: this.title,
        //   CATEGORY: this.category,
        //   MARKUP: this.markup,
        // }).then((response) => {
        //   this.$Progress.finish();
        // });
      }
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
      markup: { required },
    };
  },
};
</script>

<style lang="stylus">
  .publish-form
    card()

    &__title
      margin-bottom 45px

      h1
        font-family 'Roboto Slab', sans-serif
        margin 0
        font-size 34px
        font-weight normal

    &__row

      &._tar
        text-align right

      & + &
        margin-top 25px

    &__row-title
      font-family 'Roboto Slab', sans-serif
      font-size 18px
      margin-bottom 15px

</style>

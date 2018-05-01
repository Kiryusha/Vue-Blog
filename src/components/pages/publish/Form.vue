<template lang="pug">
  section.publish-form(:class="{'_loaded': loaded}")
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
            .publish-form__row-title Описание для анонса,
              |  текст
            Textarea(
              :rows=3
              :error="getErrorMessage($v.previewText)",
              :valid="!$v.previewText.$invalid",
              @input="$v.previewText.$touch()",
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
          .publish-form__row._tar
            Button Отправить
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
  data() {
    return {
      title: '',
      code: '',
      category: '',
      previewText: '',
      detailText: '',
      submitted: false,
      loaded: false,
    };
  },
  mounted() {
    this.loaded = true;
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
        this.$Progress.start();

        axios.post('/api/', {
          title: this.title,
          code: this.code.toLowerCase(),
          category: this.category,
          previewText: this.previewText,
          detailText: this.detailText,
        }).then((res) => {
          if (res.status === 200) {
            this.$modal.show('response', { message: res.data.data.message });

            if (res.data.data.unique) {
              this.submitted = false;
              this.title = '';
              this.code = '';
              this.category = '';
              this.previewText = '';
              this.detailText = '';
            }
          }

          this.$Progress.finish();
        });
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
      previewText: { required },
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

      &._tar
        text-align right

      & + &
        margin-top 25px

    &__row-title
      font-family 'Roboto Slab', sans-serif
      font-size 18px
      margin-bottom 15px

</style>

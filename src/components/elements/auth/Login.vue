<template lang="pug">
  .login(
    @submit.prevent="onSubmit"
  )
    .login__response(v-if="response && response.length") {{response}}
    .login__tab-heads
      Button.login__tab-head(
        :class="{'_active': state === 'login'}"
        :view="'login'"
        :type="'span'"
        @click="changeState('login')"
      )
      Button.login__tab-head(
        :class="{'_active': state === 'register'}"
        :view="'register'"
        :type="'span'"
        @click="changeState('register')"
      )
    .login__content
      form.login__block(v-if="state === 'login'")
        .login__row
          Input.login__input(
            :type="'email'"
            key="loginEmail"
            :name="'loginEmail'"
            placeholder="E-mail"
            :maxlength="100"
            :error="getErrorMessage($v.email)"
            :valid="!$v.email.$invalid"
            @input="$v.email.$touch()"
            v-model="email"
          )
        .login__row
          Input.login__input(
            :type="'password'"
            key="loginPassword"
            :name="'loginPassword'"
            placeholder="Пароль"
            :maxlength="100"
            :error="getErrorMessage($v.password)"
            :valid="!$v.password.$invalid"
            @input="$v.password.$touch()"
            v-model="password"
          )
        .login__row
          Button.login__submit._w100 авторизоваться
      form.login__block(v-if="state === 'register'")
        .login__row
          Input.login__input(
            :type="'text'"
            key="regName"
            :name="'regName'"
            placeholder="Имя"
            :maxlength="50"
            :error="getErrorMessage($v.name)"
            :valid="!$v.name.$invalid"
            @input="$v.name.$touch()"
            v-model="name"
          )
        .login__row
          Input.login__input(
            :type="'email'"
            key="regEmail"
            :name="'regEmail'"
            placeholder="E-mail"
            :maxlength="100"
            :error="getErrorMessage($v.email)"
            :valid="!$v.email.$invalid"
            @input="$v.email.$touch()"
            v-model="email"
          )
        .login__row
          Input.login__input(
            :type="'password'"
            key="regPassword"
            :name="'regPassword'"
            placeholder="Пароль"
            :maxlength="100"
            :error="getErrorMessage($v.password)"
            :valid="!$v.password.$invalid"
            @input="$v.password.$touch()"
            v-model="password"
          )
        .login__row
          Button.login__submit._w100 зарегистрироваться
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import Button from 'Components/elements/general/Button';
import Input from 'Components/elements/general/Input';
import callErrorModal from '@/helpers/callErrorModal';

export default {
  components: {
    Button,
    Input,
  },
  data() {
    return {
      state: 'login',
      name: '',
      password: '',
      email: '',
      submitted: false,
      response: '',
    };
  },
  methods: {
    getErrorMessage(field) {
      let message = '';

      if (field.$error && this.submitted) {
        if (field.checkTitle === false) {
          message = 'Только буквы, числа и пунктуация';
        }

        if (field.email === false) {
          message = 'Некорректный email';
        }

        if (field.required === false) {
          message = 'Обязательное поле';
        }
      }

      return message;
    },
    onSubmit() {
      this.$v.$touch();
      this.submitted = true;

      if (!this.$v.$invalid) {
        this.$Progress.start();
        this.submitted = false;

        this.$store.dispatch(this.state, {
          name: this.name,
          email: this.email,
          password: this.password,
        }).then(() => {
          this.$modal.hide('auth');

          this.$Progress.finish();
        }).catch((error) => {
          if (error.response && error.response.status === 400) {
            this.response = error.response.data.message;
            this.$Progress.fail();
          } else {
            callErrorModal(this, error);
          }
        });
      }
    },
    changeState(state) {
      this.state = state;
      this.$v.$reset();
    },
  },
  validations() {
    const schema = {};

    const checkTitle = (value) => {
      if (typeof value === 'undefined' || value === null || value === '') {
        return true;
      }
      return !/[^(а-яА-ЯЁёa-zA-Z0-9,.:;!?\-\s)]/.test(value);
    };

    switch (this.state) {
      case 'register':
        Object.assign(schema, {
          name: { checkTitle, required },
          email: { email, required },
          password: { required },
        });
        break;
      case 'login':
        Object.assign(schema, {
          email: { email, required },
          password: { required },
        });
        break;
      default:
    }

    return schema;
  },
};
</script>

<style lang="stylus">
  .login
    padding-bottom 20px
    border-bottom 1px solid #0
    margin-bottom 20px

    &__row

      & + &
        margin-top 10px

    &__tab-heads
      display flex
      justify-content space-between
      margin-bottom 10px

    &__response
      font-size 16px
      text-align center
      margin-top -5px
      margin-bottom 10px

</style>

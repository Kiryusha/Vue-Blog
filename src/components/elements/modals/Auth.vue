<template lang="pug">
  modal(
    name="auth",
    width="100%",
    height="auto"
  )
    .modal._auth
      .modal__content
        .modal__title Авторизация
        .modal__login
          Login
        .modal__socials
          Button(
            :view="'github-auth'",
            @click="authenticate('github')"
          ) Я у мамы программист
          Button(
            :view="'google-auth'",
            @click="authenticate('google')"
          ) google
        .modal__close
          Button(
            @click="$modal.hide('auth')"
          ) Закрыть
</template>

<script>
import Button from '../general/Button';
import Login from '../auth/Login';

export default {
  components: {
    Button,
    Login,
  },
  data() {
    return {
      title: '',
      response: '',
    };
  },
  methods: {
    authenticate(provider) {
      this.$Progress.start();
      this.$store.dispatch('authenticate', { provider }).catch((error) => {
        this.$modal.show('response', { message: error.message });
        this.$Progress.finish();
      });
      this.$modal.hide('auth');
    },
  },
};
</script>

<style lang="stylus">
  @import '../../../styles/modal';
</style>

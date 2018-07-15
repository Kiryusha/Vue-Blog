<template lang="pug">
  modal(
    name="auth",
    width="100%",
    height="auto"
  )
    ModalWrapper._auth
      .content
        .title Авторизация
        .login
          Login
        .socials
          Button(
            :view="'github-auth'",
            @click="authenticate('github')"
          ) Я у мамы программист
          Button(
            :view="'google-auth'",
            @click="authenticate('google')"
          ) google
        .close
          Button(
            @click="$modal.hide('auth')"
          ) Закрыть
</template>

<script>
import ModalWrapper from 'Components/elements/modals/Modal';
import Button from 'Components/elements/general/Button';
import Login from 'Components/elements/auth/Login';
import callErrorModal from '@/helpers/callErrorModal';

export default {
  components: {
    ModalWrapper,
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
      this.$store.dispatch('authenticate', { provider }).catch((error) => {
        callErrorModal(this, error);
      });
      this.$modal.hide('auth');
    },
  },
};
</script>

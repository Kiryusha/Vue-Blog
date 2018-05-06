<template lang="pug">
  modal(
    name="auth",
    width="100%",
    height="auto"
  )
    .modal._auth
      .modal__content
        .modal__title Авторизация
        .modal__socials
          Button(
            :view="'github-auth'"
            @click="authenticate('github')"
          ) Я у мамы программист
          Button(
            :view="'google-auth'"
            @click="authenticate('google')"
          ) google
        .modal__close
          Button(
            @click="$modal.hide('auth')"
          ) Закрыть
</template>

<script>
import Button from '../general/Button';

export default {
  components: {
    Button,
  },
  data() {
    return {
      title: '',
    };
  },
  methods: {
    authenticate(provider) {
      this.$Progress.start();
      this.$store.dispatch('authenticate', { provider });
      this.$modal.hide('auth');
    },
  },
};
</script>

<style lang="stylus">
  @import '../../../styles/modal';
</style>

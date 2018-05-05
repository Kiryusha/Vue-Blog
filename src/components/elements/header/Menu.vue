<template lang="pug">
  .header-menu
    .header-menu__item
      span.header-menu__divider /
      router-link.header-menu__link(
        :to="'/blog/'"
      ) Блог
    .header-menu__item(v-if="isAuthenticated")
      span.header-menu__divider /
      router-link.header-menu__link(
        :to="'/publish/'"
      ) Опубликовать
    .header-menu__item(v-if="!isAuthenticated")
      span.header-menu__divider /
      span.header-menu__link(
        @click="$modal.show('auth')"
      ) Войти
      span.header-menu__divider /
    .header-menu__item(v-if="isAuthenticated")
      span.header-menu__divider /
      span.header-menu__link(
        @click="logout()"
      ) Выйти
      span.header-menu__divider /
</template>

<script>
export default {
  data() {
    return {
      response: null,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$Progress.start();
      this.$store.dispatch('authLogout');
      if (this.$route.path === '/publish/') {
        this.$router.push({ path: '/blog/' });
      }
    },
  },
};
</script>

<style lang="stylus">
  .header-menu
    display flex
    padding-top 5px
    flex-wrap wrap
    font-family 'Roboto Slab', sans-serif

    &__item
      font-size 14px

    &__link
      a-reset()
      margin 0 16px
      cursor pointer

      &._active
        font-weight bold

</style>

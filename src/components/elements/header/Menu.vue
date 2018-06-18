<template lang="pug">
  .header-menu
    .header-menu__item
      router-link.header-menu__link(
        :to="'/blog/'"
      ) Блог
    .header-menu__item(v-if="isAuthenticated")
      router-link.header-menu__link(
        :to="'/publish/'"
      ) Опубликовать
    .header-menu__item(v-if="!isAuthenticated")
      span.header-menu__link(
        @click="$modal.show('auth')"
      ) Войти
    .header-menu__item(v-if="isAuthenticated")
      span.header-menu__link(
        @click="logout()"
      ) Выйти
</template>

<script>
import { mapState } from 'vuex';
import callErrorModal from '@/helpers/callErrorModal';

export default {
  data() {
    return {
      response: null,
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
    }),
  },
  methods: {
    logout() {
      this.$Progress.start();
      this.$store.dispatch('authLogout').catch((error) => {
        callErrorModal(this, error);
      });
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
      position relative
      padding-right 6px

      &:after
        content '/'
        position absolute
        top 0
        right 0

      &:first-child
        padding-left 6px

        &:before
          content '/'
          position absolute
          top 0
          left 0

    &__link
      a-reset()
      margin 0 16px
      cursor pointer

      &._active
        font-weight bold

    +phone()
      flex-direction column

      &__item,
      &__item:first-child
        padding 0
        margin-top 10px

        &:after,
        &:before
          display none

      &__link,
      &__item:first-child &__link
        font-size 18px
        color #f

</style>

<template lang="pug">
  .header-menu
    .header-menu__item
      span.header-menu__divider /
      router-link.header-menu__link(
        :to="'/blog/'"
      ) Блог
    //- .header-menu__item
    //-   span.header-menu__divider /
    //-   a.header-menu__link(
    //-     href="#",
    //-     @click="handleLogin()"
    //-   ) Авторизоваться
    .header-menu__item
      span.header-menu__divider /
      router-link.header-menu__link(
        :to="'/publish/'"
      ) Опубликовать
      span.header-menu__divider /
</template>

<script>
export default {
  methods: {
    handleLogin() {

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

      &._active
        font-weight bold

</style>

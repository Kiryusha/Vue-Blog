<template lang="pug">
  .header-menu
    .header-menu__item
      span.header-menu__divider /
      a.header-menu__link(href="#") Проекты
    .header-menu__item
      span.header-menu__divider /
      router-link.header-menu__link(
        :to="'/'"
      ) Блог
    .header-menu__item
      span.header-menu__divider /
      router-link.header-menu__link(
        :to="'/detail/'"
      ) Детальная
    .header-menu__item
      span.header-menu__divider /
      a.header-menu__link(href="#") Контакты
      span.header-menu__divider /
</template>

<script>
export default {
};
</script>

<style lang="stylus">
  .header-menu
    display flex
    padding-top 5px
    flex-wrap wrap

    &__item
      font-size 14px

    &__link
      a-reset()
      margin 0 16px

</style>

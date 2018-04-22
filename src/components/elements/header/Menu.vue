<template lang="pug">
  .header-menu
    .header-menu__item
      span.header-menu__divider /
      a.header-menu__link(href="#") Проекты
    .header-menu__item
      span.header-menu__divider /
      a.header-menu__link(href="#") Блог
    .header-menu__item
      span.header-menu__divider /
      a.header-menu__link(href="#") Детальная
    .header-menu__item
      span.header-menu__divider /
      a.header-menu__link(href="#") Контакты
      span.header-menu__divider /
</template>

<script>
export default {
}
</script>

<style lang="stylus">
//  @import '../../../styles/mixins.styl';

  .header-menu
    display flex
    padding-top 5px

    &__divider
      margin-left 16px

    &__item
      font-size 14px

    &__link
      a-reset()
      margin-left 16px

</style>

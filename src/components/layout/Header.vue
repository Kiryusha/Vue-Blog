<template lang="pug">
  header.header
    .container
      .header__content
        router-link(
          class="header__logo",
          :to="'/'"
        ) Kiryusha
        .header__menu
          Menu
</template>

<script>
import Menu from '../elements/header/Menu'

export default {
  components: {
    Menu
  }
}
</script>

<style lang="stylus">
  .header
    background $yellow

    &__content
      padding 30px 0
      display flex
      align-items center

    &__logo
      a-reset()
      font-size 30px
      margin 0 16px 0 0

    +mobile()

      &__logo
        margin 0 0 8px 0

      &__content
        align-items flex-start
        flex-direction column
</style>

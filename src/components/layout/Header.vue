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
    background #EEC80D

    &__content
      padding 30px 0
      display flex
      align-items center

    &__logo
      a-reset()
      font-size 30px
</style>

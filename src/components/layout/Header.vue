<template lang="pug">
  header.header(
    :class="{'_fixed': isHeaderFixed}",
    ref="header"
  )
    .container
      .header__content
        router-link(
          class="header__logo",
          :to="'/'"
        ) Kiryusha
        .header__menu
          Menu
    vue-progress-bar
</template>

<script>
import Menu from '../elements/header/Menu';

export default {
  data() {
    return {
      scrollPosition: 0,
      isHeaderFixed: false,
      height: 0,
    };
  },
  components: {
    Menu,
  },
  mounted() {
    this.height = this.$refs.header.clientHeight;
    window.addEventListener('scroll', this.updateHeader);
  },
  methods: {
    updateHeader() {
      this.scrollPosition = window.scrollY;
      this.isHeaderFixed = this.scrollPosition > this.height + 20;
    },
  },
};
</script>

<style lang="stylus">
  .header
    position absolute
    top 0
    left 0
    right 0
    background $yellow
    transition .2s
    box-shadow 0 0 20px rgba(0, 0, 0, .2)

    .__cov-progress
      top 94px !important
      opacity 1 !important

    &__content
      padding 30px 0
      display flex
      align-items center

    &__logo
      a-reset()
      font-size 30px
      margin 0 16px 0 0

    &._fixed
      position fixed
      animation fadeIn .2s

      .__cov-progress
        top 54px !important

    &._fixed &__content
      padding 9px 0 11px

    +mobile()

      .__cov-progress
        top 123px !important

      &__logo
        margin 0 0 8px 0

      &__content
        align-items flex-start
        flex-direction column
</style>

<template lang="pug">
  header.header(
    :class="{'_fixed': isHeaderFixed}"
    ref="header"
  )
    .container
      .content
        .left
          router-link.logo(:to="'/'") Kosk
          a.menu-btn(
            :class="{'_active': isMenuActive}"
            href="#"
            @click.prevent="toggleMenu()"
          )
            span
            span
            span
          .menu-wrapper(:class="{'_active': isMenuActive}")
            Menu
        .user(v-if="userId")
          span Привет,
          b  {{ username }}
          | !
    vue-progress-bar
</template>

<script>
import { mapState } from 'vuex';
import Menu from 'Components/elements/header/Menu';

export default {
  components: {
    Menu,
  },
  data() {
    return {
      scrollPosition: 0,
      isHeaderFixed: false,
      height: 0,
      isMenuActive: false,
    };
  },
  computed: {
    ...mapState({
      userId: state => state.user.id,
      username: state => state.user.name,
    }),
  },
  mounted() {
    this.height = this.$refs.header.clientHeight;
    window.addEventListener('scroll', this.updateHeader);
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateHeader);
  },
  methods: {
    updateHeader() {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      this.isHeaderFixed = this.scrollTop > this.height + 20;
    },
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .header
    position absolute
    top 0
    left 0
    right 0
    background $yellow
    transition .2s
    box-shadow 0 0 20px rgba(0, 0, 0, .2)
    z-index 100

    &._fixed
      position fixed
      animation fadeIn .2s

      .__cov-progress
        top 54px !important

    &._fixed .content
      padding 9px 10px 11px

  .__cov-progress
    top 94px !important
    opacity 1 !important
    position absolute !important

  .content
    padding 30px 0
    display flex
    align-items center
    justify-content space-between

  .left
    display flex
    align-items center

  .logo
    a-reset()
    font-size 30px
    margin 0 16px 0 0
    font-family 'Roboto Slab', sans-serif

  .user
    font-family 'Roboto Slab', sans-serif

  .menu-btn
    display none

  +phone()
    .header
      position fixed

      &._fixed
        animation none

    .__cov-progress
      top 54px !important

    .content
      padding 9px 10px 11px

    .menu-btn
      display block
      width 54px
      height 54px
      position absolute
      top 0
      left 100px
      cursor pointer
      background $yellow
      outline none

      &:active
        background $yellowDark

      span
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        height 3px
        width 24px
        margin auto
        background #3
        transition .2s

      span:first-child
        top 19px
        bottom auto

      span:last-child
        top auto
        bottom 18px

    .menu-btn._active

      span
        opacity 0

      span:first-child
        opacity 1
        top 26px
        transform rotate(45deg)

      span:last-child
        opacity 1
        bottom 25px
        transform rotate(-45deg)

    .menu-wrapper
      position fixed
      top 54px
      left 0
      bottom 0
      width 100%
      background rgba(#000, .65)
      transform translateX(-100%)
      transition .2s

      &._active
        transform translateX(0)

    .user
      max-width 145px
      overflow hidden
      text-overflow ellipsis

</style>

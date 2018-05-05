<template lang="pug">
  header.header(
    :class="{'_fixed': isHeaderFixed}",
    ref="header"
  )
    Response
    Auth
    Delete
    .container
      .header__content
        .header__left
          router-link(
            class="header__logo",
            :to="'/'"
          ) Kiryusha
          .header__menu
            Menu
        .header__user(v-if="isAuthenticated")
          span Привет,
          b  {{ username }}
          | !
    vue-progress-bar
</template>

<script>
import Menu from '../elements/header/Menu';
import Response from '../elements/modals/Response';
import Auth from '../elements/modals/Auth';
import Delete from '../elements/modals/Delete';

export default {
  components: {
    Menu,
    Response,
    Auth,
    Delete,
  },
  data() {
    return {
      scrollPosition: 0,
      isHeaderFixed: false,
      height: 0,
    };
  },
  computed: {
    isAuthenticated() {
      this.$Progress.finish();

      return this.$store.state.isAuthenticated;
    },
    username() {
      return this.$store.state.username;
    },
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
      position absolute !important

    &__content
      padding 30px 0
      display flex
      align-items center
      justify-content space-between

    &__left
      display flex
      align-items center

    &__logo
      a-reset()
      font-size 30px
      margin 0 16px 0 0
      font-family 'Roboto Slab', sans-serif

    &._fixed
      position fixed
      animation fadeIn .2s

      .__cov-progress
        top 54px !important

    &._fixed &__content
      padding 9px 0 11px

    &__user
      font-family 'Roboto Slab', sans-serif

    +mobile()

      .__cov-progress
        top 123px !important

      &__logo
        margin 0 0 8px 0

      &__content,
      &__left
        align-items flex-start
        flex-direction column

      &__user
        display none
</style>

<template lang="pug">
  .page
    #app
      Auth
      Response
      Header
      transition(name="fade")
        router-view
</template>

<script>
import Header from '@/components/layout/Header';
import Auth from '@/components/elements/modals/Auth';
import Response from '@/components/elements/modals/Response';

export default {
  name: 'App',
  components: {
    Header,
    Auth,
    Response,
  },
};
</script>

<style lang="stylus">
  @import 'styles/vue-modal';

  .fade-enter-active,
  .fade-leave-active
    transition opacity .2s

  .fade-enter,
  .fade-leave-to
    opacity 0

  *
    box-sizing border-box

  html,
  body,
  .page,
  #app
    height 100%

  .page
    font-family 'Open Sans', sans-serif
    color #3
    padding-top 94px

    +phone()
      padding-top 54px

  .container
    max-width 980px
    margin auto

    +mobile()
      padding 0 15px

    +phone()
      padding 0 10px

</style>

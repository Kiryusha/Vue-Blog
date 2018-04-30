<template lang="pug">
  .page
    #app
      Header
      router-view
</template>

<script>
import Header from '@/components/layout/Header';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style lang="stylus">
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

    +mobile()
      padding-top 123px

  .container
    max-width 980px
    margin auto

    +mobile()
      padding 0 15px

    +phone()
      padding 0 10px

</style>

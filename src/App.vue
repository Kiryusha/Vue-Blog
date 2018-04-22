<template lang="pug">
  .page
    #app
      Header
      router-view
</template>

<script>
import Header from '@/components/layout/header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="stylus">
  .page
    min-height 100vh
    font-family 'Open Sans', sans-serif
    color #3
    padding-bottom 250px

  .container
    max-width 980px
    margin auto

    +mobile()
      padding 0 15px

</style>

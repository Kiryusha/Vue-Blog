<template lang="pug">
  .modal
    slot
</template>

<style lang="stylus" scoped>
  .modal
    height 100%
    background #f2
    width 500px
    margin 20px auto 20px
    padding 20px 20px 60px
    min-height 150px
    position relative
    border 2px solid gray

    &._delete
      width 400px

    &._auth
      width 300px

  .content
    height 100%
    display flex
    flex-wrap wrap
    flex-direction column

  .title
    font-family 'Roboto Slab', sans-serif
    margin 0
    font-size 24px
    font-weight normal
    margin-bottom 20px
    text-align center
    word-wrap break-word

  .socials
    margin 0 auto 20px
    width 100%
    max-width 300px

    button + button
      margin-top 10px

  .close
    position absolute
    bottom 20px
    left 0
    right 0
    display flex
    justify-content center

    button + button
      margin-left 10px

  +phone()
    .modal
      max-width 300px
      width auto

</style>

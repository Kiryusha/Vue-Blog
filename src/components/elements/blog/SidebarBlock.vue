<template lang="pug">
  .sidebar-block
    .sidebar-block__title
      slot(name="title")
    .sidebar-block__content
      slot
</template>

<script>
export default {
};
</script>

<style lang="stylus">
  .sidebar-block
    background #f
    // border 2px solid gray
    box-shadow 0 0 20px rgba(0, 0, 0, .2)

    &__title
      text-align right
      font-weight bold
      padding 20px 25px

    &__content
      background #F7
      padding 12px 15px 12px
</style>

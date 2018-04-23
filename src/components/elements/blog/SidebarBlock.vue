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

    &__title
      text-align right
      font-weight bold
      margin-bottom 15px

    &__content
      background #F7
      padding 12px 15px 12px
</style>

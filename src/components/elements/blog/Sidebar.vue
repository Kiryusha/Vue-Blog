<template lang="pug">
  .sidebar
    .title
      slot(name="title")
    .content
      slot
</template>

<script>
export default {
};
</script>

<style lang="stylus" scoped>
  .sidebar
    background #f
    box-shadow 0 0 20px rgba(0, 0, 0, .2)
    border-radius 3px

  .title
    text-align right
    font-weight bold
    padding 20px 20px 10px

  .content
    background #F7
    padding 20px 20px 20px

  +mobile()

    .title
      text-align left

  +phone()

    .title
      padding 10px 10px 10px

    .content
      padding 10px 10px 10px

</style>

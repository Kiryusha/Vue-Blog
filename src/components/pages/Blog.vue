<template lang="pug">
  .blog
    .container
      .blog__content
        .blog__posts
          Post(v-for="n in 6")
        .blog__sidebar
</template>

<script>
import Post from '../elements/blog/Post'

export default {
  components: {
    Post
  }
}
</script>

<style lang="stylus">
  .blog
    padding-top 60px

    &__content
      display flex

    &__posts
      max-width 640px
</style>

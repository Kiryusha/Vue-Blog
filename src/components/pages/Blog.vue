<template lang="pug">
  .blog
    .container
      .blog__content
        section.blog__posts
          .blog__post(v-for="n in 6")
            Post
        section.blog__sidebar
          SidebarBlock
            span(slot="title") Тэги
            Tags(:tags="tags")
</template>

<script>
import Post from '../elements/blog/Post';
import SidebarBlock from '../elements/blog/SidebarBlock';
import Tags from '../elements/blog/Tags';

export default {
  components: {
    Post,
    SidebarBlock,
    Tags,
  },
  data() {
    return {
      tags: [{
        title: 'Frontend',
        link: 'https://www.google.com',
      }, {
        title: 'Twitch',
        link: 'https://www.google.com',
      }, {
        title: 'Забавное',
        link: 'https://www.google.com',
      }, {
        title: 'Забавное 1',
        link: 'https://www.google.com',
      }, {
        title: 'Забавное 2',
        link: 'https://www.google.com',
      }],
    };
  },
};
</script>

<style lang="stylus">
  .blog
    padding-top 60px

    &__content
      display flex
      justify-content space-between

    &__posts
      max-width 640px
      flex-grow 1

    &__post

      & + &
        margin-top 75px

    &__sidebar
      flex-basis 295px
      margin-left 40px
</style>

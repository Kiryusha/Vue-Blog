<template lang="pug">
  .blog
    .container
      .blog__content
        section.blog__inner
          transition(name="fade")
            router-view(
              :list="list"
            )
        section.blog__sidebar
          SidebarBlock
            span(slot="title") Тэги
            Tags(:tags="tags")
</template>

<script>
import axios from 'axios';
import SidebarBlock from '../elements/blog/SidebarBlock';
import Tags from '../elements/blog/Tags';

export default {
  components: {
    SidebarBlock,
    Tags,
  },
  data() {
    return {
      list: [],
      tags: [],
    };
  },
  mounted() {
    this.fetchData('list', '/static/data/list.json');
    this.fetchData('tags', '/static/data/tags.json');
  },
  methods: {
    fetchData(name, path) {
      axios.get(path).then((response) => {
        this[name] = response.data;
      });
    },
  },
};
</script>

<style lang="stylus">
  .fade-enter-active,
  .fade-leave-active
    transition opacity .2s

  .fade-enter,
  .fade-leave-to
    opacity 0

  .blog
    padding-top 60px

    &__content
      display flex
      justify-content space-between

    &__inner
      max-width 640px
      flex-grow 1

    &__sidebar
      flex-basis 295px
      margin-left 40px
</style>

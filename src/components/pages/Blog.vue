<template lang="pug">
  .blog
    Delete(
      @fetchList="fetchList",
      @fetchCategories="fetchCategories"
    )
    .container
      .blog__content
        section.blog__inner
          router-view(
            :list="list"
          )
        section.blog__sidebar
          SidebarBlock(v-if="categories.length")
            span(slot="title") Категории
            Categories(
              :categories="categories",
              @fetch="fetchList"
            )
</template>

<script>
import axios from 'axios';
import SidebarBlock from '../elements/blog/SidebarBlock';
import Categories from '../elements/blog/Categories';
import Delete from '../elements/modals/Delete';

export default {
  components: {
    SidebarBlock,
    Categories,
    Delete,
  },
  data() {
    return {
      list: [],
      categories: [],
    };
  },
  mounted() {
    this.$Progress.finish();
    this.fetchList();
    this.fetchCategories();
  },
  methods: {
    fetchList(category) {
      this.$Progress.start();

      let api = '/api/posts/';

      if (category) {
        api = `/api/categories/${category}/`;
      }

      axios.get(api).then((response) => {
        this.list = response.data;
        if (category && this.$route.path !== '/blog/') {
          this.$router.push({ path: '/blog/' }, () => {
            this.$Progress.finish();
          });
        } else {
          this.$Progress.finish();
        }
      });
    },
    fetchCategories() {
      this.$Progress.start();

      axios.get('/api/categories/').then((response) => {
        this.categories = response.data;
        this.$Progress.finish();
      });
    },
  },
};
</script>

<style lang="stylus">
  .blog
    min-height 100%
    padding-top 60px
    padding-bottom 250px
    background-attachment fixed
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E");

    &__content
      display flex
      justify-content space-between
      align-items flex-start

    &__inner
      flex-grow 1
      max-width 100%

    &__sidebar
      flex-basis 270px
      min-width 270px
      margin-left 40px
      max-width 100%

    +mobile()
      padding-top 40px

      &__content
        flex-direction column-reverse
        align-items inherit

      &__inner
        max-width none

      &__sidebar
        flex-basis 0
        margin 0 0 40px

    +phone()
      padding-top 20px

      &__sidebar
        margin 0 0 20px
</style>

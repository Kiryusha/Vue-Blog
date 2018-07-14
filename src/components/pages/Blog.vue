<template lang="pug">
  .blog(ref="blog")
    Delete
    .container
      .blog__content
        section.blog__inner
          router-view(
            :list="list"
            :key="$route.fullPath"
          )
        section.blog__sidebar
          Categories(v-if="categories.length")
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Categories from 'Components/elements/blog/Categories';
import Delete from 'Components/elements/modals/Delete';

export default {
  components: {
    Categories,
    Delete,
  },
  created() {
    this.initBlog();
  },
  destroyed() {
    this.removeScroll();
  },
  computed: {
    ...mapState({
      list: state => state.post.list,
      categories: state => state.post.categories,
      currentPage: state => state.post.currentPage,
      activeCategory: state => state.post.activeCategory,
    }),
  },
  methods: {
    ...mapActions([
      'fetchList',
      'fetchCategories',
    ]),
    async initBlog() {
      await Promise.all([
        this.fetchCategories(),
        this.fetchList({}),
      ]);
      this.addScroll();
    },
    endlessScroll() {
      const el = this.$refs.blog;
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + window.innerHeight;
      const bottom = rect.top + scrollTop + el.clientHeight;
      const isBlog = this.$route.path === '/blog/' || this.$route.path === '/blog';
      const page = this.currentPage + 1;

      if (isBlog && bottom <= scrollBottom) {
        this.fetchList({
          activeCategory: this.activeCategory,
          currentPage: page,
          shouldAdd: true,
        });
      }
    },
    addScroll() {
      window.addEventListener('scroll', this.endlessScroll, true);
    },
    removeScroll() {
      window.removeEventListener('scroll', this.endlessScroll, true);
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
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%239C92AC' fill-opacity='0.25' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E");

    &__content
      display flex
      justify-content space-between
      align-items flex-start

    &__inner
      flex-grow 1
      max-width 670px

    &__sidebar
      flex-basis 270px
      min-width 270px
      margin-left 40px
      max-width 100%

    +mobile()

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

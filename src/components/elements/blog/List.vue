<template lang="pug">
  section.blog-list(:class="{'_loaded': list.length}", ref="list")
    .blog-list__content
      .blog-list__item(
        v-for="item in list"
      )
        ListItem(
          :data="item"
        )
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ListItem from 'Components/elements/blog/ListItem';

export default {
  components: {
    ListItem,
  },
  data() {
    return {
      isFetching: false,
    };
  },
  computed: {
    ...mapState({
      list: state => state.post.list,
      currentPage: state => state.post.currentPage,
      activeCategory: state => state.post.activeCategory,
      isBottomReached: state => state.post.isBottomReached,
    }),
  },
  created() {
    window.addEventListener('scroll', this.endlessScroll, true);
  },
  destroyed() {
    window.removeEventListener('scroll', this.endlessScroll, true);
  },
  methods: {
    ...mapActions([
      'fetchList',
    ]),
    async endlessScroll() {
      if (!this.isFetching && !this.isBottomReached) {
        this.isFetching = true;

        const el = this.$refs.list;
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollBottom = scrollTop + window.innerHeight;
        const bottom = rect.top + scrollTop + el.clientHeight;
        const page = this.currentPage + 1;

        if (bottom <= scrollBottom) {
          await this.fetchList({
            activeCategory: this.activeCategory,
            currentPage: page,
          });
        }

        this.isFetching = false;
      }
    },
  },
};
</script>

<style lang="stylus">
  .blog-list
    opacity 0
    transition opacity .2s

    &._loaded
      opacity 1

    &__item

      & + &
        margin-top 40px

    &__title
      font-family 'Roboto Slab', sans-serif
      font-size 30px
      margin-bottom 20px

    &__link
      text-decoration none
      color $yellowDark
      border-bottom 1px solid $yellowDark
      transition .2s

      &:hover
        color $yellow
        border-color $yellow

    +phone()

      &__item

        & + &
          margin-top 20px

</style>

<template lang="pug">
  section.list(:class="{'_loaded': list.length}", ref="list")
    .content
      .list-item(
        v-for="item in list"
      )
        Item(
          :data="item"
        )
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Item from 'Components/elements/blog/Item';

export default {
  components: {
    Item,
  },
  data() {
    return {
      isFetching: false,
    };
  },
  computed: {
    ...mapState({
      list: state => state.list.list,
      currentPage: state => state.list.currentPage,
      activeCategory: state => state.list.activeCategory,
      isBottomReached: state => state.list.isBottomReached,
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

<style lang="stylus" scoped>
  .list
    opacity 0
    transition opacity .2s

    &._loaded
      opacity 1

  .list-item

    & + .list-item
      margin-top 40px

  +phone()

    .list-item

      & + .list-item
        margin-top 20px

</style>

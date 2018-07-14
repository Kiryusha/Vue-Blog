<template lang="pug">
  SidebarBlock
    span(slot="title") Категории
    .categories
      .categories__container
        .categories__item(v-for="item in categories")
          Button(
            :class="{'_active':activeCategory === item}"
            :type="'a'"
            :view="'categories'"
            @click="selectCategory(item)"
          ) {{ item }}
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Button from 'Components/elements/general/Button';
import SidebarBlock from 'Components/elements/blog/SidebarBlock';

export default {
  components: {
    Button,
    SidebarBlock,
  },
  computed: {
    ...mapState({
      categories: state => state.post.categories,
      activeCategory: state => state.post.activeCategory,
    }),
  },
  methods: {
    ...mapActions([
      'fetchList',
    ]),
    async selectCategory(category) {
      if (category !== this.activeCategory) {
        await this.fetchList({
          activeCategory: category,
        });
      } else {
        await this.fetchList({});
      }

      if (this.$route.path !== '/blog/') {
        this.$router.push('/blog/');
      }
    },
  },
};
</script>

<style lang="stylus">
  .categories

    &__container
      display flex
      flex-wrap wrap
      margin 0 -5px -5px 0

    &__item
      margin 0 5px 5px 0
      min-width 47px

</style>

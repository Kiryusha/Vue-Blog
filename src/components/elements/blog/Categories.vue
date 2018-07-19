<template lang="pug">
  Sidebar
    span(slot="title") Категории
    .categories
      .container
        .item(v-for="item in categories")
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
import Sidebar from 'Components/elements/blog/Sidebar';
import callErrorModal from '@/helpers/callErrorModal';

export default {
  components: {
    Button,
    Sidebar,
  },
  computed: {
    ...mapState({
      categories: state => state.list.categories,
      activeCategory: state => state.list.activeCategory,
    }),
  },
  methods: {
    ...mapActions([
      'fetchList',
    ]),
    async selectCategory(category) {
      try {
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
      } catch (error) {
        callErrorModal(this, error);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .container
    display flex
    flex-wrap wrap
    margin 0 -5px -5px 0

  .item
    margin 0 5px 5px 0
    min-width 47px

</style>

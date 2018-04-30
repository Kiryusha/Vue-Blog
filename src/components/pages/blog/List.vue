<template lang="pug">
  section.blog-list(:class="{'_loaded': this.list.length}")
    .blog-list__content
      .blog-list__item(
        v-for="item in list"
      )
        ListItem(
          :data="item"
        )
</template>

<script>
import ListItem from '../../elements/blog/ListItem';

export default {
  components: {
    ListItem,
  },
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
  },
  mounted() {
    if (this.list.length) {
      this.$Progress.finish();
    }
  },
};
</script>

<style lang="stylus">
  .blog-list
    card()
    background transparent
    box-shadow 0 0 20px rgba(0, 0, 0, 0)

    &._loaded
      background #f
      box-shadow 0 0 20px rgba(0, 0, 0, .2)

    &__item

      & + &
        margin-top 75px
</style>

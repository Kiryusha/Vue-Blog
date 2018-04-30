<template lang="pug">
  .blog-list
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
};
</script>

<style lang="stylus">
  .blog-list

    &__item

      & + &
        margin-top 75px
</style>

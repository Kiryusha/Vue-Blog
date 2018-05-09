<template lang="pug">
  section.blog-list(:class="{'_loaded': list.length}")
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
    opacity 0
    transition opacity .2s

    &._loaded
      opacity 1

    &__item

      & + &
        margin-top 75px

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

</style>

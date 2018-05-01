<template lang="pug">
  section.blog-list
    .blog-list__content(v-if="list.length")
      .blog-list__item(
        v-for="item in list"
      )
        ListItem(
          :data="item"
        )
    .blog-list__content(v-else)
      .blog-list__title На данный момент публикаций нет.
      router-link.blog-list__link(
        :to="'/publish/'"
      ) Опубликовать что-нить
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

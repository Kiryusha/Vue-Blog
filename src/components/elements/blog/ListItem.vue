<template lang="pug">
  .blog-list-item
    .blog-list-item__heading
      .blog-list-item__title {{ data.title }}
      .blog-list-item__info {{ data.info }}
    .blog-list-item__text(
      v-html="data.previewText"
    )
    .blog-list-item__controls
      router-link(
        :to="`${data.code}/`",
        tag="span"
      )
        Button(
          :view="'more'",
          :type="'a'"
        ) Подробнее
</template>

<script>
import Button from '../general/Button';

export default {
  components: {
    Button,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="stylus">
  .blog-list-item

    &__title
      font-size 30px

    &__info
      font-size 16px
      color #CF
      padding-top 10px

    &__text
      padding-top 10px
      font-size 16px
      line-height 1.7

    &__controls
      padding-top 20px
      display flex
      justify-content flex-end
</style>

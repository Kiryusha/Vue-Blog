<template lang="pug">
  .blog-list-item
    .blog-list-item__heading
      .blog-list-item__image-wrapper(
        v-if="data.previewPicture",
        :style="`background-image:url(${data.previewPicture});`"
      )
      .blog-list-item__title {{ data.title }}
      .blog-list-item__info {{ date }}
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
import formatDate from '../../../helpers/formatDate';

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
  computed: {
    date() {
      return formatDate(this.data.date);
    },
  },
};
</script>

<style lang="stylus">
  .blog-list-item

    *
      overflow hidden
      text-overflow ellipsis

    &__title
      font-family 'Roboto Slab', sans-serif
      font-size 30px

    &__info
      font-family 'Roboto Slab', sans-serif
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

    &__image-wrapper
      overflow hidden
      width 100%
      height 300px
      background-size cover
      background-position center
      margin-bottom 35px
      border 2px solid gray
</style>

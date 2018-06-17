<template lang="pug">
  .blog-list-item
    .blog-list-item__heading
      router-link.blog-list-item__image-wrapper(
        v-if="data.previewPicture"
        :to="`${data.code}/`"
      )
        .blog-list-item__image(
          :style="`background-image:url(${data.previewPicture});`"
        )
      .blog-list-item__title {{ data.title }}
      .blog-list-item__info {{ date }}, {{ author }}
    .blog-list-item__text {{ data.previewText }}
    .blog-list-item__controls
      Button(
        v-if="isAuthor"
        :view="'delete'"
        :type="'a'"
        @click="$modal.show('delete', { code: data.code })"
      )
      Button(
        v-if="isAuthor"
        :view="'edit'"
        :type="'a'"
        @click="$router.push(`/publish/${data.code}/`)"
      )
      Button(
        :view="'more'"
        :type="'a'"
        @click="$router.push(`/blog/${data.code}/`)"
      ) Подробнее
</template>

<script>
import Button from 'Components/elements/general/Button';
import formatDate from '@/helpers/formatDate';

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
    author() {
      return this.data.username ? this.data.username : 'без автора';
    },
    isAuthor() {
      return this.$store.state.isAdmin || this.data.userId === this.$store.state.userId;
    },
  },
};
</script>

<style lang="stylus">
  .blog-list-item
    card()

    *
      overflow hidden
      text-overflow ellipsis
      word-wrap break-word

    &__title
      font-family 'Roboto Slab', sans-serif
      font-size 30px
      max-width 630px

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

      a + span,
      a + a
        margin-left 10px

    &__image-wrapper
      display block
      text-decoration none
      margin-bottom 35px

    &__image
      overflow hidden
      width 100%
      height 300px
      background-size cover
      background-position center
      border 2px solid gray

    +phone()

      &__image-wrapper
        margin-bottom 15px

      &__title
        font-size 24px

      &__image
        height 175px

</style>

<template lang="pug">
  .item
    .heading
      router-link.image-wrapper(
        v-if="data.previewPicture"
        :to="`${data.code}/`"
      )
        .image(
          :style="`background-image:url(${data.previewPicture});`"
        )
      .title {{ data.title }}
      .info {{ date }}, {{ author }}
    .text {{ data.previewText }}
    .controls
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
import { mapState } from 'vuex';
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
    ...mapState({
      isAdmin: state => state.user.isAdmin,
      userId: state => state.user.id,
    }),
    date() {
      return formatDate(this.data.date);
    },
    author() {
      return this.data.username ? this.data.username : 'без автора';
    },
    isAuthor() {
      return this.isAdmin || this.data.userId === this.userId;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .item
    card()

    *
      overflow hidden
      text-overflow ellipsis
      word-wrap break-word

    .title
      font-family 'Roboto Slab', sans-serif
      font-size 30px
      max-width 630px

    .info
      font-family 'Roboto Slab', sans-serif
      font-size 16px
      color #CF
      padding-top 10px

    .text
      padding-top 10px
      font-size 16px
      line-height 1.7

    .controls
      padding-top 20px
      display flex
      justify-content flex-end

      a + span,
      a + a
        margin-left 10px

    .image-wrapper
      display block
      text-decoration none
      margin-bottom 35px

    .image
      overflow hidden
      width 100%
      height 300px
      background-size cover
      background-position center
      border 2px solid gray

    +phone()

      .image-wrapper
        margin-bottom 15px

      .title
        font-size 24px

      .image
        height 175px

</style>

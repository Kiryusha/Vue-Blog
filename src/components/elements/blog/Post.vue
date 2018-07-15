<template lang="pug">
  section.post(:class="{'_loaded': post.title}")
    .content
      .title-block
        h1.title {{ post.title }}
        .info {{ date }}, {{ author }}
      .text-block(
        v-html="post.detailText"
      )
</template>

<script>
import { mapState, mapActions } from 'vuex';
import formatDate from '@/helpers/formatDate';

export default {
  computed: {
    ...mapState({
      post: state => state.post.data,
    }),
    date() {
      return formatDate(this.post.date);
    },
    author() {
      return this.post.username ? this.post.username : 'без автора';
    },
  },
  created() {
    this.fetchPost(this.$route.params.code);
  },
  methods: {
    ...mapActions([
      'fetchPost',
    ]),
  },
};
</script>

<style lang="stylus" scoped>
  .post
    card()
    opacity 0
    transition opacity .2s

    &._loaded
      opacity 1

    *
      overflow hidden
      text-overflow ellipsis
      word-wrap break-word

    .title-block
      margin-bottom 30px

    .title
      font-family 'Roboto Slab', sans-serif
      margin 0
      font-size 34px
      font-weight normal
      margin-bottom 8px

    .info
      font-family 'Roboto Slab', sans-serif
      font-size 18px
      color #c

    .text-block
      font-size 18px
      line-height 1.5

      h1, h2, h3, h4, h5
        font-family 'Roboto Slab', sans-serif

      a
        text-decoration none
        color $yellowDark
        border-bottom 1px solid $yellowDark
        transition .2s

        &:hover
          color $clay
          border-color $clay

      cite
        display inline-block
        padding 20px 0 20px 40px
        color #9

      img
        width 100%

    +phone()
      padding-top 20px

      .title
        font-size 24px

      .info
        font-size 16px

      .title-block
        margin-bottom 10px

      .text-block
        font-size 16px
        line-height 1.5

</style>

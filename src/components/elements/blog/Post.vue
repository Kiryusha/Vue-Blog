<template lang="pug">
  section.post(:class="{'_loaded': post.title}")
    .post__content
      .post__title-block
        h1.post__title {{ post.title }}
        .post__info {{ date }}, {{ author }}
      .post__text-block(
        v-html="post.detailText"
      )
</template>

<script>
import formatDate from '@/helpers/formatDate';
import callErrorModal from '@/helpers/callErrorModal';

export default {
  data() {
    return {
      loading: false,
      post: {},
    };
  },
  computed: {
    date() {
      return formatDate(this.post.date);
    },
    author() {
      return this.post.username ? this.post.username : 'без автора';
    },
  },
  created() {
    this.fetchData(this.$route.params.code);
  },
  methods: {
    fetchData(code) {
      this.axios.get(`/api/posts/post/${code}/`).then((response) => {
        this.post = response.data.post;
      }).catch((error) => {
        this.$router.push('/blog/');
        callErrorModal(this, error);
      });
    },
  },
};
</script>

<style lang="stylus">
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

    &__title-block
      margin-bottom 30px

    &__title
      font-family 'Roboto Slab', sans-serif
      margin 0
      font-size 34px
      font-weight normal
      margin-bottom 8px

    &__info
      font-family 'Roboto Slab', sans-serif
      font-size 18px
      color #c

    &__text-block
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

      &__title
        font-size 24px

      &__info
        font-size 16px

      &__title-block
        margin-bottom 10px

      &__text-block
        font-size 16px
        line-height 1.5

</style>

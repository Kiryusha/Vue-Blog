<template lang="pug">
  section.post(:class="{'_loaded': post.title}")
    .post__content
      .post__title-block
        h1.post__title {{ post.title }}
        .post__info {{ date }}, {{ author }}
      .post__text-block(
        v-html="post.detailText"
      )
      .post__author
</template>

<script>
import axios from 'axios';
import formatDate from '../../../helpers/formatDate';

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
  mounted() {
    this.fetchData(this.$route.params.code);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchData(to.params.code);
    next();
  },
  methods: {
    fetchData(code) {
      this.$Progress.start();

      axios.get(`/api/posts/post/${code}/`).then((response) => {
        this.post = response.data;
        this.$Progress.finish();
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

    &__title-block
      margin-bottom 70px

    &__title
      font-family 'Roboto Slab', sans-serif
      display inline-block
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
        color $yellow
        border-bottom 1px solid $yellow
        transition .2s

        &:hover
          color $yellowDark
          border-color $yellowDark

      cite
        display inline-block
        padding 20px 0 20px 40px
        color #9

      img
        width 100%

</style>

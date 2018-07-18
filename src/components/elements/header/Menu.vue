<template lang="pug">
  .menu
    .item
      router-link.link(
        :to="'/blog/'"
      ) Блог
    .item(v-if="userId")
      router-link.link(
        :to="'/publish/'"
      ) Опубликовать
    .item(v-else)
      span.link(
        @click="$modal.show('auth')"
      ) Войти
    .item(v-if="userId")
      span.link(
        @click="logout()"
      ) Выйти
</template>

<script>
import { mapState, mapActions } from 'vuex';
import callErrorModal from '@/helpers/callErrorModal';

export default {
  data() {
    return {
      response: null,
    };
  },
  computed: {
    ...mapState({
      userId: state => state.user.id,
    }),
  },
  methods: {
    ...mapActions(['authLogout']),
    async logout() {
      try {
        this.$Progress.start();

        await this.authLogout();

        this.$Progress.finish();

        if (this.$route.path.lastIndexOf('/publish/', 0) === 0) {
          this.$router.push('/blog/');
        }
      } catch (error) {
        callErrorModal(this, error);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .menu
    display flex
    padding-top 5px
    flex-wrap wrap
    font-family 'Roboto Slab', sans-serif

  .item
    font-size 14px
    position relative
    padding-right 6px

    &:after
      content '/'
      position absolute
      top 0
      right 0

    &:first-child
      padding-left 6px

      &:before
        content '/'
        position absolute
        top 0
        left 0

  .link
    a-reset()
    margin 0 16px
    cursor pointer

    &._active
      font-weight bold

  +phone()
    flex-direction column

    .item,
    .item:first-child
      padding 0
      margin-top 10px

      &:after,
      &:before
        display none

    .link,
    .item:first-child .link
      font-size 18px
      color #f

</style>

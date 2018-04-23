<template lang="pug">
  .post
    .post__heading
      .post__title Lorem ipsum dolor sit amet, consectetur adipiscing elit
      .post__info 22 апреля 2018, Кир
    .post__text
      p
        | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        | tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        | veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        | commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        | velit esse cillum dolore eu fugiat nulla pariatur.
    .post__controls
      Button(
        :view="'more'"
      ) Подробнее
</template>

<script>
import Button from '../general/Button';

export default {
  components: {
    Button,
  },
};
</script>

<style lang="stylus">
  .post

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

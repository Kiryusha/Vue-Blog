<template lang="pug">
  .tags
    .tags__container
      .tags__item(v-for="tag in tags")
        Button(
          :type="'a'",
          :view="'link'"
        ) {{ tag.title }}
</template>

<script>
import Button from '../general/Button';

export default {
  components: {
    Button,
  },
  props: {
    tags: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>

<style lang="stylus">
  .tags

    &__container
      display flex
      flex-wrap wrap

    &__item
      margin 0 5px 5px 0
</style>

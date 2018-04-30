<template lang="pug">
  .categories
    .categories__container
      .categories__item(v-for="tag in categories")
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
    categories: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>

<style lang="stylus">
  .categories

    &__container
      display flex
      flex-wrap wrap
      margin-bottom -5px

    &__item
      margin 0 5px 5px 0
</style>

<template lang="pug">
  .categories
    .categories__container
      .categories__item(v-for="item in categories")
        Button(
          :class="{'_active':activeCategory === item}"
          :type="'a'",
          :view="'categories'"
          @click="selectCategory(item)"
        ) {{ item }}
</template>

<script>
import Button from 'Components/elements/general/Button';

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
  data() {
    return {
      activeCategory: null,
    };
  },
  methods: {
    selectCategory(category) {
      if (category !== this.activeCategory) {
        this.activeCategory = category;
        this.$emit('fetch', category);
      } else {
        this.activeCategory = null;
        this.$emit('fetch');
      }
    },
  },
};
</script>

<style lang="stylus">
  .categories

    &__container
      display flex
      flex-wrap wrap
      margin 0 -5px -5px 0

    &__item
      margin 0 5px 5px 0

</style>

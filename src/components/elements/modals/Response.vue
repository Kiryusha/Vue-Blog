<template lang="pug">
  modal(
    name="response",
    width="100%",
    height="auto",
    @before-open="beforeOpen"
  )
    .modal
      .modal__content
        .modal__title {{title}}
        .modal__close
          Button(
            @click="$modal.hide('response')"
          ) Закрыть
</template>

<script>
import Button from '../general/Button';

export default {
  components: {
    Button,
  },
  data() {
    return {
      title: '',
    };
  },
  methods: {
    beforeOpen(event) {
      this.title = event.params.message;
    },
  },
};
</script>

<style lang="stylus">
  @import '../../../styles/modal';
</style>

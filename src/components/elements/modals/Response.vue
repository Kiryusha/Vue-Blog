<template lang="pug">
  modal(
    name="response"
    width="100%"
    height="auto"
    @before-open="beforeOpen"
  )
    ModalWrapper
      .modal__content
        .modal__title {{title}}
        .modal__close
          Button(
            @click="$modal.hide('response')"
          ) Закрыть
</template>

<script>
import ModalWrapper from 'Components/elements/modals/Modal';
import Button from 'Components/elements/general/Button';

export default {
  components: {
    ModalWrapper,
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

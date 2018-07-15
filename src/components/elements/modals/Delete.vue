<template lang="pug">
  modal(
    name="delete"
    width="100%"
    height="auto"
    @before-open="beforeOpen"
  )
    ModalWrapper._delete
      .content
        .title Вы уверены, что хотите удалить новость?
        .close
          Button(
            @click="submitDeletion"
          ) Удалить
          Button(
            @click="$modal.hide('delete')"
          ) Отмена
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModalWrapper from 'Components/elements/modals/Modal';
import Button from 'Components/elements/general/Button';

export default {
  components: {
    ModalWrapper,
    Button,
  },
  data() {
    return {
      code: null,
    };
  },
  computed: {
    ...mapState({
      userId: state => state.auth.userId,
    }),
  },
  methods: {
    ...mapActions([
      'fetchCategories',
      'deletePost',
    ]),
    beforeOpen(event) {
      this.code = event.params.code;
    },
    async submitDeletion() {
      this.$modal.hide('delete');

      await this.deletePost({
        code: this.code,
        userId: this.userId,
      });

      this.fetchCategories();
    },
  },
};
</script>

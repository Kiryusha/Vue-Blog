<template lang="pug">
  modal(
    name="delete",
    width="100%",
    height="auto",
    @before-open="beforeOpen"
  )
    .modal._auth
      .modal__content
        .modal__title Вы уверены, что хотите удалить?
        .modal__close
          Button(
            @click="deletePost()"
          ) Удалить
          Button(
            @click="$modal.hide('delete')"
          ) Отмена
</template>

<script>
import axios from 'axios';
import Button from '../general/Button';

export default {
  components: {
    Button,
  },
  data() {
    return {
      code: null,
    };
  },
  methods: {
    beforeOpen(event) {
      this.code = event.params.code;
    },
    deletePost() {
      this.$Progress.start();

      axios.post(`/api/posts/${this.code}/delete/`, {
        userId: this.$store.state.userId,
      }).then((response) => {
        this.$modal.hide('delete');
        if (response.data.success) {
          this.$emit('deletePost', this.code);
          this.$emit('fetchCategories');
        } else {
          this.$Progress.finish();
          this.$modal.show('response', { message: response.data.message });
        }
      });
    },
  },
};
</script>

<style lang="stylus">
  @import '../../../styles/modal';
</style>

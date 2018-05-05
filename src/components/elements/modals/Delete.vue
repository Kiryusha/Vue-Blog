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

      axios.delete(`/api/posts/${this.code}/`).then(() => {
        this.$modal.hide('delete');
        this.$store.dispatch('getPosts');
        this.$store.dispatch('getCategories');
      });
    },
  },
};
</script>

<style lang="stylus">
  @import '../../../styles/modal';
</style>

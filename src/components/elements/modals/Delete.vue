<template lang="pug">
  modal(
    name="delete"
    width="100%"
    height="auto"
    @before-open="beforeOpen"
  )
    .modal._delete
      .modal__content
        .modal__title Вы уверены, что хотите удалить новость?
        .modal__close
          Button(
            @click="deletePost()"
          ) Удалить
          Button(
            @click="$modal.hide('delete')"
          ) Отмена
</template>

<script>
import { mapState } from 'vuex';
import Button from 'Components/elements/general/Button';
import callErrorModal from '@/helpers/callErrorModal';

export default {
  components: {
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
    beforeOpen(event) {
      this.code = event.params.code;
    },
    deletePost() {
      this.axios.post(`/api/posts/${this.code}/delete/`, {
        userId: this.userId,
      }).then(() => {
        this.$modal.hide('delete');
        this.$emit('deletePost', this.code);
        this.$emit('fetchCategories');
      }).catch((error) => {
        this.$modal.hide('delete');
        callErrorModal(this, error);
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import '../../../styles/modal';
</style>

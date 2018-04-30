<template lang="pug">
  modal(
    name="response",
    width="100%"
  )
    .modal
      .modal__content
        .modal__title Форма успешно отправлена.
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
};
</script>

<style lang="stylus">
  .modal
    height 100%

    &__content
      height 100%
      display flex
      align-items center
      justify-content center
      flex-wrap wrap
      flex-direction column

    &__title
      font-family 'Roboto Slab', sans-serif
      margin 0
      font-size 34px
      font-weight normal
      margin-bottom 20px
      text-align center

    +phone()

      &__title
        font-size 24px

  .v--modal
    max-width 600px
    margin auto

    +phone()
      max-width 300px
</style>

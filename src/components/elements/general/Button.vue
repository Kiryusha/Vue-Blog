<template lang="pug">
  button.button(
    :class="`_${type}`"
  )
    .button__caption
      slot
    .button__icon(
        v-if="type === 'more'"
    )
      Icon(
        :name="'arrow'",
        width=17,
        height=14
      )
</template>

<script>
import Icon from '../general/Icon'

export default {
  components: {
    Icon
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
  .button
    font-family 'Open Sans', sans-serif
    border none
    padding 7px 16px
    background #0
    font-size 12px
    color #F
    cursor pointer
    outline none
    transition background, color .33s

    &:active
      background $yellow
      color #0

    &._more
      display flex
      align-items center

    &._more use
      fill #F
      stroke #F

    &._more &__icon
      padding-top 4px
      margin-left 8px

    &._more:active use
      fill #0
      stroke #0
</style>

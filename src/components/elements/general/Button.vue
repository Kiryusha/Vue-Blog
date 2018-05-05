<template lang="pug">
  component.button(
    :is="type"
    :class="`_${view}`"
    @click="$emit('click')"
  )
    .button__caption
      slot
    .button__icon(
        v-if="view === 'more'"
    )
      Icon(
        :name="'arrow'",
        width=17,
        height=14
      )
    .button__icon(
        v-if="view === 'github-auth'"
    )
      Icon(
        :name="'github'",
        width=19,
        height=20
      )
    .button__icon(
        v-if="view === 'delete'"
    )
      Icon(
        :name="'delete'",
        width=20,
        height=20
      )
</template>

<script>
import Icon from '../general/Icon';

export default {
  components: {
    Icon,
  },
  props: {
    type: {
      type: String,
      default: 'button',
    },
    view: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus">
  .button
    display inline-block
    font-family 'Open Sans', sans-serif
    border none
    padding 7px 16px
    background #0
    font-size 16px
    color #F
    cursor pointer
    outline none
    border-radius 3px
    transition .2s

    &:active,
    &._active
      background $yellow
      color #0

    &._more,
    &._github-auth
      display flex
      align-items center

    &._github-auth
      flex-direction row-reverse
      width 100%
      text-align left
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      padding 6px 12px 6px 48px
      margin-bottom 0
      font-size 14px
      font-weight normal
      line-height 1.42857143
      position relative
      justify-content flex-end
      background #4

      &:after
        content ''
        position absolute
        top 0
        left 36px
        bottom 0
        width 1px
        background rgba(0,0,0,0.2);

      &:active
        background #2b
        color #f

    &._more use,
    &._github-auth use,
    &._delete use
      fill #F
      stroke #F

    &__icon
      padding-top 4px
      margin-left 8px

    &._github-auth &__icon
      padding 0
      margin 0
      position absolute
      top 6px
      left 8px

    &._delete
      width 36px
      height 36px
      position relative

    &._delete &__icon
      padding 0
      margin 0
      position: absolute
      top 0
      left 0
      right 0
      bottom 0
      width 20px
      height 20px
      margin auto

    &._more:active use,
    &._delete:active use
      stroke #0
      fill #0

    &._categories
      font-size 14px
      padding 7px 12px
</style>

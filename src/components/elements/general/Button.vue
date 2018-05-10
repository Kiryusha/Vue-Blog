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
      v-if="view === 'google-auth'"
    )
      Icon(
        :name="'google'",
        width=20,
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
    .button__icon(
      v-if="view === 'edit'"
    )
      Icon(
        :name="'edit'",
        width=20,
        height=20
      )
    .button__icon(
      v-if="view === 'login'"
    )
      Icon(
        :name="'login'",
        width=20,
        height=18
      )
    .button__icon(
      v-if="view === 'register'"
    )
      Icon(
        :name="'plus'",
        width=22,
        height=22
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
    &._github-auth,
    &._google-auth
      display flex
      align-items center

    &._login,
    &._register
      height 32px
      min-width 123px
      width calc(50% - 5px)
      padding 0
      display flex
      align-items center
      justify-content center

    &._w100
      width 100%

    &._github-auth,
    &._google-auth
      flex-direction row-reverse
      width 100%
      text-align left
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      padding 6px 12px 6px 48px
      margin-bottom 0
      font-size 16px
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
    &._google-auth use,
    &._delete use,
    &._edit use,
    &._login use,
    &._register use
      fill #F
      stroke #F

    &__icon
      padding-top 4px
      margin-left 8px

    &._github-auth &__icon,
    &._google-auth &__icon
      padding 0
      margin 0
      position absolute
      top 6px
      left 8px

    &._login &__icon,
    &._register &__icon
      margin 0

    &._github-auth &__caption,
    &._google-auth &__caption
      width 100%
      text-align center

    &._delete,
    &._edit
      width 36px
      height 36px
      position relative

    &._delete &__icon,
    &._edit &__icon
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
    &._delete:active use,
    &._edit:active use,
    &._login:active use,
    &._register:active use,
    &._login._active use,
    &._register._active use
      stroke #0
      fill #0

    &._categories
      font-size 14px
      padding 7px 12px
</style>

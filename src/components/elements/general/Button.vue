.<template lang="pug">
  component.button(
    :is="type"
    :class="`_${view}`"
    @click="$emit('click')"
  )
    .caption
      slot
    .icon(
      v-if="view === 'more'"
    )
      Icon(
        :name="'arrow'"
        width=17
        height=14
      )
    .icon(
      v-if="view === 'github-auth'"
    )
      Icon(
        :name="'github'"
        width=19
        height=20
      )
    .icon(
      v-if="view === 'google-auth'"
    )
      Icon(
        :name="'google'"
        width=20
        height=20
      )
    .icon(
      v-if="view === 'delete'"
    )
      Icon(
        :name="'delete'"
        width=20
        height=20
      )
    .icon(
      v-if="view === 'edit'"
    )
      Icon(
        :name="'edit'"
        width=20
        height=20
      )
    .icon(
      v-if="view === 'login'"
    )
      Icon(
        :name="'login'"
        width=20
        height=18
      )
    .icon(
      v-if="view === 'register'"
    )
      Icon(
        :name="'plus'"
        width=22
        height=22
      )
</template>

<script>
import Icon from 'Components/elements/general/Icon';

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

<style lang="stylus" scoped>
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
    user-select none

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

    &._github-auth .icon,
    &._google-auth .icon
      padding 0
      margin 0
      position absolute
      top 6px
      left 8px

    &._login .icon,
    &._register .icon
      margin 0

    &._github-auth .caption,
    &._google-auth .caption
      width 100%
      text-align center

    &._delete,
    &._edit
      width 36px
      height 36px
      position relative

    &._delete .icon,
    &._edit .icon
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

    &._categories
      font-size 14px
      padding 7px 12px
      word-wrap break-word
      max-width 100%

  .icon
    padding-top 4px
    margin-left 8px

</style>

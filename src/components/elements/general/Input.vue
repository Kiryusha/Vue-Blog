<template lang="pug">
  .input(
    :class="['input', {'_valid': valid && !error, '_error': error}, cssClass]"
  )
    input.control(
      :placeholder="placeholder"
      :name="name"
      :type="type"
      :disabled="disabled"
      :maxlength="maxlength"
      v-model="innerValue"
      @input="inputHandler"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    )
    .error(v-if="error") {{ error }}
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: 200,
    },
    error: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    cssClass: {
      type: String,
      default: '',
    },
    valid: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: this.value,
    };
  },
  watch: {
    value(value) {
      this.innerValue = value;
    },
  },
  methods: {
    inputHandler() {
      this.$emit('input', this.innerValue);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .input
    box-sizing border-box
    -webkit-tap-highlight-color rgba(0, 0, 0, 0)

    &._error .control
      border-color red

  .control
    width 100%
    font-size 16px
    line-height 1.5
    border 1px solid rgba(#000, .15)
    border-radius 4px
    padding 6px 10px
    -webkit-appearance none
    display block
    font-family inherit
    outline none
    resize none
    overflow hidden
    word-wrap break-word

  .error
    font-size 14px
    color red
    padding-top 10px

</style>

<template lang="pug">
  .textarea(
    :class="['input', {'_valid': valid && !error, '_error': error}, cssClass]"
  )
    textarea.control(
      ref="textarea"
      :rows="rows"
      :placeholder="placeholder"
      :name="name"
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
    rows: {
      type: Number,
      default: 1,
    },
    maxlength: {
      type: Number,
      default: 200,
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
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
  updated() {
    this.inputHandler();
  },
  watch: {
    value(value) {
      this.innerValue = value;
    },
  },
  methods: {
    inputHandler() {
      const el = this.$refs.textarea;

      el.style.cssText = 'height:auto;';
      el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = `min-height:${el.scrollHeight}px`;

      this.$emit('input', this.innerValue);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .textarea
    box-sizing border-box
    -webkit-tap-highlight-color rgba(0, 0, 0, 0)

    &._error .control
      border-color red

  .control
    font-size 18px
    line-height 1.5
    border 1px solid rgba(#000, .15)
    border-radius 4px
    padding 10px 15px
    -webkit-appearance none
    display block
    width 100%
    font-family inherit
    outline none
    resize none
    overflow hidden
    word-wrap break-word

  .error
    font-size 16px
    color red
    padding-top 10px

  +phone()

    .control
      font-size 16px
      padding 10px 10px

</style>

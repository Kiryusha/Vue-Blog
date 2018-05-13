<template lang="pug">
  .textarea(
    :class="['input', {'_valid': valid && !error, '_error': error}, cssClass]"
  )
    textarea(
      ref="textarea"
      :rows="rows"
      :placeholder="placeholder",
      :name="name",
      :disabled="disabled",
      :maxlength="maxlength",
      v-model="innerValue",
      class="textarea__control",
      @input="inputHandler",
      @blur="$emit('blur')",
      @focus="$emit('focus')"
    )
    .textarea__error(v-if="error") {{ error }}
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

<style lang="stylus">
  .textarea
    box-sizing border-box
    -webkit-tap-highlight-color rgba(0, 0, 0, 0)

    &__control
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

    &._error &__control
      border-color red

    &__error
      font-size 16px
      color red
      padding-top 10px

    +phone()

      &__control
        font-size 16px
        padding 10px 10px

</style>

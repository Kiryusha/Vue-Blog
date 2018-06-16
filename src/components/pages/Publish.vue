<template lang="pug">
  section.publish
    .container
      .publish__content
        Form(
          :postCode="code"
        )
</template>

<script>
import Form from 'Components/elements/publish/Form';

export default {
  components: {
    Form,
  },
  data() {
    return {
      code: null,
    };
  },
  created() {
    const { code } = this.$route.params;

    if (code) {
      this.code = code;
    }
  },
};
</script>

<style lang="stylus">
  .publish
    min-height 100%
    padding-top 60px
    padding-bottom 250px
    background-attachment fixed
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='1' viewBox='0 0 40 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v1H0z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")

    +phone()
      padding-top 20px
      padding-bottom 60px

</style>

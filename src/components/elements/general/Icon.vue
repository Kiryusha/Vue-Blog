<template lang="pug">
  svg
    use(
      :xlink:href="`#${name}`"
    )
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <div class="rounded-md sm:rounded-xl bg-white" :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      type: [String, Array],
      default: []
    }
  }
}
</script>
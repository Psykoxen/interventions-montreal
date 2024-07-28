<template>
  <p
    :class="`bg-${color}-300 text-${color}-700 rounded-lg w-fit pl-2 pr-2 text-sm`"
  >
    {{ label }}
  </p>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "gray",
    },
  },
};
</script>

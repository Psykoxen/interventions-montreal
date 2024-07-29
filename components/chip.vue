<template>
  <p :class="chipClass">{{ label }}</p>
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
  computed: {
    chipClass() {
      let bgClass = "bg-gray-300 dark:bg-gray-700";
      let textClass = "text-gray-700";

      if (this.color === "red") {
        bgClass = "bg-red-300 dark:bg-red-700";
        textClass = "text-red-700";
      } else if (this.color === "blue") {
        bgClass = "bg-blue-300 dark:bg-blue-700";
        textClass = "text-blue-700";
      } else if (this.color === "green") {
        bgClass = "bg-green-300 dark:bg-green-700";
        textClass = "text-green-700 ";
      } else if (this.color === "yellow") {
        bgClass = "bg-yellow-300 dark:bg-yellow-700";
        textClass = "text-yellow-700";
      } else if (this.color === "orange") {
        bgClass = "bg-orange-300 dark:bg-orange-700";
        textClass = "text-orange-700";
      }

      return `${bgClass} ${textClass} rounded-lg w-fit pl-2 pr-2 text-xs dark:text-white`;
    },
  },
};
</script>

<template>
  <div>
    <div class="w-full flex flex-col h-dvh">
      <div class="w-full flex items-center flex-row justify-between">
        <div class="flex flex-row gap-2 p-3 items-center">
          <img
            src="~/assets/svg/montreal.svg"
            alt="Logo"
            width="32"
            height="32"
          />
          <p>Interventions Montreal</p>
        </div>
        <UButton
          :icon="
            isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          "
          class="pr-3"
          color="gray"
          variant="ghost"
          aria-label="Theme"
          @click="isDark = !isDark"
        />
      </div>
      <div class="flex flex-row h-dvh">
        <div class="flex flex-col items-center w-14 gap-1">
          <UButton
            icon="i-heroicons-globe-asia-australia-solid"
            size="lg"
            color="grey"
            variant="ghost"
            :trailing="false"
            square
            to="/"
          />
          <UButton
            icon="i-heroicons-fire-16-solid"
            size="lg"
            color="red"
            variant="ghost"
            :trailing="false"
            square
            to="/sim"
          />
          <UButton
            icon="i-heroicons-hand-raised-solid"
            size="lg"
            color="indigo"
            variant="ghost"
            :trailing="false"
            square
            to="/spvm"
          />
        </div>
        <div
          class="rounded-tl-2xl bg-gray-light dark:bg-gray-dark w-full h-dvh p-4"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

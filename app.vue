<template>
  <div class="h-screen">
    <NuxtLayout class="h-screen">
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup>
const appConfig = useAppConfig();
useSeoMeta({
  title: "Interventions Montréal",
  ogTitle: "Interventions Montréal",
  // description: "This is my amazing site, let me tell you all about it.",
  // ogDescription: "This is my amazing site, let me tell you all about it.",
  // ogImage: "https://example.com/image.png",
  // twitterCard: "summary_large_image",
});
</script>

<style>
* {
  scroll-behavior: smooth;
}

*::-webkit-scrollbar {
  display: none;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

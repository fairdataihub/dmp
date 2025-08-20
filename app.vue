<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [{ href: "/favicon.ico", rel: "icon" }],
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "white", key: "theme-color" },
  ],
});

useSeoMeta({
  title: "DMP Chef", // The page title
  ogImage:
    "https://kalai.fairdataihub.org/api/generate?title=DMP%20Chef%20Survey&description=A%20survey%20on%20AI-assisted%20Data%20Management%20Plans%20(DMPs).&app=dmp-chef&org=fairdataihub-cdl",
  titleTemplate: "%s",
  twitterCard: "summary_large_image",
  twitterImage:
    "https://kalai.fairdataihub.org/api/generate?title=DMP%20Chef%20Survey&description=A%20survey%20on%20AI-assisted%20Data%20Management%20Plans%20(DMPs).&app=dmp-chef&org=fairdataihub-cdl",
});
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

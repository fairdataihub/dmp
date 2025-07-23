<script setup lang="ts">
// color mode is disabled; no setup needed
</script>

<template>
  <ClientOnly>
    <div class="h-8 w-8" />

    <template #fallback>
      <div class="h-8 w-8" />
    </template>
  </ClientOnly>
</template>

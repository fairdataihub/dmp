<template>
  <UCard variant="subtle">

    <div class="space-y-6 text-gray-700 text-xl text-center">
      <p>
        Thank you for requesting and evaluating a DMP.
      </p>
      <p>
        Would you like to request and evaluate another one?
      </p>
    </div>

    <template #footer>
      <div class="flex justify-center space-x-4">
        <UButton color="primary" @click="goToDmp">
          Yes, let’s do one more
        </UButton>
        <UButton color="secondary" @click="goToClose">
          No, submit my responses and close the survey
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

function goToDmp() {
  router.push('dmp')
}

function goToClose() {
  router.push('/thank-you-close') // You can create this page later for final exit
}
</script>

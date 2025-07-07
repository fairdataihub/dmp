<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useState, useToast } from '#imports'
import type { DmpElement } from '~/server/utils/splitMdByElements'

const router = useRouter()
const toast = useToast()

const dmpIndex = useState<number>('dmpIndex')
const assignedDmps = useState<string[]>('assignedDmps')
const dmpState = useState<DmpElement[]>('dmpData')
const evaluations = useState<any[][]>('evaluations')
const currentPage = useState<number>('currentPage')

// Overall evaluation refs
const overallSatisfaction = ref<number | null>(null)
const overallAuthorshipGuess = ref<string | null>(null)

// Modal control
const open = ref(false)

// Save all evaluations + overall at the last DMP
async function saveAllEvaluations() {
  try {
    const flatElements = dmpState.value
    const flatEvaluations = evaluations.value.flatMap(group => group)
    const dmpName = assignedDmps.value[dmpIndex.value]

    const res = await $fetch('/api/dmp/save-evaluation', {
      method: 'POST',
      body: {
        dmpName,
        elements: flatElements,
        evaluations: flatEvaluations,
        overallSatisfaction: overallSatisfaction.value,
        overallAuthorshipGuess: overallAuthorshipGuess.value,
      },
    })

    toast.add({
      title: 'Saved',
      description: res.message || 'Evaluation results saved successfully.',
    })

    router.push('/app/thank-you') // or wherever after submit
  } catch (error) {
    console.error('Save failed:', error)
    toast.add({
      title: 'Error',
      description: 'Failed to save evaluations. Please try again.',
    })
  }
}

// Show confirmation modal on submit click
function onSubmitClick() {
  open.value = true
}

// Confirm submit, save evaluations
async function confirmSubmit() {
  open.value = false
  await saveAllEvaluations()
}

function goNext() {
  if (dmpIndex.value < assignedDmps.value.length - 1) {
    dmpIndex.value++
    router.push('/app/preview')
  } else {
    onSubmitClick()
  }
}

function goPrevious() {
  const lastPageIndex = 5
  currentPage.value = lastPageIndex
  router.push('/app/evaluation')
}
</script>

<template>
  <UCard variant="subtle" class="bg-white">
    <div class="flex justify-center text-3xl h-20">
      <strong>Overall Evaluation</strong>
    </div>

    <div class="space-y-8 px-6 pb-6">
      <div class="flex gap-x-8">
        <div class="w-1/2">
          <label class="font-semibold w-3/4">
            1. How satisfied were you with this DMP as a whole? <span class="text-red-500">*</span>
          </label>
        </div>
        <div class="w-1/2">
          <USelect
            v-model="overallSatisfaction"
            :items="[
              { label: 'Very Dissatisfied', value: 1 },
              { label: 'Dissatisfied', value: 2 },
              { label: 'Neutral', value: 3 },
              { label: 'Satisfied', value: 4 },
              { label: 'Very Satisfied', value: 5 }
            ]"
            placeholder="Select satisfaction level"
            class="w-96"
          />
        </div>
      </div>

      <div class="flex gap-x-8">
        <div class="w-1/2">
          <label class="font-semibold w-3/4">
            2. Who do you think wrote this DMP? <span class="text-red-500">*</span>
          </label>
        </div>
        <div class="w-1/2">
          <USelect
            v-model="overallAuthorshipGuess"
            :items="[
              { label: 'Human', value: 'Human' },
              { label: 'LLM', value: 'LLM' }
            ]"
            placeholder="Select one"
            class="w-96"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-between mt-8 px-6 pb-6">
      <UButton
        icon="i-lucide-arrow-left"
        color="primary"
        size="lg"
        @click="goPrevious"
        class="w-30 flex items-center justify-center"
      >
        Previous
      </UButton>

      <UButton
        :trailing-icon="dmpIndex === assignedDmps.length - 1 ? '' : 'i-lucide-arrow-right'"
        color="primary"
        size="lg"
        @click="goNext"
        class="w-30 flex items-center justify-center"
      >
        {{ dmpIndex === assignedDmps.length - 1 ? 'Submit' : 'Next' }}
      </UButton>
    </div>

    <UModal v-model:open="open" trap-focus>
  <template #content>
    <div class="p-6 w-120 max-w-full">
      <p class="mb-6">Are you sure you want to submit your evaluations?</p>
      <div class="flex justify-end space-x-4">
        <UButton color="primary" @click="confirmSubmit">Yes, Submit</UButton>
        <UButton color="neutral" @click="open = false">Cancel</UButton>
      </div>
    </div>
  </template>
</UModal>

  </UCard>
</template>

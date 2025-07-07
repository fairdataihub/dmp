<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useState } from '#imports'
import type { DmpElement } from '~/server/utils/splitMdByElements'

const router = useRouter()

// Global shared state
const dmpState = useState<DmpElement[]>('dmpData')
const dmpIndex = useState<number>('dmpIndex')
const assignedDmps = useState<string[]>('assignedDmps')

// Evaluation store per DMP
const evaluationsPerDmp = useState<any[][][]>('evaluationsPerDmp', () => [])
const evaluations = useState<any[][]>('evaluations', () => [])
const currentPage = useState<number>('currentPage', () => 0)

// Group content
const groupedByTitle = computed(() => {
  const grouped: Record<string, DmpElement[]> = {}
  for (const el of dmpState.value ?? []) {
    if (!grouped[el.title]) grouped[el.title] = []
    grouped[el.title].push(el)
  }
  return grouped
})

const titles = computed(() => Object.keys(groupedByTitle.value))
const currentTitle = computed(() => titles.value[currentPage.value])
const currentElements = computed(() => groupedByTitle.value[currentTitle.value] || [])

const scoreOptions = [1, 2, 3, 4, 5]
const errorTypes = ['Grammar', 'Incorrect Fact', 'Incomplete', 'Off-topic', 'Other']

// Create fresh blank data
function createBlankEvaluation(): any[][] {
  return titles.value.map(title =>
    (groupedByTitle.value[title] || []).map(() => ({
      techCorrectScore: null,
      completenessScore: null,
      satisfactionScore: null,
      selectedErrors: [],
      otherError: '',
      additionalComments: ''
    }))
  )
}

// Whenever content is ready (titles), load or create eval
watch(titles, () => {
  if (!titles.value.length) return

  const saved = evaluationsPerDmp.value[dmpIndex.value]
  if (saved) {
    evaluations.value = JSON.parse(JSON.stringify(saved))
  } else {
    evaluations.value = createBlankEvaluation()
    evaluationsPerDmp.value[dmpIndex.value] = JSON.parse(JSON.stringify(evaluations.value))
  }
}, { immediate: true })

function saveCurrentEvaluation() {
  evaluationsPerDmp.value[dmpIndex.value] = JSON.parse(JSON.stringify(evaluations.value))
}

function formatContent(content: string) {
  return content.replace(/\n/g, '<br>')
}

function nextPage() {
  if (currentPage.value === titles.value.length - 1) {
    saveCurrentEvaluation()
    router.push('/app/overall')
  } else {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value === 0) {
    saveCurrentEvaluation()
    router.push('/app/preview')
  } else {
    currentPage.value--
  }
}
</script>

<template>
  <div v-if="titles.length && currentElements.length" class="space-y-6 mt-10">
    <div class="text-gray-700 text-lg mb-4">
      <strong>{{ currentTitle }}</strong>
    </div>

    <UCard
      v-for="(element, index) in currentElements"
      :key="index"
      class="p-4 bg-gray-50 bg-white"
    >
      <div class="flex gap-6">
        <div class="w-1/2">
          <h3 v-if="element.subtitle" class="font-medium text-gray-700 mb-2 text-lg">
            {{ element.subtitle }}
          </h3>
          <div v-html="formatContent(element.content)" class="whitespace-pre-wrap text-base" />
        </div>

        <div class="w-1/2 space-y-4">
          <div class="flex items-center space-x-4">
            <label class="font-semibold w-3/4">1. How technically correct is the information?<span class="text-red-500">*</span></label>
            <USelect
              v-model="evaluations[currentPage][index].techCorrectScore"
              :items="scoreOptions"
              class="w-25"
            />
          </div>

          <div class="flex items-center space-x-4">
            <label class="font-semibold w-3/4">2. Does the section fully address the required Element?<span class="text-red-500">*</span></label>
            <USelect
              v-model="evaluations[currentPage][index].completenessScore"
              :items="scoreOptions"
              class="w-25"
            />
          </div>

          <div class="flex items-center space-x-4">
            <label class="font-semibold w-3/4">3. How satisfied are you with the response?<span class="text-red-500">*</span></label>
            <USelect
              v-model="evaluations[currentPage][index].satisfactionScore"
              :items="scoreOptions"
              class="w-25"
            />
          </div>

          <div>
            <label class="font-semibold block mb-2">4. What type of error(s) did you find?<span class="text-red-500">*</span></label>
            <div class="flex gap-x-4 items-start">
              <USelect
                v-model="evaluations[currentPage][index].selectedErrors"
                :items="errorTypes"
                multiple
                placeholder="Select error types"
                class="w-100"
              />
              <UInput
                v-if="evaluations[currentPage][index].selectedErrors.includes('Other')"
                v-model="evaluations[currentPage][index].otherError"
                placeholder="Specify other error"
                class="w-100"
              />
            </div>
          </div>

          <div>
            <label class="font-semibold block mb-1">5. Provide additional comments (optional)</label>
            <UTextarea
              v-model="evaluations[currentPage][index].additionalComments"
              class="w-full"
            />
          </div>
        </div>
      </div>
    </UCard>

    <div class="flex justify-between mt-6 mb-6 items-center">
      <UButton 
        icon="i-lucide-arrow-left" 
        size="xl" 
        color="primary" 
        @click="prevPage"
        class="w-30 flex items-center justify-center"
      >
        Previous
      </UButton>

      <div class="text-center font-semibold">
        Page {{ currentPage + 1 }} / {{ titles.length }}
      </div>

      <UButton
        trailing-icon="i-lucide-arrow-right"
        size="xl"
        color="primary"
        @click="nextPage"
        class="w-30 flex items-center justify-center"
      >
        Next
      </UButton>
    </div>
  </div>
</template>

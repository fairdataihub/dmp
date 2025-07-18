<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useState, useToast } from "#imports";
import type { DmpElement } from "~/server/utils/splitMdByElements";

const router = useRouter();
const toast = useToast();

const dmpIndex = useState<number>("dmpIndex");
const assignedDmps = useState<string[]>("assignedDmps");
const dmpState = useState<DmpElement[]>("dmpData");
const evaluations = useState<any[][]>("evaluations");
const currentPage = useState<number>("currentPage");

// Overall evaluation refs
const overallSatisfaction = ref<number | null>(null);
const overallAuthorshipGuess = ref<string | null>(null);
const overallEvaluationsPerDmp = useState<
  { authorship: string | null; satisfaction: number | null }[]
>("overallEvaluationsPerDmp", () => []);

// Modal control
const open = ref(false);

// Save all evaluations + overall at the last DMP
async function saveAllEvaluations() {
  try {
    const flatElements = dmpState.value;
    const flatEvaluations = evaluations.value.flatMap((group) => group);
    const dmpName = assignedDmps.value[dmpIndex.value];

    const res = await $fetch("/api/dmp/save-evaluation", {
      body: {
        dmpName,
        elements: flatElements,
        evaluations: flatEvaluations,
        overallAuthorshipGuess: overallAuthorshipGuess.value,
        overallSatisfaction: overallSatisfaction.value,
      },
      method: "POST",
    });

    toast.add({
      title: "Saved",
      description: res.message || "Evaluation results saved successfully.",
    });

    router.push("/app/thank-you"); // or wherever after submit
  } catch (error) {
    console.error("Save failed:", error);
    toast.add({
      title: "Error",
      description: "Failed to save evaluations. Please try again.",
    });
  }
}

// Show confirmation modal on submit click
function onSubmitClick() {
  open.value = true;
}

// Confirm submit, save evaluations
async function confirmSubmit() {
  open.value = false;
  await saveAllEvaluations();
}

function goNext() {
  // Validate required fields
  // const missingSatisfaction = overallSatisfaction.value === null;
  // const missingAuthorship = !overallAuthorshipGuess.value;

  // if (missingSatisfaction || missingAuthorship) {
  //   toast.add({
  //     title: "Incomplete",
  //     color: "warning",
  //     description: "Please answer all required overall evaluation questions.",
  //     icon: "material-symbols:warning",
  //   });

  //   return;
  // }
  saveOverallEvaluation();
  if (dmpIndex.value < assignedDmps.value.length - 1) {
    dmpIndex.value++;
    router.push("/app/preview");
  } else {
    onSubmitClick();
  }
}

function goPrevious() {
  const lastPageIndex = evaluations.value.length - 1;

  currentPage.value = lastPageIndex;
  router.push("/app/evaluation");
}

function saveOverallEvaluation() {
  overallEvaluationsPerDmp.value[dmpIndex.value] = {
    authorship: overallAuthorshipGuess.value,
    satisfaction: overallSatisfaction.value,
  };
}

watch(
  dmpIndex,
  () => {
    const saved = overallEvaluationsPerDmp.value[dmpIndex.value];

    if (saved) {
      overallSatisfaction.value = saved.satisfaction;
      overallAuthorshipGuess.value = saved.authorship;
    } else {
      overallSatisfaction.value = null;
      overallAuthorshipGuess.value = null;
    }
  },
  { immediate: true },
);
</script>

<template>
  <UCard variant="subtle" class="bg-white">
    <div class="flex h-20 justify-center text-3xl">
      <strong>Overall Evaluation</strong>
    </div>

    <div class="space-y-8 px-6 pb-6">
      <div class="flex gap-x-8">
        <div class="w-1/2">
          <label class="w-3/4 font-semibold">
            1. How satisfied were you with this DMP as a whole?
            <span class="text-red-500">*</span>
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
              { label: 'Very Satisfied', value: 5 },
            ]"
            placeholder="Select satisfaction level"
            class="w-96"
          />
        </div>
      </div>

      <div class="flex gap-x-8">
        <div class="w-1/2">
          <label class="w-3/4 font-semibold">
            2. Who do you think wrote this DMP?
            <span class="text-red-500">*</span>
          </label>
        </div>

        <div class="w-1/2">
          <USelect
            v-model="overallAuthorshipGuess"
            :items="[
              { label: 'Human', value: 'Human' },
              { label: 'LLM', value: 'LLM' },
            ]"
            placeholder="Select one"
            class="w-96"
          />
        </div>
      </div>
    </div>

    <div class="mt-8 flex justify-between px-6 pb-6">
      <UButton
        icon="i-lucide-arrow-left"
        color="primary"
        size="lg"
        class="flex w-30 items-center justify-center"
        @click="goPrevious"
      >
        Previous
      </UButton>

      <UButton
        :trailing-icon="
          dmpIndex === assignedDmps.length - 1 ? '' : 'i-lucide-arrow-right'
        "
        color="primary"
        size="lg"
        class="flex w-30 items-center justify-center"
        @click="goNext"
      >
        {{ dmpIndex === assignedDmps.length - 1 ? "Submit" : "Next" }}
      </UButton>
    </div>

    <UModal v-model:open="open" trap-focus>
      <template #content>
        <div class="w-120 max-w-full p-6">
          <p class="mb-6">Are you sure you want to submit your evaluations?</p>

          <div class="flex justify-end space-x-4">
            <UButton color="primary" @click="confirmSubmit"
              >Yes, Submit</UButton
            >

            <UButton color="neutral" @click="open = false">Cancel</UButton>
          </div>
        </div>
      </template>
    </UModal>
  </UCard>
</template>

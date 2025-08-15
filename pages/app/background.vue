<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const pidState = useState("pid", () => route.query.pid || "");

// When you fetch data:
const pid = pidState.value;
const form = ref({
  aiUsage: "",
  dmpCount: "",
  additionalComments: "",
  field: "",
  otherRole: "",
  aiAttitude: "",
  roleDuration: "",
  roles: [] as string[],
  aiComfort: "",
  dmpReviewFrequency: "",
  dmsFamiliarity: "",
});

const dmpAssignments = useState<string[]>("assignedDmps", () => []);
const driveFileIds = useState<string[]>("driveFileIds", () => []);

onMounted(async () => {
  const res = await $fetch<{
    dmps: string[];
    driveFileIds: string[];
    participantId: string;
  }>(`/api/dmp/assignment/${pid}`);

  dmpAssignments.value = res.dmps;
  driveFileIds.value = res.driveFileIds;
});

const roleOptions = [
  "Researcher (e.g., student, faculty, post-doctoral)",
  "Research administrator / Program officer",
  "Data manager / Data steward",
  "Librarian / Data librarian / Research support staff",
  "Other",
];

const showOtherInput = computed(() => form.value.roles.includes("Other"));

const roleDurationOptions = [
  "Less than 1 year",
  "1–3 years",
  "4–6 years",
  "7–10 years",
  "More than 10 years",
];

const dmpCountOptions = ["None", "1", "2–3", "4–5", "More than 5"];

const dmpReviewFrequencyOptions = [
  "Never",
  "Once or twice a year",
  "Every few months",
  "About once a month",
  "Weekly or more often",
];

const dmsFamiliarityOptions = [
  "Not at all familiar",
  "Slightly familiar",
  "Somewhat familiar",
  "Moderately familiar",
  "Extremely familiar",
];

const aiUsageOptions = [
  "Never",
  "Almost never",
  "Occasionally/Sometimes",
  "Often",
  "Always or almost always",
];

const aiComfortOptions = [
  "Not at all comfortable",
  "Slightly comfortable",
  "Somewhat comfortable",
  "Moderately comfortable",
  "Extremely comfortable",
];

const aiAttitudeOptions = [
  "Very against it",
  "Somewhat against it",
  "Neutral toward it",
  "Somewhat in favor of it",
  "Very in favor of it",
];

onMounted(async () => {
  const existing = await $fetch(`/api/dmp/background/${pid}`);
  if (existing) {
    form.value = {
      ...form.value,
      ...existing,
    };
  }
});

async function submitAndNext() {
  try {
    await $fetch("/api/dmp/background/save", {
      method: "POST",
      body: {
        participantId: pid,
        ...form.value,
      },
    });

    router.push("/app/preview");
  } catch (e) {
    console.error("Failed to save background:", e);
  }
}
</script>

<template>
  <div>
    <UCard variant="subtle" class="bg-white">
      <div
        class="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-6 lg:px-8 xl:px-8"
      >
        <div class="flex h-20 justify-center text-3xl">
          <strong>Background Information</strong>
        </div>

        <Placeholder class="space-y-6">
          <p class="text-lg">Let’s start with some information about you.</p>

          <strong class="mt-16 block text-lg"> Section 1: About You</strong>

          <div class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
            <div class="w-full sm:w-1/2">
              <label class="font-semibold flex">
                <span class="mr-2 flex-shrink-0">1.1.</span>
                <span class="flex-1">
                  What is your primary field or discipline?
                </span>
              </label>
            </div>
            <div class="w-full sm:w-1/2">
              <UInput
                v-model="form.field"
                placeholder="e.g., Biology, Psychology, Computer Science, Library Science, etc."
                class="w-full"
              />
            </div>
          </div>

          <div class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
            <div class="w-full sm:w-1/2">
              <label class="font-semibold flex">
                <span class="mr-2 flex-shrink-0">1.2.</span>
                <span class="flex-1">
                  What is your current role? (Select all that apply)
                </span>
              </label>
            </div>
            <div class="w-full sm:w-1/2">
              <div class="flex flex-col gap-4">
                <USelect
                  v-model="form.roles"
                  :items="roleOptions"
                  multiple
                  placeholder="Select your roles"
                  class="w-full"
                />
                <UInput
                  v-if="showOtherInput"
                  v-model="form.otherRole"
                  placeholder="Specify other role"
                  class="w-full"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
            <div class="w-full sm:w-1/2">
              <label class="font-semibold flex">
                <span class="mr-2 flex-shrink-0">1.3.</span>
                <span class="flex-1">
                  How long have you been in your current or a similar role?
                </span>
              </label>
            </div>
            <div class="w-full sm:w-1/2">
              <USelect
                v-model="form.roleDuration"
                :items="roleDurationOptions"
                placeholder="Select experience duration"
                class="w-full"
              />
            </div>
          </div>

          <strong class="mt-16 block text-lg"
            >Section 2: Experience with Data Management Plans (DMPs)</strong
          >

          <div class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
            <div class="w-full sm:w-1/2">
              <label class="font-semibold flex">
                <span class="mr-2 flex-shrink-0">2.1.</span>
                <span class="flex-1">
                  How many data management plans (DMPs) have you authored or
                  co-authored?
                </span>
              </label>
            </div>
            <div class="w-full sm:w-1/2">
              <USelect
                v-model="form.dmpCount"
                :items="dmpCountOptions"
                placeholder="Select DMP count"
                class="w-full"
              />
            </div>
          </div>

          <div class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
            <div class="w-full sm:w-1/2">
              <label class="font-semibold flex">
                <span class="mr-2 flex-shrink-0">2.2.</span>
                <span class="flex-1">
                  How often do you review DMPs?
                </span>
              </label>
            </div>
            <div class="w-full sm:w-1/2">
              <USelect
                v-model="form.dmpReviewFrequency"
                :items="dmpReviewFrequencyOptions"
                placeholder="Select frequency"
                class="w-full"
              />
            </div>
          </div>

          <div class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
            <div class="w-full sm:w-1/2">
              <label class="font-semibold flex">
                <span class="mr-2 flex-shrink-0">2.3.</span>
                <span class="flex-1">
                  How familiar are you with the NIH Data Management and
                  Sharing Plan (DMSP)?
                </span>
              </label>
            </div>
            <div class="w-full sm:w-1/2">
              <USelect
                v-model="form.dmsFamiliarity"
                :items="dmsFamiliarityOptions"
                placeholder="Select familiarity level"
                class="w-full"
              />
            </div>
          </div>

          <strong class="mt-16 block text-lg">
            Section 3: Attitudes Toward AI</strong
          >

          <div class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
            <div class="w-full sm:w-1/2">
              <label class="font-semibold flex">
                <span class="mr-2 flex-shrink-0">3.1.</span>
                <span class="flex-1">
                  How often have you used AI tools (e.g., ChatGPT, Copilot) to help write any part of a DMP?
                </span>
              </label>
            </div>
            <div class="w-full sm:w-1/2">
              <USelect
                v-model="form.aiUsage"
                :items="aiUsageOptions"
                placeholder="Select your usage"
                class="w-full"
              />
            </div>
          </div>

          <div class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
            <div class="w-full sm:w-1/2">
              <label class="font-semibold flex">
                <span class="mr-2 flex-shrink-0">3.2.</span>
                <span class="flex-1">
                  How comfortable are you using AI to assist in DMP writing?
                </span>
              </label>
            </div>
            <div class="w-full sm:w-1/2">
              <USelect
                v-model="form.aiComfort"
                :items="aiComfortOptions"
                placeholder="Select comfort level"
                class="w-full"
              />
            </div>
          </div>

          <div class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
            <div class="w-full sm:w-1/2">
              <label class="font-semibold flex">
                <span class="mr-2 flex-shrink-0">3.3.</span>
                <span class="flex-1">
                  What best describes your general attitude toward AI in
                  research workflows (e.g., grant writing, literature review, data analysis)? 
                </span>
              </label>
            </div>
            <div class="w-full sm:w-1/2">
              <USelect
                v-model="form.aiAttitude"
                :items="aiAttitudeOptions"
                placeholder="Select attitude"
                class="w-full"
              />
            </div>
          </div>

          <div class="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
            <div class="w-full sm:w-1/2">
              <label class="font-semibold flex">
                <span class="mr-2 flex-shrink-0">3.4.</span>
                <span class="flex-1">
                  Any additional comments about using generative AI for
                  drafting or reviewing DMPs?
                </span>
              </label>
            </div>
            <div class="w-full sm:w-1/2">
              <UTextarea
                v-model="form.additionalComments"
                placeholder="Write your comments here"
                rows="4"
                class="w-full"
              />
            </div>
          </div>
        </Placeholder>
      </div>
    </UCard>
    <div class="mt-6 mb-6 flex items-center justify-between">
      <UButton
        icon="i-lucide-arrow-left"
        color="primary"
        size="xl"
        @click="router.push('/app/introduction?pid=' + pid)"
      >
        Previous
      </UButton>

      <UButton
        trailing-icon="i-lucide-arrow-right"
        color="primary"
        size="xl"
        @click="submitAndNext"
      >
        Next
      </UButton>
    </div>
  </div>
</template>

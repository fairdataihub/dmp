<template>
  <UCard variant="subtle">
    <template #header>
      <Placeholder class="h-8">
        <div class="flex justify-center text-2xl">
          <strong>Background Information</strong>
        </div>
      </Placeholder>
    </template>

    <Placeholder class="space-y-6">
      <p class="text-lg">Let’s start with some information about you.</p>
      <strong class="text-lg"> Section 1: About You</strong>

      <div class="flex">
  <div class="w-1/2 p-4">
    <label class="font-semibold whitespace-nowrap">
      <UIcon name="ri:book-mark-line" class="text-primary w-4 h-4 mr-3" />
      1. What is your primary field or discipline?
    </label>
  </div>
  <div class="w-1/2 p-4">
    <UInput v-model="form.field" placeholder="e.g., Biology, Psychology..." class="w-96" />
  </div>
</div>

<div class="flex">
    <div class="w-1/2 p-4">
      <label class="font-semibold whitespace-nowrap">
        <UIcon name="ri:user-settings-line" class="text-primary w-4 h-4 mr-3" />
        2. What is your current role? (Select all that apply)
      </label>
    </div>
    <div class="w-1/2 p-4">
      <div class="flex gap-4 items-start">
        <USelect
          v-model="form.roles"
          :items="roleOptions"
          multiple
          placeholder="Select your roles"
          class="w-96"
        />
        <UInput
          v-if="showOtherInput"
          v-model="form.otherRole"
          placeholder="Specify other role"
          class="w-64"
        />
      </div>
    </div>
  </div>

  <div class="flex">
    <div class="w-1/2 p-4">
      <label class="font-semibold whitespace-nowrap">
        <UIcon name="ri:time-line" class="text-primary w-4 h-4 mr-3" />
        3. How long have you been in your current or a similar role?
      </label>
    </div>
    <div class="w-1/2 p-4">
      <USelect
        v-model="form.roleDuration"
        :items="roleDurationOptions"
        placeholder="Select experience duration"
        class="w-96"
      />
    </div>
  </div>
  <strong class="text-lg">Section 2: Experience with Data Management Plans (DMPs)</strong>
  <div class="flex">
    <div class="w-1/2 p-4">
      <label class="font-semibold whitespace-nowrap">
        <UIcon name="ri:file-copy-2-line" class="text-primary w-4 h-4 mr-3" />
        4. How many data management plans (DMPs) have you authored or co-authored?
      </label>
    </div>
    <div class="w-1/2 p-4">
      <USelect
        v-model="form.dmpCount"
        :items="dmpCountOptions"
        placeholder="Select DMP count"
        class="w-96"
      />
    </div>
  </div>

  <div class="flex">
    <div class="w-1/2 p-4">
      <label class="font-semibold whitespace-nowrap">
        <UIcon name="ri:calendar-check-line" class="text-primary w-4 h-4 mr-3" />
        5. How often do you review DMPs?
      </label>
    </div>
    <div class="w-1/2 p-4">
      <USelect
        v-model="form.dmpReviewFrequency"
        :items="dmpReviewFrequencyOptions"
        placeholder="Select frequency"
        class="w-96"
      />
    </div>
  </div>

  <div class="flex">
    <div class="w-1/2 p-4">
      <label class="font-semibold whitespace-nowrap">
        <UIcon name="ri:book-read-line" class="text-primary w-4 h-4 mr-3" />
        6. How familiar are you with the Data Management and Sharing (DMS) Policy?
      </label>
    </div>
    <div class="w-1/2 p-4">
      <USelect
        v-model="form.dmsFamiliarity"
        :items="dmsFamiliarityOptions"
        placeholder="Select familiarity level"
        class="w-96"
      />
    </div>
  </div>
  <strong class="text-lg"> Section 3: Attitudes Toward AI</strong>
  <div class="flex">
    <div class="w-1/2 p-4">
      <label class="font-semibold whitespace-nowrap">
        <UIcon name="ri:robot-2-line" class="text-primary w-4 h-4 mr-3" />
        7. Have you used AI tools (e.g., ChatGPT, Copilot) to help write any part of a DMP?
      </label>
    </div>
    <div class="w-1/2 p-4">
      <USelect
        v-model="form.aiUsage"
        :items="aiUsageOptions"
        placeholder="Select your usage"
        class="w-96"
      />
    </div>
  </div>

  <div class="flex">
    <div class="w-1/2 p-4">
      <label class="font-semibold whitespace-nowrap">
        <UIcon name="ri:emotion-happy-line" class="text-primary w-4 h-4 mr-3" />
        8. How comfortable are you using AI to assist in DMP writing?
      </label>
    </div>
    <div class="w-1/2 p-4">
      <USelect
        v-model="form.aiComfort"
        :items="aiComfortOptions"
        placeholder="Select comfort level"
        class="w-96"
      />
    </div>
  </div>

  <div class="flex">
    <div class="w-1/2 p-4">
      <label class="font-semibold whitespace-nowrap">
  <UIcon name="ri:brain-line" class="text-primary w-4 h-4 mr-3" />
  <span>9. What best describes your general attitude toward AI in research workflows</span>
  <span class="block pl-8">(e.g., grant writing, literature review, data analysis)?</span>
</label>

    </div>
    <div class="w-1/2 p-4">
      <USelect
        v-model="form.aiAttitude"
        :items="aiAttitudeOptions"
        placeholder="Select attitude"
        class="w-96"
      />
    </div>
  </div>

  <div class="flex">
    <div class="w-1/2 p-4">
      <label class="font-semibold whitespace-nowrap">
        <UIcon name="ri:chat-3-line" class="text-primary w-4 h-4 mr-3" />
        10. Any additional comments about using generative AI for drafting or reviewing DMPs?
      </label>
    </div>
    <div class="w-1/2 p-4">
      <UInput
        v-model="form.additionalComments"
        placeholder="Write your comments here"
        type="textarea"
        rows="4"
        class="w-96"
      />
    </div>
  </div>
    </Placeholder>

    <template #footer>
      <Placeholder class="h-8">
        <div class="flex justify-end">
          <UButton color="primary" @click="continueToDmp">
  Continue to DMP Generation
</UButton>

        </div>
      </Placeholder>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const router = useRouter()

function continueToDmp() {
  sessionStorage.setItem('backgroundForm', JSON.stringify(form.value))
  router.push('dmp')
}

const form = ref({
  field: '',
  roles: [] as string[],
  otherRole: '',
  roleDuration: '',
  dmpCount: '',
  dmpReviewFrequency: '',
    dmsFamiliarity: '',
    aiUsage: '',
  aiComfort: '',
  aiAttitude: '',
  additionalComments: ''
})

const roleOptions = [
  'Researcher (e.g., student, faculty, post-doctoral)',
  'Research administrator / Program officer',
  'Data manager / Data steward',
  'Librarian / Research support staff',
  'NIH or funder grant reviewer',
  'Other'
]

const showOtherInput = computed(() => form.value.roles.includes('Other'))

const roleDurationOptions = [
  'Less than 1 year',
  '1–3 years',
  '4–6 years',
  '7–10 years',
  'More than 10 years'
]

const dmpCountOptions = [
  'None',
  '1',
  '2–3',
  '4–5',
  'More than 5'
]

const dmpReviewFrequencyOptions = [
  'Never',
  'Once or twice a year',
  'Every few months',
  'About once a month',
  'Several times a month',
  'Weekly or more often'
]

const dmsFamiliarityOptions = [
  'Very familiar',
  'Somewhat familiar',
  'Heard of it, but not familiar with details',
  'Not familiar'
]

const aiUsageOptions = [
  'Yes, frequently',
  'Yes, occasionally',
  'Tried it once or twice',
  'No, but interested',
  'No, and not interested'
]

const aiComfortOptions = [
  'Very comfortable',
  'Somewhat comfortable',
  'Neutral',
  'Somewhat uncomfortable',
  'Very uncomfortable'
]

const aiAttitudeOptions = [
  'Enthusiastic and actively using it',
  'Curious but cautious',
  'Neutral',
  'Skeptical and concerned',
  'Opposed'
]
</script>

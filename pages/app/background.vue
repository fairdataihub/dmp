<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  const pid = route.query.pid as string

const form = useState('backgroundForm', () => ({
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
}))

  const dmpAssignments = useState<string[]>('assignedDmps', () => [])

  onMounted(async () => {
    if (!pid) return
    try {
      const res = await $fetch<{ participantId: string; dmps: string[] }>(`/api/dmp/assignment/${pid}`)
      dmpAssignments.value = res.dmps
    } catch (err) {
      console.error('Failed to fetch DMP assignments:', err)
    }
  })

  const roleOptions = [
    'Researcher (e.g., student, faculty, post-doctoral)',
    'Research administrator / Program officer',
    'Data manager / Data steward',
    'Librarian / Research support staff',
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
    'Weekly or more often'
  ]

  const dmsFamiliarityOptions = [
    'Not at all familiar',
    'Slightly familiar',
    'Somewhat familiar',
    'Moderately familiar',
    'Extremely familiar'
  ]

  const aiUsageOptions = [
    'Never use',
    'Almost never',
    'Occasionally/Sometimes',
    'Almost every time',
    'Frequently use'
  ]

  const aiComfortOptions = [
    'Not at all comfortable',
    'Slightly comfortable',
    'Somewhat comfortable',
    'Moderately comfortable',
    'Extremely comfortable'
  ]

  const aiAttitudeOptions = [
    'Not at all open',
    'Slightly open',
    'Somewhat open',
    'Moderately open',
    'Extremely open'
  ]
</script>

<template>
  <UCard variant="subtle" class="bg-white">
    <div class="px-60">
      <div class="flex justify-center text-3xl h-20">
        <strong>Background Information</strong>
      </div>

      <Placeholder class="space-y-6">
        <p class="text-lg">Let’s start with some information about you.</p>
        <strong class="text-lg"> Section 1: About You</strong>

        <div class="flex gap-x-8">
          <div class="w-1/2">
            <label class="font-semibold">
              1.1 What is your primary field or discipline?
            </label>
          </div>
          <div class="w-1/2">
            <UInput v-model="form.field" placeholder="e.g., Biology, Psychology, Computer Science, Library Science, etc." class="w-120" />
          </div>
        </div>

        <div class="flex gap-x-8">
          <div class="w-1/2">
            <label class="font-semibold">
              1.2. What is your current role? (Select all that apply)
            </label>
          </div>
          <div class="w-1/2">
            <div class="flex gap-4 items-start">
              <USelect v-model="form.roles" :items="roleOptions" multiple placeholder="Select your roles" class="w-120" />
              <UInput v-if="showOtherInput" v-model="form.otherRole" placeholder="Specify other role" class="w-64" />
            </div>
          </div>
        </div>

        <div class="flex gap-x-8">
          <div class="w-1/2">
            <label class="font-semibold">
              1.3. How long have you been in your current or a similar role?
            </label>
          </div>
          <div class="w-1/2">
            <USelect v-model="form.roleDuration" :items="roleDurationOptions" placeholder="Select experience duration" class="w-120" />
          </div>
        </div>
        <strong class="text-lg">Section 2: Experience with Data Management Plans (DMPs)</strong>
        <div class="flex gap-x-8">
          <div class="w-1/2">
            <label class="font-semibold">
              2.1. How many data management plans (DMPs) have you authored or co-authored?
            </label>
          </div>
          <div class="w-1/2">
            <USelect v-model="form.dmpCount" :items="dmpCountOptions" placeholder="Select DMP count" class="w-120" />
          </div>
        </div>

        <div class="flex gap-x-8">
          <div class="w-1/2">
            <label class="font-semibold">
              2.2. How often do you review DMPs?
            </label>
          </div>
          <div class="w-1/2">
            <USelect v-model="form.dmpReviewFrequency" :items="dmpReviewFrequencyOptions" placeholder="Select frequency" class="w-120" />
          </div>
        </div>

        <div class="flex gap-x-8">
          <div class="w-1/2">
            <label class="font-semibold">
              2.3. How familiar are you with the NIH Data Management and Sharing Plan (DMSP)?
            </label>
          </div>
          <div class="w-1/2">
            <USelect v-model="form.dmsFamiliarity" :items="dmsFamiliarityOptions" placeholder="Select familiarity level" class="w-120" />
          </div>
        </div>
        <strong class="text-lg"> Section 3: Attitudes Toward AI</strong>
        <div class="flex gap-x-8">
          <div class="w-1/2">
            <label class="font-semibold">
              3.1. Have you previously used AI tools (e.g., ChatGPT, Copilot) to help write any part of a DMP?
            </label>
          </div>
          <div class="w-1/2">
            <USelect v-model="form.aiUsage" :items="aiUsageOptions" placeholder="Select your usage" class="w-120" />
          </div>
        </div>

        <div class="flex gap-x-8">
          <div class="w-1/2">
            <label class="font-semibold">
              3.2. How comfortable are you using AI to assist in DMP writing?
            </label>
          </div>
          <div class="w-1/2">
            <USelect v-model="form.aiComfort" :items="aiComfortOptions" placeholder="Select comfort level" class="w-120" />
          </div>
        </div>

        <div class="flex gap-x-8">
          <div class="w-1/2">
            <label class="font-semibold">
              <span>3.3. What best describes your general attitude toward AI in research workflows?</span>
              <span class="block pl-2">(e.g., grant writing, literature review, data analysis)</span>
            </label>
          </div>
          <div class="w-1/2">
            <USelect v-model="form.aiAttitude" :items="aiAttitudeOptions" placeholder="Select attitude" class="w-120" />
          </div>
        </div>

        <div class="flex gap-x-8">
          <div class="w-1/2">
            <label class="font-semibold">
              3.4. Any additional comments about using generative AI for drafting or reviewing DMPs?
            </label>
          </div>
          <div class="w-1/2">
            <UInput v-model="form.additionalComments" placeholder="Write your comments here" type="textarea" rows="4" class="w-120" />
          </div>
        </div>
      </Placeholder>
    </div>
          <div class="flex justify-between mt-10">
        <UButton
          icon="i-lucide-arrow-left"
          color="primary"
          size="lg"
          @click="router.push('/app/introduction?pid=' + pid)"
          class="w-30 flex items-center justify-center"
        >
          Previous
        </UButton>

        <UButton
          trailing-icon="i-lucide-arrow-right"
          color="primary"
          size="lg"
          @click="router.push('/app/preview')"
          class="w-30 flex items-center justify-center"
        >
          Next
        </UButton>
      </div>
  </UCard>
</template>

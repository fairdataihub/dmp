<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const participantId = route.query.pid;

function goToNext() {
  router.push(`/app/background?pid=${participantId}`);
}
</script>

<template>
  <UCard variant="subtle" class="bg-white">
    <div class="px-60">
      <div class="mb-6 flex justify-center text-3xl">
        <strong>Introduction</strong>
      </div>

      <div class="space-y-6 text-base leading-relaxed text-gray-800">
        <p>
          Welcome to the NIH Data Management Plan (DMP) study survey! This
          survey aims to evaluate the potential of large language models (LLMs)
          in drafting high-quality, NIH-compliant Data Management Plans to
          assist researchers submitting proposals to the NIH.
        </p>

        <p>
          As part of your participation, you will review and provide feedback on
          sample NIH DMPs, some human and some LLM generated. You will be guided
          through the following pages:
        </p>

        <ul class="list-disc space-y-4 pl-6">
          <li>
            <strong>Background Information</strong>

            <br />
            You will be asked to provide information about your professional
            role, experience with DMPs, and attitudes toward the use of AI in
            research. All questions are optional and serve to contextualize your
            feedback.
          </li>

          <li>
            <strong>Evaluation of DMPs</strong>

            <br />

            You will successively review
            <strong>three randomly assigned NIH DMPs</strong> and assess the
            quality of each of their 12 sections based on standardized criteria,
            including technical accuracy, completeness, and clarity. You may
            also provide qualitative feedback and point out any issues you
            observe.
          </li>
        </ul>

        <p>
          Your participation plays a vital role in shaping the future of
          AI-assisted research infrastructure. This study has received an IRB
          exemption. No personal information will be collected. All responses
          will be anonymous and used solely for research purposes, in accordance
          with ethical and regulatory standards.
        </p>
      </div>

      <div class="mt-10 flex justify-center">
        <UButton color="primary" @click="goToNext"> Get Started </UButton>
      </div>
    </div>
  </UCard>
</template>

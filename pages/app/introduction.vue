<script setup lang="ts">
const router = useRouter();

const participantId = ref<string | null>(null);
const surveyCompleted = ref(false);

const pidCookie = useCookie<string | null>("pid", {
  maxAge: 60 * 60 * 24 * 3, // 3 days
});

onMounted(async () => {
  try {
    // Step 1: Get PID from cookie or API
    if (pidCookie.value) {
      participantId.value = pidCookie.value;
    } else {
      const res = await fetch("/api/dmp/assign-pid");
      const data = await res.json();

      participantId.value = data.pid;
      pidCookie.value = data.pid;
    }

    // Step 2: Check completion only after PID is available
    if (participantId.value) {
      const res = await $fetch<{ completed: boolean }>(
        `/api/dmp/check-completion?pid=${participantId.value}`,
      );

      surveyCompleted.value = res.completed;

      if (surveyCompleted.value) {
        router.push("/app/thank-you");
      }
    }
  } catch (error) {
    console.error("Error during PID assignment or completion check:", error);
  }
});

function goToNext(): void {
  if (!participantId.value) return;
  router.push(`/app/background?pid=${participantId.value}`);
}
</script>

<template>
  <UCard variant="subtle" class="bg-white">
    <div class="px-4 sm:px-10 md:px-20 lg:px-40 xl:px-60">
      <div class="mb-6 flex justify-center text-3xl">
        <strong>Introduction</strong>
      </div>

      <div class="space-y-6 text-base leading-relaxed text-gray-800">
        <p>
          Welcome to a survey on AI-assisted Data Management Plans (DMPs)!
          This survey aims to evaluate the potential of large language models
          (LLMs) in drafting high-quality, compliant Data Management Plans to assist
          researchers submitting proposals to federal funders.
        </p>

        <p>
          As part of your participation, you will review and provide feedback on
          sample NIH (National Institutes of Health) DMPs, some human and some
          LLM generated. You will be guided through the following pages:
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
            quality of each of their 6 sections based on standardized criteria,
            including technical accuracy, completeness, and clarity. You may
            also provide qualitative feedback and point out any issues you
            observe. Each one may have been written by a human or an LLM, and
            you will be asked to make a guess which it is.
          </li>
        </ul>

        <p>
          Your participation plays a vital role in shaping the future of
          LLM-assisted research infrastructure. This study was determined to not
          meet the definition of human subjects research by the UC Davis IRB
          (FWA No: 00004557, IORG: 0000251) . No identifiable information will
          be collected. All responses will be anonymous and used solely for
          product development research, in accordance with ethical and
          regulatory standards.
        </p>

        <p>
          Your answers will be saved as you go to a new page.
          You can go back and change answers at any time.  Once you submit
          on the final page, your answers cannot be changed anymore.
        </p>

        <p>
          This survey is conducted jointly by teams from the California Medical 
          Innovations Institute and the California Digital Library. If you have any questions, 
          feedback, or suggestions, please reach out to Nahid Zeinali at nzeinali@calmi2.org.
        </p>
      </div>
      <div class="flex justify-center mt-2">
        <p class="bg-yellow-100 border border-yellow-300 text-center text-yellow-800 mt-5 px-2 py-2 rounded w-200">
          <strong>Important:</strong> This survey must be completed in one sitting.
        </p>
      </div>
      <div class="mt-10 flex justify-center">
        <UButton color="primary" @click="goToNext"> Get Started </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from "vue";
const router = useRouter();
const dmpState = useState("dmpData");
const nihItems = [
  "CC - NIH Clinical Center",
  "CIT - Center for Information Technology",
  "FIC - Fogarty International Center",
  "NCATS - National Center for Advancing Translational Sciences",
  "NCCIH - National Center for Complementary and Integrative Health",
  "NEI - National Eye Institute",
  "NHGRI - National Human Genome Research Institute",
  "NHLBI - National Heart, Lung, and Blood Institute",
  "NIA - National Institute on Aging",
  "NIAAA - National Institute on Alcohol Abuse and Alcoholism",
  "NIAID - National Institute of Allergy and Infectious Diseases",
  "NIAMS - National Institute of Arthritis and Musculoskeletal and Skin Diseases",
  "NIBIB - National Institute of Biomedical Imaging and Bioengineering",
  "NICHD - Eunice Kennedy Shriver National Institute of Child Health and Human Development",
  "NIDA - National Institute on Drug Abuse",
  "NIDCD - National Institute on Deafness and Other Communication Disorders",
  "NIDCR - National Institute of Dental and Craniofacial Research",
  "NIDDK - National Institute of Diabetes and Digestive and Kidney Diseases",
  "NIEHS - National Institute of Environmental Health Sciences",
  "NIGMS - National Institute of General Medical Sciences",
  "NIMH - National Institute of Mental Health",
  "NIMHD - National Institute on Minority Health and Health Disparities",
  "NINDS - National Institute of Neurological Disorders and Stroke",
  "NINR - National Institute of Nursing Research",
  "NLM - National Library of Medicine",
  "OD - Office of the Director",
  "Other",
];

const selectedNih = ref("");
const otherNih = ref("");
const showOtherInput = ref(false);

const humanDataCollection = ref("No");
const dataSharingDescription = ref("");

const nonHumanDataCollection = ref("No");
const nonHumanSubjectsList = [
  "Pig",
  "Mouse",
  "Rat",
  "Monkey",
  "Dog",
  "Cat",
  "Other",
];
const selectedNonHumanSubjects = ref<string[]>([]);
const otherNonHumanSubject = ref("");
const showOtherNonHumanInput = ref(false);

const dataTypesDescription = ref("");
const studyProtocolDescription = ref("");

watch(selectedNih, (val) => {
  showOtherInput.value = val === "Other";
});

watch(selectedNonHumanSubjects, (val) => {
  showOtherNonHumanInput.value = val.includes("Other");
  if (!val.includes("Other")) {
    otherNonHumanSubject.value = "";
  }
});

async function generateDmp() {
  const payload = {
    dataSharingDescription: dataSharingDescription.value,
    dataTypesDescription: dataTypesDescription.value,
    humanDataCollection: humanDataCollection.value,
    nonHumanDataCollection: nonHumanDataCollection.value,
    otherNih: otherNih.value,
    otherNonHumanSubject: otherNonHumanSubject.value,
    selectedNih: selectedNih.value,
    selectedNonHumanSubjects: selectedNonHumanSubjects.value,
    studyProtocolDescription: studyProtocolDescription.value,
  };

  try {
    const res = await fetch("/api/dmp/generate-dmp", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const data = await res.json();

    dmpState.value = data;
    router.push("evaluation"); // Redirect to new page
  } catch (err) {
    console.error("Failed to generate DMP:", err);
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <Placeholder class="space-y-2">
        <div class="flex justify-center text-2xl font-bold">DMP Generation</div>

        <div class="text-center text-base">
          Fill out the form below with information about a proposal you are
          submitting to the NIH. When you're ready, click
          <strong>“Generate DMP”</strong> to get an LLM-generate DMP for your
          proposal.
        </div>
      </Placeholder>
    </template>
    <!-- Form Section -->
    <div class="mb-8 space-y-4">
      <!-- Row 1 -->
      <div class="flex">
        <div class="w-1/2 p-4">
          <label class="font-semibold whitespace-nowrap">
            <UIcon name="ri:file-list-line" class="text-primary mr-3 h-4 w-4" />
            Select the NIH institute where the proposal will be submitted:
          </label>
        </div>

        <div class="w-1/2 p-4">
          <div class="flex items-center gap-x-4">
            <USelect
              v-model="selectedNih"
              :items="nihItems"
              placeholder="Select NIH Institute"
              class="w-120"
            />

            <UInput
              v-if="showOtherInput"
              v-model="otherNih"
              placeholder="Specify other Institute"
              class="w-70"
            />
          </div>
        </div>
      </div>

      <!-- Row 2 -->
      <div class="flex">
        <div class="w-1/2 p-4">
          <label class="font-semibold whitespace-nowrap">
            <UIcon name="ri:file-list-line" class="text-primary mr-3 h-4 w-4" />
            Will your study involve data collection from human participants?
          </label>
        </div>

        <div class="w-1/2 p-4">
          <USelect
            v-model="humanDataCollection"
            :items="['Yes', 'No']"
            class="w-120"
          />

          <div v-if="humanDataCollection === 'Yes'" class="mt-4">
            <label class="mb-2 block">
              Describe what data is allowed to be shared as per your consent:
            </label>

            <UTextarea v-model="dataSharingDescription" class="w-120" />
          </div>
        </div>
      </div>

      <!-- Row 3 -->
      <div class="flex">
        <div class="w-1/2 p-4">
          <label class="font-semibold whitespace-nowrap">
            <UIcon name="ri:file-list-line" class="text-primary mr-3 h-4 w-4" />
            Will your study involve data collection from non-human subjects?
          </label>
        </div>

        <div class="w-1/2 p-4">
          <USelect
            v-model="nonHumanDataCollection"
            :items="['Yes', 'No']"
            class="w-120"
          />

          <div v-if="nonHumanDataCollection === 'Yes'" class="mt-4">
            <label class="mb-2 block">
              Provide a list of the non-human subjects involved:
            </label>

            <div class="flex items-center gap-x-4">
              <USelect
                v-model="selectedNonHumanSubjects"
                :items="nonHumanSubjectsList"
                multiple
                class="w-120"
              />

              <UInput
                v-if="showOtherNonHumanInput"
                v-model="otherNonHumanSubject"
                placeholder="Specify other subjects"
                class="w-70"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Row 4 -->
      <div class="flex">
        <div class="w-1/2 p-4">
          <div class="flex flex-col">
            <label class="flex items-center font-semibold whitespace-nowrap">
              <UIcon
                name="ri:file-list-line"
                class="text-primary mr-3 h-4 w-4"
              />
              Provide a list of all the types of data that you will collect
            </label>

            <p class="mt-1 ml-6 text-sm text-gray-600">
              (e.g., demographic data, clinical data, survey responses, genomic
              data, electronic health records (EHRs), sensor data, social media
              data, text data, image data, etc.)
            </p>
          </div>
        </div>

        <div class="w-1/2 p-4">
          <UTextarea v-model="dataTypesDescription" class="w-120" />
        </div>
      </div>

      <!-- Row 5 -->
      <div class="flex">
        <div class="w-1/2 p-4">
          <div class="flex flex-col">
            <label class="flex items-center font-semibold whitespace-nowrap">
              <UIcon
                name="ri:file-list-line"
                class="text-primary mr-3 h-4 w-4"
              />
              Provide a description of your study protocol
            </label>

            <p class="mt-1 ml-6 text-sm text-gray-600">
              (number of subjects, their organization into different groups, and
              what data will be collected from each group.)
            </p>
          </div>
        </div>

        <div class="w-1/2 p-4">
          <UTextarea v-model="studyProtocolDescription" class="w-120" />
        </div>
      </div>
    </div>

    <template #footer>
      <Placeholder class="h-8">
        <div class="flex justify-end">
          <UButton class="px-6 py-2" color="primary" @click="generateDmp"
            >Generate DMP</UButton
          >
        </div>
      </Placeholder>
    </template>
  </UCard>
</template>

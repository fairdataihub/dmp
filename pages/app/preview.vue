<script setup lang="ts">
import {
  splitMdByElements,
  type DmpElement,
} from "~/server/utils/splitMdByElements";

const assignedDmps = useState<string[]>("assignedDmps");
const currentDmpIndex = useState<number>("dmpIndex", () => 0);
const dmpState = useState<DmpElement[]>("dmpData");

const parsedElements = ref<DmpElement[]>([]);

const router = useRouter();

// Load markdown and parse it
async function loadDmpMd(index: number) {
  if (index < 0 || index >= assignedDmps.value.length) {
    parsedElements.value = [];

    return;
  }

  const name = assignedDmps.value[index];

  try {
    const response = await fetch(`/assets/dmp/${name}.md`);
    const markdown = await response.text();

    parsedElements.value = splitMdByElements(markdown);
  } catch (err) {
    console.error(`Error loading ${name}.md:`, err);
    parsedElements.value = [];
  }
}

// Load on mount and when index changes
watch(
  currentDmpIndex,
  (newIndex) => {
    console.log("Loading DMP index:", newIndex);
    loadDmpMd(newIndex);
  },
  { immediate: true },
);

function goToEvaluation() {
  dmpState.value = parsedElements.value;
  const currentPage = useState<number>("currentPage");

  currentPage.value = 0;
  router.push("/app/evaluation");
}

function goBack() {
  if (currentDmpIndex.value === 0) {
    router.push("/app/background");
  } else {
    currentDmpIndex.value--;
    const currentPage = useState<number>("currentPage");

    currentPage.value = 2; // Last page (page 3) of evaluation
    router.push("/app/evaluation");
  }
}

const driveFileIds = [
  "1jzuapwu4uWVP4bOzm1GaIxURa9Dw7Yzw",
  "1lAME9LXLO0TagJ4qlOjD8O9t28TMMp7x",
  "1h0uuGjjIwvc5Z5tqUuGevnJodMlMmn1S",
];

const pdfPath = computed(() => {
  const id = driveFileIds[currentDmpIndex.value];

  return id ? `https://drive.google.com/uc?export=download&id=${id}` : "";
});

const dmpOrdinal = computed(() => {
  const map = ["first", "second", "third"];

  return map[currentDmpIndex.value] || `${currentDmpIndex.value + 1}th`;
});
</script>

<template>
  <UCard variant="subtle" class="bg-white">
    <div class="px-60">
      <div class="flex h-20 justify-center text-3xl">
        <strong>Review</strong>
      </div>

      <p class="px-4 text-center text-lg">
        <template v-if="currentDmpIndex === 0">
          You will now successively evaluate three DMPs that have been assigned
          to you.
          <br />
        </template>
        Click below to download the {{ dmpOrdinal }} DMP and read it fully
        before continuing to the evaluation.
      </p>

      <div class="mt-4 text-center">
        <span class="inline-flex items-center gap-2 text-lg">
          <UIcon name="i-lucide-file-down" class="text-blue-600" />
          PDF Available:
          <a
            :href="pdfPath"
            download
            class="text-blue-600 underline"
            target="_blank"
            rel="noopener"
          >
            Download Now
          </a>
        </span>
      </div>
    </div>

    <div class="mt-10 flex justify-between px-4">
      <UButton
        icon="i-lucide-arrow-left"
        color="primary"
        size="lg"
        class="flex w-30 items-center justify-center"
        @click="goBack"
      >
        Previous
      </UButton>

      <UButton
        trailing-icon="i-lucide-arrow-right"
        color="primary"
        size="lg"
        class="flex w-30 items-center justify-center"
        @click="goToEvaluation"
      >
        Next
      </UButton>
    </div>
  </UCard>
</template>

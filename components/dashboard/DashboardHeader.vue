<script setup lang="ts">
const { clear, loggedIn, user } = useUserSession();

// Showing an alert for now but can redirect to a verification page later if needed
const emailVerified = computed(
  () => loggedIn.value && user.value?.emailVerified,
);

// Emit event setup
const emit = defineEmits(["update:sidebar-collapsed"]);

const sidebarCollapsed = ref(true);

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
  emit("update:sidebar-collapsed", sidebarCollapsed.value);
};

const logout = async () => {
  clear();
  await navigateTo("/login");
};
</script>

<template>
  <!-- Dashboard Header -->
  <header
    class="fixed top-0 right-0 left-0 z-10 block w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
  ></header>
</template>

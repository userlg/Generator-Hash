<script setup lang="ts">
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import UserDashboard from "@/components/UserDashboard.vue";
</script>

<template>
  <div
    class="min-h-screen flex flex-col relative bg-dark-950 text-dark-100 font-Poppins selection:bg-primary-500 selection:text-white"
  >
    <!-- Header -->
    <TheHeader />

    <!-- Main Content -->
    <div class="flex-grow w-full">
      <UserDashboard />
    </div>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

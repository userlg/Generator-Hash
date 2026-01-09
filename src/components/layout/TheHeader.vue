<script setup lang="ts">
import engine from "@/assets/engine.png";
import lock from "@/assets/lock.png";
</script>

<template>
  <header class="flex flex-col gap-4 justify-center items-center py-10">
    <h1
      class="text-primary-400 font-Poppins text-4xl font-bold text-center underline decoration-primary-600/30 underline-offset-8 cursor-default hover:text-primary-300 transition-colors duration-300"
    >
      Generator-Hash
    </h1>
    <div
      class="mt-4 relative flex flex-row justify-center items-center h-24 w-40"
    >
      <img
        :src="engine"
        alt="Engine"
        class="absolute z-10 w-24 h-24 left-0 animate-[spin_8s_linear_infinite] drop-shadow-xl"
      />
      <img
        :src="lock"
        alt="Lock"
        class="absolute z-20 w-24 h-24 right-0 drop-shadow-xl hover:scale-110 transition-transform duration-300"
      />
    </div>
  </header>
</template>

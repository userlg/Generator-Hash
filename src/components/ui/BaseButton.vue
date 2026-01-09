<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  type: "button",
  disabled: false,
  loading: false,
});

const baseClasses =
  "font-Poppins rounded text-sm px-4 py-2 transition-all duration-300 ease-in-out flex flex-row items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900";

const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return "bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-900/50 hover:shadow-primary-600/50 focus:ring-primary-500";
    case "secondary":
      return "bg-dark-700 hover:bg-dark-600 text-white border border-dark-600 hover:border-dark-500 focus:ring-dark-500";
    case "danger":
      return "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/50 hover:shadow-red-600/50 focus:ring-red-500";
    case "ghost":
      return "bg-transparent hover:bg-dark-800 text-dark-300 hover:text-white";
    default:
      return "bg-primary-600 hover:bg-primary-500 text-white";
  }
});
</script>

<template>
  <button
    :type="props.type"
    :class="[
      baseClasses,
      variantClasses,
      { 'opacity-50 cursor-not-allowed': props.disabled || props.loading },
    ]"
    :disabled="props.disabled || props.loading"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot></slot>
  </button>
</template>

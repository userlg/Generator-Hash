<script setup lang="ts">
import { computed } from "vue";

interface Props {
  label?: string;
  modelValue: string | number;
  type?: string;
  placeholder?: string;
  required?: boolean;
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
  placeholder: "",
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <label
      v-if="label"
      :for="id"
      class="text-sm font-semibold text-primary-400 font-Poppins ml-1"
      >{{ label }}</label
    >
    <input
      :id="id"
      v-model="value"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      class="w-full bg-dark-800 text-dark-100 border border-dark-600 rounded-lg px-3 py-2 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-300 font-Poppins placeholder-dark-500"
    />
  </div>
</template>

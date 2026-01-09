<script setup lang="ts">
import { reactive } from "vue";
import { usePasswordStore } from "@/stores/passwordStore";
import generateHashData from "@/security/bcrypt";
import type Password from "@/interfaces/password";
import BaseModal from "@/components/ui/BaseModal.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "saved"): void;
}>();

const store = usePasswordStore();

const form = reactive({
  context: "",
  rawPassword: "",
});

const handleClose = () => {
  form.context = "";
  form.rawPassword = "";
  emit("close");
};

const handleSave = () => {
  if (!form.context || !form.rawPassword) return;

  const localDate = new Date();
  const newPassword: Password = {
    context: form.context,
    date: localDate.toDateString(),
    hash: generateHashData(form.rawPassword),
  };

  store.addNewPassword(newPassword);

  // Reset and close
  form.context = "";
  form.rawPassword = "";
  emit("saved");
  emit("close");
};

const handleClear = () => {
  form.context = "";
  form.rawPassword = "";
};
</script>

<template>
  <BaseModal :is-open="isOpen" title="Generate New Hash" @close="handleClose">
    <form @submit.prevent="handleSave" class="flex flex-col gap-6">
      <div class="space-y-4">
        <BaseInput
          id="context"
          label="Context / Site"
          v-model="form.context"
          placeholder="e.g. Google, Facebook"
          required
        />

        <BaseInput
          id="password"
          label="Password"
          type="password"
          v-model="form.rawPassword"
          placeholder="Your secret password"
          required
        />
      </div>

      <div class="flex flex-row justify-end items-center gap-3 mt-4">
        <BaseButton type="button" variant="ghost" @click="handleClear">
          Clear
        </BaseButton>
        <BaseButton type="button" variant="danger" @click="handleClose">
          Cancel
        </BaseButton>
        <BaseButton type="submit" variant="primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          Save Hash
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

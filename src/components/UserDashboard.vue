<script setup lang="ts">
import { ref, computed } from "vue";
import { usePasswordStore } from "@/stores/passwordStore";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import PasswordTable from "@/components/PasswordTable.vue";
import PasswordForm from "@/components/PasswordForm.vue";

const store = usePasswordStore();
const userName = computed(() => store.getUsername);
const hasUser = computed(() => !!userName.value);

// Local state
const tempUserName = ref("");
const isEditingUser = ref(false);
const isAddModalOpen = ref(false);

const handleSetUser = () => {
  if (tempUserName.value.trim()) {
    store.addUserName(tempUserName.value);
    tempUserName.value = "";
  }
};

const handleUpdateUser = () => {
  if (tempUserName.value.trim()) {
    store.changeUserName(tempUserName.value);
    tempUserName.value = "";
    isEditingUser.value = false;
  }
};

const startEditingUser = () => {
  tempUserName.value = userName.value;
  isEditingUser.value = true;
};

const cancelEditingUser = () => {
  isEditingUser.value = false;
  tempUserName.value = "";
};

const handleClearAll = () => {
  if (
    confirm("Are you sure you want to delete all data? This cannot be undone.")
  ) {
    store.resetAll();
  }
};

const openAddModal = () => (isAddModalOpen.value = true);
const closeAddModal = () => (isAddModalOpen.value = false);
</script>

<template>
  <main class="w-full max-w-4xl mx-auto px-4 flex flex-col gap-8 mb-20">
    <!-- Onboarding: No User -->
    <Transition name="fade" mode="out-in">
      <div
        v-if="!hasUser"
        class="flex flex-col items-center gap-6 animate-fade-in-down py-10"
        key="onboarding"
      >
        <div
          class="bg-dark-900 border border-dark-700 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center"
        >
          <h2 class="text-2xl font-bold text-primary-400 mb-2 font-Poppins">
            Welcome!
          </h2>
          <p class="text-dark-400 mb-6 font-Poppins">
            Please enter your username to get started.
          </p>

          <form @submit.prevent="handleSetUser" class="flex flex-col gap-4">
            <BaseInput
              id="username"
              v-model="tempUserName"
              placeholder="Your Name"
              required
              class="text-center"
            />
            <BaseButton
              type="submit"
              variant="primary"
              :disabled="!tempUserName"
            >
              Get Started
            </BaseButton>
          </form>
        </div>
      </div>

      <!-- Dashboard: Has User -->
      <div
        v-else
        class="flex flex-col gap-8 animate-fade-in-down"
        key="dashboard"
      >
        <!-- User Controls -->
        <div
          class="flex flex-col md:flex-row justify-between items-center bg-dark-800/50 p-6 rounded-2xl border border-dark-700/50 backdrop-blur-sm gap-4"
        >
          <div class="flex items-center gap-3">
            <div
              class="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-900/50"
            >
              {{ userName.charAt(0).toUpperCase() }}
            </div>
            <div v-if="!isEditingUser" class="flex flex-col">
              <span class="text-xs text-dark-400 uppercase tracking-wider"
                >Logged in as</span
              >
              <h3 class="text-xl font-bold text-white font-Poppins">
                {{ userName }}
              </h3>
            </div>
            <form
              v-else
              @submit.prevent="handleUpdateUser"
              class="flex items-center gap-2"
            >
              <BaseInput
                id="editUser"
                v-model="tempUserName"
                required
                placeholder="New Name"
                class="w-32 md:w-48"
              />
              <BaseButton type="submit" variant="primary" class="!p-2">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </BaseButton>
              <BaseButton
                type="button"
                variant="danger"
                class="!p-2"
                @click="cancelEditingUser"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </BaseButton>
            </form>
          </div>

          <div class="flex items-center gap-3" v-if="!isEditingUser">
            <BaseButton variant="secondary" @click="startEditingUser">
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit
            </BaseButton>
            <BaseButton variant="danger" @click="handleClearAll">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Clear Data
            </BaseButton>
          </div>
        </div>

        <!-- Main Actions -->
        <div class="flex justify-center">
          <BaseButton
            variant="primary"
            class="!px-8 !py-3 !text-lg rounded-full"
            @click="openAddModal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Hash
          </BaseButton>
        </div>

        <!-- Table -->
        <div v-if="store.getTotalElementsPasswordsArray() > 0">
          <PasswordTable />
        </div>
        <div v-else class="text-center py-10">
          <h2 class="text-primary-500 font-Poppins text-xl animate-pulse">
            Create your first Password!
          </h2>
        </div>
      </div>
    </Transition>

    <!-- Modals -->
    <PasswordForm :is-open="isAddModalOpen" @close="closeAddModal" />
  </main>
</template>

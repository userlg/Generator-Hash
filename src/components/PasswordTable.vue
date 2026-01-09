<script setup lang="ts">
import { ref, computed } from "vue";
import { usePasswordStore } from "@/stores/passwordStore";
import { usePDFGenerator } from "@/composables/usePDFGenerator";
import useClipboard from "vue-clipboard3";
import BaseButton from "@/components/ui/BaseButton.vue";

const store = usePasswordStore();
const { generatePDF } = usePDFGenerator();
const { toClipboard } = useClipboard();

// Local state for copy feedback
const copiedIndex = ref<number | null>(null);

const passwords = computed(() => store.getPasswords);
const total = computed(() => store.getTotalElementsPasswordsArray());
const userName = computed(() => store.getUsername);

async function handleCopy(hash: string, index: number) {
  try {
    await toClipboard(hash);
    copiedIndex.value = index;
    setTimeout(() => {
      copiedIndex.value = null;
    }, 2000);
  } catch (e) {
    console.error(e);
  }
}

function handleDelete(index: number) {
  store.deletePasswordOfArray(index);
}

function handlePDF() {
  generatePDF(userName.value, passwords.value);
}
</script>

<template>
  <div class="w-full flex flex-col gap-4 animate-fade-in-down">
    <!-- Toolbar -->
    <div
      class="flex flex-row justify-between items-center bg-dark-800 p-4 rounded-xl border border-dark-700 shadow-md"
    >
      <div class="flex items-center gap-2">
        <span
          class="text-dark-400 font-semibold text-sm uppercase tracking-wider"
          >Total Hashes:</span
        >
        <span class="text-primary-400 font-bold font-Poppins text-lg">{{
          total
        }}</span>
      </div>

      <BaseButton v-if="total > 0" variant="danger" @click="handlePDF">
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
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        PDF
      </BaseButton>
    </div>

    <!-- Table Container -->
    <div
      class="bg-dark-900 rounded-xl border border-dark-700 shadow-xl overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr
              class="bg-dark-800 border-b border-dark-700 text-dark-400 uppercase text-xs tracking-wider"
            >
              <th class="p-4 font-semibold w-16 text-center">#</th>
              <th class="p-4 font-semibold">Context</th>
              <th class="p-4 font-semibold">Hash</th>
              <th class="p-4 font-semibold hidden md:table-cell">Date</th>
              <th class="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-dark-800">
            <tr
              v-for="(item, index) in passwords"
              :key="item.hash + index"
              class="hover:bg-dark-800/50 transition-colors duration-200 group"
            >
              <td class="p-4 text-center text-dark-500 font-mono">
                {{ index + 1 }}
              </td>
              <td class="p-4 text-dark-200 font-medium">{{ item.context }}</td>
              <td class="p-4">
                <div
                  class="font-mono text-xs text-primary-400 bg-primary-900/20 px-2 py-1 rounded max-w-[150px] md:max-w-xs truncate select-all"
                >
                  {{ item.hash }}
                </div>
              </td>
              <td class="p-4 text-dark-400 text-sm hidden md:table-cell">
                {{ item.date }}
              </td>
              <td class="p-4">
                <div class="flex items-center justify-end gap-2">
                  <!-- Copy Button -->
                  <button
                    @click="handleCopy(item.hash, index)"
                    class="p-2 rounded-lg transition-colors relative group-btn"
                    :class="
                      copiedIndex === index
                        ? 'text-green-400 bg-green-400/10'
                        : 'text-dark-400 hover:text-white hover:bg-dark-700'
                    "
                  >
                    <svg
                      v-if="copiedIndex === index"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z"
                      />
                    </svg>

                    <span
                      v-if="copiedIndex === index"
                      class="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg"
                      >Copied!</span
                    >
                  </button>

                  <!-- Delete Button -->
                  <button
                    @click="handleDelete(index)"
                    class="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
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
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="passwords.length === 0">
              <td colspan="5" class="p-10 text-center text-dark-500">
                <div class="flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12 opacity-20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <p>No passwords generated yet.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const props = defineProps<{
  isOpen: boolean;
  title?: string;
}>();

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.isOpen) {
    close();
  }
};

onMounted(() => document.addEventListener("keydown", handleKeydown));
onUnmounted(() => document.removeEventListener("keydown", handleKeydown));
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm"
        @click.self="close"
      >
        <Transition name="modal-pop">
          <div
            v-if="isOpen"
            class="bg-dark-900 border border-dark-700 rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative"
            role="dialog"
            aria-modal="true"
          >
            <!-- Header -->
            <div
              v-if="title"
              class="px-6 py-4 border-b border-dark-800 flex justify-between items-center bg-dark-800/50"
            >
              <h3 class="text-lg font-semibold text-primary-400 font-Poppins">
                {{ title }}
              </h3>
              <button
                @click="close"
                class="text-dark-400 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div v-else class="absolute top-2 right-2 z-10">
              <button
                @click="close"
                class="text-dark-400 hover:text-white transition-colors p-2 bg-dark-800/50 rounded-full hover:bg-dark-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="p-6">
              <slot></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-pop-enter-active {
  animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-pop-leave-active {
  animation: pop-in 0.2s reverse ease-in;
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>

<script setup lang="ts">
//Component to Add New Password

import { ref } from "vue";

import { usePasswordStore } from "../stores/passwordStore";

//import generateHash from './security/bcrypt';

import Password from "../interfaces/password";

const store = usePasswordStore();

let password = ref<Password>();

//------------Props to active the component
const props = withDefaults(defineProps<{
    active?: boolean
}>(), {
    active: false,
})

const emit = defineEmits<{
    (e: 'close'): void
}>()

function closeForm(): void {
    emit('close');
}

function savePassword(): void {
    if (password.value != undefined) {
        store.addNewPassword(password.value);
        password.value = undefined;
        closeForm();
    }
}


</script>
<template>
    <Transition name="fade">
        <div v-if="props.active != undefined && props.active == true" id="modal"
            class="absolute z-50 right-0 left-0 top-0 bottom-0 flex flex-col justify-center items-center">
            <div
                class="w-11/12 md:w-1/4 bg-white rounded border border-gray-700 shadow-md shadow-gray-700">
                <form @submit.prevent="savePassword()" class="font-Poppins flex flex-col justify-center items-center gap-3 p-3">
                    <h2>Cree su Password</h2>
                    <div class="flex flex-row justify-center items-center gap-2">
                        <button
                            class="p-1 bg-green-600 font-Poppins flex flex-row justify-center items-center gap-2 text-sm text-white rounded hover:bg-green-700 duration-300 ease-in">Guardar
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-3 h-3 stroke-2 stroke-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                        <button @click.prevent="closeForm"
                            class="text-white text-sm bg-red-500 hover:bg-red-700 rounded duration-500 ease-linear flex flex-row justify-center items-center gap-2 p-1">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </Transition>
</template>
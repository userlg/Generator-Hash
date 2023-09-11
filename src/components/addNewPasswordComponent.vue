<script setup lang="ts">
//Component to Add New Password

import { ref, onMounted } from "vue";

import { usePasswordStore } from "../stores/passwordStore";

import generateHash from '../security/bcrypt';

import Password from "../interfaces/password";

const store = usePasswordStore();

let password = ref<Password>();

let context = ref<string>('');

let hash = ref<string>('');

onMounted(() => {
    password.value = {
        context: '',
        date: '',
        hash: '',
    }
});

//------------Props to active the component
const props = withDefaults(defineProps<{
    active?: boolean
}>(), {
    active: false,
})

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'update'): void;
}>()

function closeForm(): void {
    cleanVariables();
    emit('close');

}

function cleanVariables(): void {
    context.value = '';
    hash.value = '';
    password.value = undefined;
}

function savePassword(): void {
    let localDate = new Date();
    password.value = {
        context: context.value,
        date: localDate.toDateString(),
        hash: generateHash(hash.value)
    }
    if (password.value != undefined) {
        store.addNewPassword(password.value);
        closeForm();
        emit('update');
    }
}


</script>
<template>
    <Transition name="fade">
        <div v-if="props.active != undefined && props.active == true" id="modal"
            class="absolute z-50 right-0 left-0 top-0 bottom-0 flex flex-col justify-center items-center w-full h-full">
            <div class="w-11/12 md:w-1/2 lg:w-1/4  bg-white rounded border border-gray-700 shadow-md shadow-gray-700">

                <form @submit.prevent="savePassword()"
                    class="font-Poppins flex flex-col justify-center items-center gap-3 p-3">
                    <h2 class="font-Poppins font-semibold text-lg text-center cursor-default text-gray-700">Cree su Hash!
                    </h2>
                    <label for="context" class="font-Poppins flex flex-col justify-center gap-1 p-1">
                        <p class="text-sm text-left font-semibold text-teal-600">
                            Contexto
                        </p>
                        <input type="text" class="indent-1 border border-gray-600 focus:border-none rounded" required
                            v-model="context">
                    </label>
                    <label for="context" class="font-Poppins flex flex-col justify-center gap-1 p-1">
                        <p class="text-sm text-left font-semibold text-teal-600">
                            Password
                        </p>
                        <input type="password" class="indent-1 border border-gray-600 focus:border-none rounded" required
                            v-model="hash">
                    </label>
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
                            class="text-white text-sm bg-red-500 hover:bg-red-700 rounded duration-500 ease-linear flex flex-row justify-center items-center gap-2 p-1">Cerrar
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="stroke-2 stroke-white w-3 h-3">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg></button>
                        <button @click.prevent="cleanVariables"
                            class="bg-emerald-600 hover:bg-emerald-700 duration-500 ease-linear text-sm p-1 font-Poppins text-white rounded flex flex-row justify-center items-center gap-2">Limpiar
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-3 h-3 stroke-2 stroke-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Transition>
</template>
<script setup lang="ts">

import { ref, onMounted } from 'vue';

import tablePasswords from "./components/tableComponent.vue";

import newPassword from "./components/addNewPasswordComponent.vue";

import { usePasswordStore } from './stores/passwordStore';

import engine from "@/assets/engine.png";

import lock from "@/assets/lock.png";

const store = usePasswordStore();

let userName = ref<string>('');

let newUserName = ref<string>('');

let activeNewPassword = ref<boolean>(false);

let activeChangeUserName = ref<boolean>(false);

let updateTotal = ref<boolean>(false);

onMounted(() => {
  userName.value = store.getUsername;
});

function addUserName(): void {
  if (newUserName.value != undefined && newUserName.value.length > 0) {
    store.addUserName(newUserName.value)
    userName.value = store.getUsername;
    newUserName.value = '';
  }
}

function changeUserName(): void {
  store.changeUserName(newUserName.value);
  userName.value = store.getUsername;
  activeChangeUserName.value = false;
}

function activeChangeForm(): void {
  newUserName.value = '';
  activeChangeUserName.value = true;
}

function cancelChangeUserName(): void {
  activeChangeUserName.value = false;
}

function deleteUserName(): void {
  userName.value = '';
  store.deleteUserName();
}

function openFormNewPassword(): void {
  activeNewPassword.value = true;
}

function closeFormNewPassword(): void {
  activeNewPassword.value = false;
}

function deleteAll(): void {
  userName.value = '';
  newUserName.value = '';
  store.resetAll();
}

function updateTotalEnable(): void {
  updateTotal.value = true;
}

function updateTotalDisable(): void {
  updateTotal.value = false;
}

</script>
<template>
  <newPassword :active="activeNewPassword" @close="closeFormNewPassword" @update="updateTotalEnable" />
  <div class="flex flex-col gap-3 justify-center items-center">
    <h2
      class="text-green-600 font-Poppins text-2xl font-semibold text-center my-10 underline cursor-default hover:scale-110 duration-300 ease-linear">
      Generator-Hash</h2>
    <div class="mt-8 relative flex flex-row justify-center items-center">
      <img :src="engine"
        class="absolute z-40 w-20 h-20 -mt-20 bg-transparent hover:scale-125 duration-300 animate-spin" />
      <img :src="lock" class="ml-20 w-20 h-20 -mt-20 bg-transparent hover:scale-125 duration-300 " />
    </div>
  </div>

  <div>
    <div v-if="userName != undefined && userName.length > 0"
      class="mx-auto my-4 font-Poppins flex flex-col justify-center items-center gap-2">
      <Transition name="slide-fade">
        <div v-if="!activeChangeUserName" class="flex flex-col gap-3 justify-center items-center">
          <div class="flex flex-row gap-2 justify-center items-center cursor-default">
            Usuario: <h3 class="text-green-500 font-semibold">{{ userName }} </h3>
          </div>
          <div class="flex flex-row justify-center items-center gap-2">
            <button @click="activeChangeForm"
              class="p-1 bg-green-600 font-Poppins flex flex-row justify-center items-center gap-2 text-sm text-white rounded hover:bg-green-700 duration-300 ease-in">Cambiar
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-3 h-3 stroke-2 stroke-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>
            <button @click="deleteUserName"
              class="p-1 bg-red-500 font-Poppins flex flex-row justify-center items-center gap-2 text-sm text-white rounded hover:bg-red-700 duration-300 ease-in">Borrar
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="stroke-2 stroke-white w-3 h-3">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
            <button @click.prevent="deleteAll"
              class="rounded text-white p-1 font-Poppins bg-gray-400 text-sm hover:bg-gray-700 duration-500 ease-linear flex flex-row justify-center items-center gap-2">Todo
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="stroke-2 stroke-white w-3 h-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>

            </button>

          </div>
        </div>
      </Transition>

      <!--Form to change Username -->
      <Transition name="slide-fade">
        <div v-if="activeChangeUserName">
          <form @submit.prevent="changeUserName()"
            class="flex flex-col gap-3 font-Poppins justify-center items-center p-4 border border-gray-700 rounded">
            <h2 class="cursor-default">Cambie su usuario</h2>
            <input type="text" required placeholder="Escribir"
              class="font-Poppins text-gray-700 indent-1  outline-green-600 rounded" v-model="newUserName">
            <div class="flex flex-row p-2 justify-center items-center gap-3">
              <button
                class="text-white bg-green-600 hover:bg-green-700 duration-500 ease-in p-1 font-Poppins rounded text-sm flex flex-row gap-2 justify-center items-center">Guardar
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="stroke-2 stroke-white w-3 h-3">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                </svg>
              </button>
              <button @click.prevent="cancelChangeUserName"
                class="rounded text-white p-1 font-Poppins bg-red-500 text-sm hover:bg-red-700 duration-500 ease-linear flex flex-row justify-center items-center gap-2">Cancelar
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="stroke-2 stroke-white w-3 h-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </div>
    <div v-else
      class="mx-auto p-3 lg:w-1/4 border-2 border-gray-800 rounded shadow shadow-gray-700 animate-fade-in-down mt-10">
      <form @submit.prevent="addUserName()" class="flex flex-col gap-3 font-Poppins justify-center items-center p-4">
        <h2>Introduzca su usuario</h2>
        <input type="text" required placeholder="escribir"
          class="font-Poppins text-gray-700 indent-1  outline-green-600 rounded" v-model="newUserName">
        <button v-if="newUserName.length > 0"
          class="p-1 bg-green-600 font-Poppins flex flex-row justify-center items-center gap-2 text-sm text-white rounded hover:bg-green-700 duration-300 ease-in">Guardar
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="stroke-2 stroke-white w-3 h-3">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
          </svg>
        </button>
      </form>
    </div>
  </div>
  <!-- Component To Show Table -->
  <Transition name="slide-fade">
    <div v-if="userName != undefined && userName.length > 0 && activeChangeUserName == false" class="mt-6 delay-1000">
      <button @click="openFormNewPassword"
        class="font-Poppins text-white bg-sky-500 hover:bg-sky-700 duration-700 ease-in-out p-1 mx-auto my-4 rounded flex flex-row justify-center items-center gap-2">Crear
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-3 h-3 stroke-2 stroke-white">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>

      </button>
      <div v-if="store.getTotalElementsPasswordsArray() > 0">
        <tablePasswords :total-update="updateTotal" @stop-update="updateTotalDisable" />
      </div>
      <div v-else>
        <h2 class="text-center font-Poppins animate-pulse text-emerald-600 text-md cursor-default">Cree su Primer
          Password!</h2>
      </div>
    </div>
  </Transition>
  <div class="absolute z-20 bottom-0 right-0 left-0 flex flex-col justify-center items-center bg-green-700 py-1"><a
      href="https://github.com/userlg"
      class="text-sm text-white duration-500 hover:text-orange-400 capitalize font-Lobster font-thin hover:scale-110 tracking-wide ease-in">Created
      by
    Userlg - 2023</a></div></template>
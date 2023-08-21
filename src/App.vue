<script setup lang="ts">

import { ref, onMounted } from 'vue';

import { usePasswordStore } from './stores/passwordStore';

const store = usePasswordStore();

let userName = ref<string>('');

let newUserName = ref<string>('');

onMounted(() => {
  userName.value = store.getUsername;
})

function addUsername(): void {
  store.addUserName(newUserName.value)
  userName.value = store.getUsername;
}

</script>
<template>
  <h2 class="text-green-600 font-Poppins text-2xl font-semibold text-center my-10">Generator-Hash</h2>

  <div v-if="userName != undefined && userName.length > 0">Usuario: {{ userName }}</div>
  <div v-else class="mx-auto p-3 lg:w-1/4 border-2 border-gray-800 rounded shadow shadow-gray-700">
    <form @submit.prevent="addUsername()" class="flex flex-col gap-3 font-Poppins justify-center items-center p-4">
      <h2>Introduzca su usuario</h2>
      <input type="text" placeholder="escribir" class="font-Poppins text-gray-700 indent-1  outline-green-600 rounded"
        v-model="newUserName">
      <button
        class="text-white bg-green-600 hover:bg-green-700 duration-500 ease-in p-1 font-Poppins rounded">Guardar</button>
    </form>

  </div>
</template>
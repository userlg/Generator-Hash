import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type Password from '../interfaces/password';

export const usePasswordStore = defineStore("password", () => {
    // State
    const userName = ref<string>('');
    const passwords = ref<Password[]>([]);

    // Getters
    const getUsername = computed(() => userName.value);
    const getPasswords = computed(() => passwords.value);
    
    // Actions
    function addUserName(name: string): void {
        userName.value = name;
    }

    function changeUserName(newName: string): void {
        userName.value = newName;
    }

    function addNewPassword(newPassword: Password) {
        passwords.value.push(newPassword);
    }

    function getTotalElementsPasswordsArray(): number {
        return passwords.value.length;
    }

    function deleteUserName(): void {
        userName.value = '';
    }

    function deletePasswordOfArray(index: number) {
        // Optimistic update or simple filter
        // Using filter as in original logic, but safely handling reactivity
        const targetHash = passwords.value[index].hash;
        passwords.value = passwords.value.filter(item => item.hash !== targetHash);
    }

    function resetAll(): void {
        userName.value = '';
        passwords.value = [];
    }

    return {
        // State
        userName,
        passwords,
        // Getters
        getUsername,
        getPasswords,
        // Actions
        addUserName,
        changeUserName,
        addNewPassword,
        getTotalElementsPasswordsArray,
        deleteUserName,
        deletePasswordOfArray,
        resetAll
    };
}, {
    persist: true,
});
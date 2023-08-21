import { defineStore } from "pinia";

import Password from '../interfaces/password';

interface State {
    userName: string,
    passwords: Password[],
}


export const usePasswordStore = defineStore("password", {
    state: (): State => ({
        userName: '',
        passwords: [],
    }),
    persist: true,
    getters: {
        getUsername(state): string {
            return state.userName;
        },

    },
    actions: {
        addUserName(name: string): void {
            this.userName = name;
        },
        changeUserName(newName: string): void {
            this.userName = newName;
        },
        addNewPassword(newPassword: Password) {
            this.passwords.push(newPassword);
        },
        getTotalElementsPasswordsArray(): number {
            return this.passwords.length;
        },
        deleteUserName(): void {
            this.userName = '';
        },

        resetAll(): void {
            this.userName = '';
            this.passwords = [];
        },
    },
});
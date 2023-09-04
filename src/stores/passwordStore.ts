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
        getPasswords(state): Array<Password> {
            return state.passwords
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
        deletePasswordOfArray(index: number) {
            this.passwords = this.passwords.filter(item => item.hash != this.passwords[index].hash);
        },

        resetAll(): void {
            this.userName = '';
            this.passwords = [];
        },
    },
});
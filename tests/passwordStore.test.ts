import { describe, it, expect } from "vitest";

import { setActivePinia, createPinia } from 'pinia';

import { usePasswordStore } from '../src/stores/passwordStore';

import { mount } from "@vue/test-utils";

import App from '../src/App.vue';

setActivePinia(createPinia());

const app = mount(App);

const store = usePasswordStore();

describe('Password Store', () => {

    it('Save a UserName', async () => {

        let user = 'newUser';

        expect(store.userName).toBe('');

        store.addUserName(user);

        expect(store.userName).toBe(user);

    })

    it('Clean Username', async () => {

        store.deleteUserName();

        expect(store.userName).toBe('');

    })

    it('Get Username', () => {

        let user = 'tester1';

        store.deleteUserName();

        expect(store.deleteUserName).toHaveBeenCalledOnce;

        store.addUserName(user);

        expect(store.userName).toBe(user);
    })

    it('Change The Username', () => {

        let user = 'User1';

        let newUser = 'User2';

        store.userName = user;

        expect(store.userName).toBe(user);

        store.changeUserName(newUser);

        expect(store.userName).toBe(newUser);

    })
});

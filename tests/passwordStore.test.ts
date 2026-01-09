import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from 'pinia';
import { usePasswordStore } from '@/stores/passwordStore';
import type Password from '@/interfaces/password';

describe('Password Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('Initial state is empty', () => {
        const store = usePasswordStore();
        expect(store.getUsername).toBe('');
        expect(store.getPasswords).toEqual([]);
    });

    it('Can Add and Delete UserName', () => {
        const store = usePasswordStore();
        const user = 'newUser';

        store.addUserName(user);
        expect(store.getUsername).toBe(user);

        store.deleteUserName();
        expect(store.getUsername).toBe('');
    });

    it('Can Change UserName', () => {
        const store = usePasswordStore();
        store.addUserName('User1');
        store.changeUserName('User2');
        expect(store.getUsername).toBe('User2');
    });

    it('Can Add Password', () => {
        const store = usePasswordStore();
        const newPass: Password = {
            context: 'test',
            hash: '123456',
            date: '2023-01-01'
        };

        store.addNewPassword(newPass);
        expect(store.getPasswords).toHaveLength(1);
        expect(store.getPasswords[0]).toEqual(newPass);
    });

    it('Can Delete Password by Index', () => {
        const store = usePasswordStore();
        const pass1: Password = { context: '1', hash: 'abc', date: '' };
        const pass2: Password = { context: '2', hash: 'def', date: '' };

        store.addNewPassword(pass1);
        store.addNewPassword(pass2);

        // Delete first one
        store.deletePasswordOfArray(0);

        expect(store.getPasswords).toHaveLength(1);
        expect(store.getPasswords[0].hash).toBe('def');
    });

    it('Can Reset All Data', () => {
        const store = usePasswordStore();
        store.addUserName('User');
        store.addNewPassword({ context: '1', hash: 'a', date: '' });

        store.resetAll();

        expect(store.getUsername).toBe('');
        expect(store.getPasswords).toEqual([]);
    });

    it('Calculates correctly total elements', () => {
        const store = usePasswordStore();
        store.addNewPassword({ context: '1', hash: 'a', date: '' });
        store.addNewPassword({ context: '2', hash: 'b', date: '' });
        expect(store.getTotalElementsPasswordsArray()).toBe(2);
    })
});

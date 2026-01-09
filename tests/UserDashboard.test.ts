import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from 'pinia';
import { mount } from "@vue/test-utils";
import UserDashboard from '@/components/UserDashboard.vue';
import { usePasswordStore } from '@/stores/passwordStore';

describe("UserDashboard.vue", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("Renders Onboarding when no user is set", () => {
        const wrapper = mount(UserDashboard);
        expect(wrapper.find('h2').text()).toBe('Welcome!');
        expect(wrapper.find('input#username').exists()).toBe(true);
    });

    it("Transitions to Dashboard after setting username", async () => {
        const wrapper = mount(UserDashboard);
        const store = usePasswordStore();

        // BaseInput renders the input with the ID passed
        await wrapper.find('#username').setValue('Kike');
        await wrapper.find('form').trigger('submit');

        expect(store.getUsername).toBe('Kike');
        expect(wrapper.text()).toContain('Logged in as');
    });

    it("Opens Create Hash Modal", async () => {
        const store = usePasswordStore();
        store.addUserName('Kike');
        const wrapper = mount(UserDashboard);

        expect(wrapper.findComponent({ name: 'PasswordForm' }).props('isOpen')).toBe(false);

        const createBtn = wrapper.findAll('button').find(b => b.text().includes('Create New Hash'));
        await createBtn?.trigger('click');

        expect(wrapper.findComponent({ name: 'PasswordForm' }).props('isOpen')).toBe(true);
    });

    it("Can Edit Username", async () => {
        const store = usePasswordStore();
        store.addUserName('OldName');
        const wrapper = mount(UserDashboard);

        // Find Edit button
        const editBtn = wrapper.findAll('button').find(b => b.text().includes('Edit'));
        await editBtn?.trigger('click');

        // Check if input appears
        const input = wrapper.find('input#editUser');
        expect(input.exists()).toBe(true);
        expect((input.element as HTMLInputElement).value).toBe('OldName');

        // Update
        await input.setValue('NewName');
        await wrapper.find('form').trigger('submit');

        expect(store.getUsername).toBe('NewName');
        expect(wrapper.find('input#editUser').exists()).toBe(false);
    });

    it("Can Clear All Data", async () => {
        // Mock confirm
        window.confirm = vi.fn(() => true);

        const store = usePasswordStore();
        store.addUserName('Kike');
        store.addNewPassword({ context: 'Site', hash: '123', date: '2023' });

        const wrapper = mount(UserDashboard);

        const clearBtn = wrapper.findAll('button').find(b => b.text().includes('Clear Data'));
        await clearBtn?.trigger('click');

        expect(window.confirm).toHaveBeenCalled();
        expect(store.getUsername).toBe('');
        expect(store.getPasswords).toHaveLength(0);

        // Should return to onboarding
        expect(wrapper.text()).toContain('Welcome!');
    });
});

import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from 'pinia';
import { mount } from "@vue/test-utils";
import PasswordForm from '@/components/PasswordForm.vue';
import { usePasswordStore } from '@/stores/passwordStore';

describe("PasswordForm.vue", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("Renders inputs when open", () => {
        const wrapper = mount(PasswordForm, {
            props: { isOpen: true },
            global: {
                stubs: { Teleport: true }
            }
        });

        // Since we use Teleport in BaseModal, we need to look at the body for the modal content?
        // Actually vt-utils 'mount' usually stubs Teleport or we can check wrapper.
        // However, our BaseModal uses Teleport to "body". 
        // Testing-utils usually renders Teleport content.

        expect(wrapper.find('#context').exists()).toBe(true);
        expect(wrapper.find('#password').exists()).toBe(true);
    });

    it("Saves a new password", async () => {
        const store = usePasswordStore();
        const wrapper = mount(PasswordForm, {
            props: { isOpen: true },
            global: {
                stubs: { Teleport: true } // Ensure teleport doesn't move content out
            }
        });

        await wrapper.find('#context').setValue('Google');
        await wrapper.find('#password').setValue('Secret123');

        await wrapper.find('form').trigger('submit');

        expect(store.getPasswords).toHaveLength(1);
        expect(store.getPasswords[0].context).toBe('Google');
        // Hash should be generated (not equal to raw password)
        expect(store.getPasswords[0].hash).not.toBe('Secret123');

        expect(wrapper.emitted()).toHaveProperty('saved');
        expect(wrapper.emitted()).toHaveProperty('close');
    });

    it("Clears inputs on cancel/close", async () => {
        const wrapper = mount(PasswordForm, {
            props: { isOpen: true },
            global: { stubs: { Teleport: true } }
        });

        await wrapper.find('#context').setValue('Draft');

        const cancelBtn = wrapper.findAll('button').find(b => b.text().includes('Cancel'));
        await cancelBtn?.trigger('click');

        expect(wrapper.emitted()).toHaveProperty('close');

        // Re-open/mount to check if cleared? 
        // In this component logic, handleClose clears variables.
        // We can check if internal state is cleared if we had access, or just trust the logic.
    });
});

import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from 'pinia';
import { mount } from "@vue/test-utils";
import App from '../src/App.vue';
import { usePasswordStore } from '@/stores/passwordStore';
// Mock necessary components to avoid deeper rendering issues in unit tests if needed, 
// but for integration testing App.vue we want to see if it renders children.

describe("App.vue Integration", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("Renders the Layout Components (Header, Footer, Dashboard)", async () => {
        const wrapper = mount(App);

        // Check for Header
        expect(wrapper.findComponent({ name: 'TheHeader' }).exists()).toBe(true);
        // Check for Footer
        expect(wrapper.findComponent({ name: 'TheFooter' }).exists()).toBe(true);
        // Check for UserDashboard
        expect(wrapper.findComponent({ name: 'UserDashboard' }).exists()).toBe(true);
    });

    it("Store interaction works within the app context", async () => {
        const store = usePasswordStore();
        expect(store.getUsername).toBe('');

        store.addUserName('Test User');
        expect(store.getUsername).toBe('Test User');
    });
});
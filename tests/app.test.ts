import { describe, it, expect } from "vitest";

import { setActivePinia, createPinia } from 'pinia';

import { usePasswordStore } from '../src/stores/passwordStore';

import { mount } from "@vue/test-utils";

import App from '../src/App.vue';


setActivePinia(createPinia());

const wrapper = mount(App);

const store = usePasswordStore();

describe("App.vue", () => {

    it("Component render correctly", async () => {
        expect(wrapper.find("h2").text()).toEqual('Generator-Hash');

    });

    it("Check UserName Store is Empty", async () => {

        store.deleteUserName();

        expect(store.getUsername).toBe('');

    });

    /*it("Show message h2 selector", async () => {

        const wrapper = mount(AppVue);

        expect(wrapper.find('h2').text()).toEqual('Choose your size');
    });

    it("Show component sizeSelector properly", async () => {
        const wrapper = mount(AppVue);

        expect(wrapper.findComponent({ name: 'SizeSelector' })).toBeTruthy();
    });
    
    it("Show component sizeSelector properly", async () => {
       
        const wrapper = mount(AppVue);
       
        expect(wrapper.findComponent({ name: 'SizeSelector' })).toBeTruthy();
    });

    it("Test on Updated", async () => {
        
        const wrapper = mount(AppVue);

        const buttons = wrapper.findComponent({ name: 'SizeSelector' }).findAll('button');

        await buttons[0].trigger('click');

        expect(wrapper.findComponent('onUpdated')).toBeTruthy();

    });*/
});
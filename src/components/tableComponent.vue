<script setup lang="ts">

import { ref, onMounted } from "vue";

import { usePasswordStore } from '../stores/passwordStore';

import download from "downloadjs";

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

import imgUrlPNG from '../assets/lock.png';

import Password from "../interfaces/password";

import useClipboard from 'vue-clipboard3';

const store = usePasswordStore();

let Total = ref<number>(0);

let Passwords = ref<Array<Password>>([]);

const { toClipboard } = useClipboard();

let copyActive = ref<boolean>(false);

let hash = ref<string>('');

const props = withDefaults(defineProps<{
    totalUpdate?: boolean
}>(), {
    totalUpdate: false,
});

const emit = defineEmits<{
    (e: 'stopUpdate'): void;
}>()

onMounted(() => {
    Total.value = store.getTotalElementsPasswordsArray();
    Passwords.value = store.getPasswords;
});

async function copyHash(index: number): Promise<void> {
    Passwords.value != undefined ? hash.value = Passwords.value[index].hash : '';
    try {
        copyActive.value = true;
        await toClipboard(hash.value);
        setTimeout(() => {
            copyActive.value = false;
            hash.value = '';
        }, 2500);
    }
    catch (e) {
        console.log(e);
    }

}

function update(): void {
    Total.value = store.getTotalElementsPasswordsArray();
    Passwords.value = store.getPasswords;
    emit('stopUpdate');
}

function deleteHash(index: number): void {
    Passwords.value = Passwords.value.filter(item => item.hash != Passwords.value[index].hash);
    store.deletePasswordOfArray(index);
    Passwords.value = store.getPasswords;
    Total.value = store.getTotalElementsPasswordsArray();
}


async function generatePDF(): Promise<void> {

    console.log('Generating PDF...');

    const pdfDoc = await PDFDocument.create();

    pdfDoc.setProducer('Userlg');

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const courierOblique = await pdfDoc.embedFont(StandardFonts.CourierOblique)

    const page = pdfDoc.addPage();
    const { height } = page.getSize();

    page.drawText('Generator Hash', {
        x: 50,
        y: height - 4 * 22,
        size: 22,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
    });

    const pngImageBytes = await fetch(imgUrlPNG).then((res) => res.arrayBuffer());

    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    const pngDims = pngImage.scale(0.40);

    page.drawImage(pngImage, {
        x: 195,
        y: height - 5 * 20,
        width: pngDims.width,
        height: pngDims.height,
    });

    page.drawText('Usuario: ' + store.getUsername, {
        x: 25,
        y: height - 6 * 22,
        size: 16,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
    });

    let spaceY = 34;

    let line = height - 7 * spaceY;

    console.log(line);

    Passwords.value.forEach((password, index) => {
        page.drawText(password.context + ' || ' + password.hash + ' || ' + password.date , {
            x: 10,
            y: line + index + spaceY,
            size: 10,
            font: courierOblique ,
            color: rgb(0, 0, 0),
        });
        spaceY += 16;
    });

    const pdfBytes = await pdfDoc.save();

    download(pdfBytes, "generator-hashes.pdf", "application/pdf");

}

</script>
<template>
    <div class="mx-auto flex flex-col justify-center items-center gap-2">
        <div v-if="props.totalUpdate">
            {{ update() }}</div>
        <h2 class="font-Poppins text-green-500 font-semibold cursor-default">Tabla de Hashes</h2>
        <div class="flex flex-row gap-2 justify-center items-center font-Poppins cursor-default my-2">
            <p>Total:</p>
            <p class="text-green-600 font-semibold">{{ Total }}</p>
        </div>
        <div class="relative w-full animate-fade-in-right" v-if="Passwords != undefined && Passwords.length > 0">
            <button @click="generatePDF"
                class="absolute z-20 animate-fade-in-down delay-1000 right-6 bottom-5 top-0 font-Poppins p-3 rounded duration-300 hover:bg-red-800 ease-in-out bg-red-500 text-white flex flex-row justify-center items-center gap-2">PDF<svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-5 h-5 stroke-2 stroke-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </button>
        </div>
        <table
            class="table w-full mb-10 md:w-11/12 table-fixed mt-6 animate-fade-in-down duration-300 ease-linear rounded shadow-md shadow-gray-500 delay-500">
            <thead class="font-Poppins font-semibold">
                <tr>
                    <th class="w-10 cursor-default">#</th>
                    <th class="cursor-default">
                        Contexto
                    </th>
                    <th class="cursor-default">Hash</th>
                    <th class="capitalize cursor-default">Opciones</th>
                    <th class="cursor-default hidden md:table-cell">Fecha</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="password, index in Passwords" :key="index">
                    <td class="cursor-default">{{ index + 1 }}</td>
                    <td class="font-semibold cursor-default">
                        {{ password.context }}
                    </td>
                    <td class="truncate cursor-default animate-pulse text-sm text-gray-800">{{ password.hash }}</td>
                    <td>
                        <div class="flex flex-row gap-3 justify-center items-center p-1">
                            <button @click="copyHash(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6 stroke-2 stroke-green-600">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                                </svg>
                                <Transition>
                                    <div v-if="copyActive && Passwords != undefined && hash == Passwords[index].hash"
                                        class="absolute -ml-4">
                                        <div class="flex flex-col justify-center items-start gap-0">
                                            <span class="font-Poppins text-white text-xs bg-green-500 p-1 rounded">
                                                Copiado</span>
                                        </div>
                                    </div>
                                </Transition>
                            </button>
                            <button @click="deleteHash(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="w-6 h-6 stroke-2 stroke-red-500">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </td>
                    <td class="font-Poppins text-sm cursor-default hidden md:table-cell">{{ password.date }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style>
.bounce-enter-active {
    overflow: hidden;
    animation: bounce-in 0.5s;
}

.bounce-leave-active {
    overflow: hidden;
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
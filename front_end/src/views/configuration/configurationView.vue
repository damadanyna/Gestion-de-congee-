<template>
<div class="flex flex-col px-3 py-1">
    <div class=" flex">
        <router-link to="/" class=" px-2 group transform hover:scale-125">
            <svg class=" w-9" viewBox="0 0 24 24">
                <path class=" group-hover:text-indigo-500 fill-current text-gray-600" d="M15.41 16.58 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" /></svg>
        </router-link>
        <div>
            <span class=" text-indigo-500 font-bold">Panneau de Configuration</span>
        </div>
    </div>
    <div class="flex w-full px-14 flex-col mt-10">

        <div class="mt-5 w-full border-b border-gray-300">
            <div class="flex flex-col">
                <span class=" text-gray-500 text-2xl">Utilisateur</span>
            </div>
        </div>

        <div class=" flex flex-row mt-2">
            <div class=" rounded-full bg-indigo-500 p-4">
                <svg class="w-16" viewBox="0 0 24 24">
                    <path class=" fill-current text-white" d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" /></svg>
            </div>
            <div class=" flex flex-col ml-4">
                <span class=" text-gray-700">Nom d'utilisateur</span>
                <div class=" flex flex-row items-center">
                    <svg v-if="edit_!=false" @click="set_edit_state()" class=" w-6 cursor-pointer" viewBox="0 0 24 24">
                        <path class=" fill-current text-gray-700" d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7z" /></svg>
                    <svg v-else @click="set_edit_state()" class=" w-6 cursor-pointer" viewBox="0 0 24 24">
                        <path class=" fill-current text-gray-700" d="M20.71 7.04c-.34.34-.67.67-.68 1-.03.32.31.65.63.96.48.5.95.95.93 1.44-.02.49-.53 1-1.04 1.5l-4.13 4.14L15 14.66l4.25-4.24-.96-.96-1.42 1.41-3.75-3.75 3.84-3.83c.39-.39 1.04-.39 1.41 0l2.34 2.34c.39.37.39 1.02 0 1.41M3 17.25l9.56-9.57 3.75 3.75L6.75 21H3v-3.75z" /></svg>
                    <span v-if="edit_==false" class=" text-gray-700 font-semibold text-2xl cursor-pointer" v-text="name_"></span>
                    <input v-else type="text" placeholder=" Nom d'utilisateur" v-model="name_">
                </div>
                <div>
                    <u class=" text-indigo-500 cursor-pointer">Mot de passe</u>
                </div>
            </div>
        </div>
        <div class="mt-5 w-full border-b border-gray-300 mt-6">
            <div class="flex flex-col">
                <span class=" text-gray-500 text-2xl">Thème</span>
            </div>
        </div>

        <div class=" flex flex-row mt-2">
            <div class=" flex flex-row ml-4">
                <span @click="set_theme_state" class=" text-indigo-700 cursor-pointer " v-text="theme_?'Clair':'Sombre'"></span>
                <div class=" flex flex-row items-center">
                    <svg v-if="theme_" viewBox="0 0 24 24" class="w-6 ml-3">
                        <path class=" fill-current text-indigo-500" d="M12 2a10 10 0 0 0 0 20z" /></svg>
                    <svg v-else viewBox="0 0 24 24" class="w-6 ml-3">
                        <path class=" fill-current text-indigo-500" d="M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0-7 2.39 3.42C13.65 5.15 12.84 5 12 5c-.84 0-1.65.15-2.39.42L12 2M3.34 7l4.16-.35A7.2 7.2 0 0 0 5.94 8.5c-.44.74-.69 1.5-.83 2.29L3.34 7m.02 10 1.76-3.77a7.131 7.131 0 0 0 2.38 4.14L3.36 17M20.65 7l-1.77 3.79a7.023 7.023 0 0 0-2.38-4.15l4.15.36m-.01 10-4.14.36c.59-.51 1.12-1.14 1.54-1.86.42-.73.69-1.5.83-2.29L20.64 17M12 22l-2.41-3.44c.74.27 1.55.44 2.41.44.82 0 1.63-.17 2.37-.44L12 22z" /></svg>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            name_: 'Benito',
            edit_: false,
            theme_: true,
        }
    },
    methods: {
        set_edit_state() {
            this.edit_ ? this.edit_ = false : this.edit_ = true
        },
        set_theme_state() {
            this.theme_ ? this.theme_ = false : this.theme_ = true
            this.$store.state.is_dark = this.theme_
        },
    }
}
</script>

<style>

</style>

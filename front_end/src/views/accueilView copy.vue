<template>
<loginView v-if="!this.$store.state.data.user.util_status==1"></loginView>
<div v-else class=" flex flex-col w-full h-full">
    <div class="flex justify-between w-full">
        <div class=" flex flex-row w-60 rounded-xl justify-center mt-3 ml-3 items-center bg-indigo-600">
            <svg class=" w-7" viewBox="0 0 24 24">
                <path class=" fill-current text-white" d="M10 4v4h4V4h-4m6 0v4h4V4h-4m0 6v4h4v-4h-4m0 6v4h4v-4h-4m-2 4v-4h-4v4h4m-6 0v-4H4v4h4m0-6v-4H4v4h4m0-6V4H4v4h4m2 6h4v-4h-4v4M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4c-1.08 0-2-.9-2-2V4a2 2 0 0 1 2-2z" /></svg>
            <span class=" text-2xl text-white ">Page d'accueil</span>
        </div>
        <div @click="this.$store.state.decView=false" class="  px-4 py-1 hover:scale-125 transform group cursor-pointer" title=" Deconnectez ?">
            <svg class=" w-7" viewBox="0 0 24 24">
                <path class=" fill-current  " :class="this.$store.state.is_dark?'text-white group-hover:text-red-600':'text-gray-700 group-hover:text-red-600'" d="m16.56 5.44-1.45 1.45A5.969 5.969 0 0 1 18 12a6 6 0 0 1-6 6 6 6 0 0 1-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 5.44A7.961 7.961 0 0 0 4 12a8 8 0 0 0 8 8 8 8 0 0 0 8-8c0-2.72-1.36-5.12-3.44-6.56M13 3h-2v10h2" /></svg>
        </div>
    </div>
    <div class=" flex justify-center w-full h-full items-center">
        <div class=" grid grid-cols-3  ">
            <router-link v-for="item, i in boites" :key="i" :to="item.url" class=" hover:border-indigo-500 group transform hover:scale-110 px-16 py-8 mx-5 my-3 border rounded-lg cursor-pointer border-gray-400">
                <div class="flex flex-col">

                    <svg viewBox="0 0 24 24">
                        <path class=" fill-current group-hover:text-indigo-500 text-gray-400" :d="item.icon" /></svg>
                    <span class=" text-gray-400 text-xl group-hover:text-indigo-500">{{item.title}}</span>
                </div>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import loginView from './auth/loginView.vue'
export default {
    components: {
        loginView
    },
    data() {
        return {
            boites: [{
                    title: "Tableau de bord",
                    icon: "M22 21H2V3h2v16h2v-9h4v9h2V6h4v13h2v-5h4v7z",
                    url: "/tableau"
                },
                {
                    title: "Employé",
                    icon: "M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9 3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3 3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3 3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.536 5.536 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65 2.56.34 4.45 1.51 4.45 2.9V20z",
                    url: "/employe"
                },
                {
                    title: "Présence",
                    icon: "m21.1 12.5 1.4 1.41-6.53 6.59L12.5 17l1.4-1.41 2.07 2.08 5.13-5.17M10 17l3 3H3v-2c0-2.21 3.58-4 8-4l1.89.11L10 17m1-13a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z",
                    url: "/presence"
                },
                {
                    title: "Abscence",
                    icon: "M10 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H2v-2c0-2.21 3.58-4 8-4m10-2V7h2v6h-2m0 4v-2h2v2h-2z",
                    url: "/abscence"
                },
                {
                    title: "Conger",
                    icon: "M10.63 14.1a6.998 6.998 0 0 1 9.27-3.47 6.998 6.998 0 0 1 3.47 9.27A6.98 6.98 0 0 1 17 24c-2.7 0-5.17-1.56-6.33-4H1v-2c.06-1.14.84-2.07 2.34-2.82S6.72 14.04 9 14c.57 0 1.11.05 1.63.1M9 4c1.12.03 2.06.42 2.81 1.17S12.93 6.86 12.93 8c0 1.14-.37 2.08-1.12 2.83-.75.75-1.69 1.12-2.81 1.12s-2.06-.37-2.81-1.12C5.44 10.08 5.07 9.14 5.07 8c0-1.14.37-2.08 1.12-2.83C6.94 4.42 7.88 4.03 9 4m8 18a5 5 0 0 0 5-5 5 5 0 0 0-5-5 5 5 0 0 0-5 5 5 5 0 0 0 5 5m-1-8h1.5v2.82l2.44 1.41-.75 1.3L16 17.69V14z",
                    url: "/annuel"
                },
                {
                    title: "Configuration",
                    icon: "m21.71 20.29-1.42 1.42a1 1 0 0 1-1.41 0L7 9.85A3.81 3.81 0 0 1 6 10a4 4 0 0 1-3.78-5.3l2.54 2.54.53-.53 1.42-1.42.53-.53L4.7 2.22A4 4 0 0 1 10 6a3.81 3.81 0 0 1-.15 1l11.86 11.88a1 1 0 0 1 0 1.41M2.29 18.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0l5.47-5.46-2.83-2.83M20 2l-4 2v2l-2.17 2.17 2 2L18 8h2l2-4z",
                    url: "/config"
                },
            ]
        }
    }
}
</script>

<style>

  </style>

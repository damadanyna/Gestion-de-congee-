<template>
<div class="flex flex-row  px-5 items-center justify-between w-full h-full  ">
    <div class=" flex flex-col w-full items-center ">
        <span class="   text-red-500"> Ministere de l'economie et des Finances</span>
        <span class=" text-3xl font-bold text-green-500"> Gestion de pointage</span>
        <span class=" "> Développer par Benito</span>
    </div>
    <div class=" flex flex-col w-full items-start">
        <div class="flex flex-col clear-left   py-4 px-5 rounded-xl  ">
            <span class="   text-4xl mb-6">Authantification</span>
            <div class=" border border-gray-300 rounded-lg px-2 flex flex-row">
                <svg class="w-5" viewBox="0 0 24 24">
                    <path class=" fill-current text-gray-400" d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" /></svg>
                <input v-model="user.email" type="text" placeholder="Nom d'utilisateur" class=" bg-transparent outline-none ml-2  py-1">
            </div>
            <div class=" border border-gray-300 rounded-lg px-2 flex flex-row mt-4">
                <svg class="w-5" viewBox="0 0 24 24">
                    <path class=" fill-current text-gray-400" d="M17 7h5v10h-5v2a1 1 0 0 0 1 1h2v2h-2.5c-.55 0-1.5-.45-1.5-1 0 .55-.95 1-1.5 1H12v-2h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2V2h2.5c.55 0 1.5.45 1.5 1 0-.55.95-1 1.5-1H20v2h-2a1 1 0 0 0-1 1v2M2 7h11v2H4v6h9v2H2V7m18 8V9h-3v6h3M8.5 12A1.5 1.5 0 0 0 7 10.5 1.5 1.5 0 0 0 5.5 12 1.5 1.5 0 0 0 7 13.5 1.5 1.5 0 0 0 8.5 12m4.5-1.11c-.61-.56-1.56-.51-2.12.11-.56.6-.51 1.55.12 2.11.55.52 1.43.52 2 0v-2.22z" /></svg>
                <input v-model="user.pass" :type="hidden?'password':'text'" placeholder="Mot de passe " class=" bg-transparent outline-none ml-2  py-1">
                <svg @click="cheked(false)" v-if="hidden" class="w-5 cursor-pointer" viewBox="0 0 24 24">
                    <path class=" fill-current text-gray-400" d="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" /></svg>
                <svg v-else @click="cheked(true)" class="w-5 cursor-pointer" viewBox="0 0 24 24">
                    <path class=" fill-current text-gray-400" d="M11.83 9 15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8 1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7z" /></svg>
            </div>
            <div class=" rounded-lg px-2 bg-green-500 flex flex-row mt-4 border border-green-500">
                <button @click="connection()" class="  text-white text-xl w-full rounded-lg"> Se Connecter</button>
            </div>
            <div class=" rounded-lg px-2 border border-gray-400 mt-3">
                <router-link to="/inscription" class=" flex text-gray-400 text-xl w-full rounded-lg items-center justify-center">
                    <svg class="w-5 " viewBox="0 0 24 24">
                        <path class=" fill-current text-gray-400" d="M9 5v4h12V5M9 19h12v-4H9m0-1h12v-4H9M4 9h4V5H4m0 14h4v-4H4m0-1h4v-4H4v4z" /></svg>
                    <span>S'inscrire</span>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            hidden: true,
            user: {
                email: '',
                pass: ''
            }
        }
    },
    methods: {
        cheked(val) {
            this.hidden = val
        },
        async connection() {
            const util = {
                util_email: this.user.email,
                util_pass: this.user.pass
            }
            try {
                const _r = await this.$http.post('api/log_user', util)
                if (_r.status) {
                    console.log(_r)
                    window.location = '/'
                }
            } catch (e) {
                alert('Erreur de connexion' + e)
            }
        }

    }
}
</script>

<style>

</style>

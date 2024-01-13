<template>
<div class=" z-50 flex justify-center items-center w-full h-full my-bg">
    <div class=" px-10 py-5 flex flex-col bg-white rounded-lg z-10">
        <span class=" text-2xl mb-4 font-bold pb-2">Fiche de présence</span>
        <div class="flex flex-col">
            <div class="mb-4 cursor-pointer" @click="getAllListEmploye()">
                <span v-if="!getEmp.im_emp" class=" py-1 border rounded-lg border-gray-400 w-64 px-3">Séléctionner une employé </span>
                <div v-else class=" flex flex-col">
                    <span class=" text-xs text-indigo-500">{{getEmp.im_emp }} </span>
                    <span class=" py-1 border rounded-lg border-gray-400 w-64 px-3">{{ getEmp.nom}} </span>
                </div>
            </div>
            <select name="" id="" v-model="presence.statut_pres">
                <option value="0">Matin</option>
                <option value="1">Apres-Midi</option>
            </select>
        </div>
        <div class=" flex flex-row mt-4 w-full  justify-end">
            <button class=" text-gray-600 font-bold" @click=" this.$store.commit('set_pres_form',false)"> Annuler </button>
            <button @click="enreg_pres()" class=" bg-indigo-500 text-white rounded-lg ml-4 py-1 items-center px-5 flex">
                <svg class=" w-7" viewBox="0 0 24 24">
                    <path class=" fill-current text-white" d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7z" /></svg>
                Enregister
            </button>
        </div>
    </div>
    <div v-if=" show_liste" class=" absolute z-20 border border-gray-200 bg-white rounded-lg py-2">
        <div v-for="item,i in emp_disp" @click="getIt(item)" :key="i" class="  hover:bg-gray-100 cursor-pointer items-center px-6 py-2  flex flex-row">
            <div class="px-1 rounded-full py-1 bg-slate-400">
                <svg class=" w-8" viewBox="0 0 24 24">
                    <path class=" fill-current text-gray-200" d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" /></svg>
            </div>
            <div class="flex flex-col ml-2">
                <span>{{item.emp_nom_prenom}}</span>

                <span class=" text-xs text-indigo-500 font-bold">{{item.emp_fonction}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            presence: {
                im_emp: '',
                statut_pres: '',
            },
            show_liste: false,
            getEmp: {},
            emp_disp: {},
            date_: new Date().toDateString(),
        }
    },
    methods: {
        getIt(val) {
            this.show_liste = false
            this.getEmp.im_emp = val.emp_im
            this.getEmp.nom = val.emp_nom_prenom
        },
        async enreg_pres() {
            this.presence.im_emp = this.getEmp.im_emp
            try {
                const _r = await this.$http.post('api/presence', this.presence)
                let _d = _r.data
                if (_d.status) {
                    this.getAllList()
                    this.$store.commit('set_pres_form', false)
                } else {
                    console.log(_d.message)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async getAllList() {
            this.$store.commit('find', this.array = {
                url: 'api/presencee',
                type_var: 'presence',
                value: '',
                date_: this.date_,
                day_type: 0
            });
        },

        dateDiff(init, final) {
            var diff = {}
            var tmp = init - final

            tmp = Math.floor(tmp / 1000)
            diff.sec = tmp % 60

            tmp = Math.floor((tmp - diff.sec) / 60)
            diff.min = tmp % 60

            tmp = Math.floor((tmp - diff.min) / 60)
            diff.heur = tmp % 24

            tmp = Math.floor((tmp - diff.heur) / 24)
            diff.jour = tmp

            return diff 
        },
        async getAllListEmploye() {
            this.show_liste = true;
            try {
                const _r = await this.$http.get('api/emp_')
                let _d = _r.data
                if (_d.status) {
                    this.emp_disp = _d.reponse
                }
            } catch (e) {
                alert('Erreur de donnexion')
                console.log(e)
            } 
        },
        
    }

}
</script>

<style>
.my-bg {
    background: rgba(0, 0, 0, 0.603);
}
</style>

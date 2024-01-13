<template>
<div class=" z-50 flex justify-center items-center w-full h-full my-bg">
    <div class=" px-10 py-5 flex flex-col items-center bg-white rounded-lg z-10">
        <span class=" text-2xl font-bold pb-2" v-text="this.$store.state.index_conge==0?'Fiche de congé annuel':this.$store.state.index_conge==1?'Fiche de congé de Matérnité et paternité':'Fiche de congé de permission'"></span>
        <div class="flex flex-col w-72 mt-7">
            <div class="mb-4 cursor-pointer  w-72  " @click="getAllListEmploye()">
                <div v-if="!getConge.im_emp" class=" py-1 border rounded-lg border-gray-400 w-72 px-3">
                    <span class=" text-xs text-indigo-500" v-text="'IM'"> </span>
                    <span class=" py-1 px-3">Séléctionner une employé </span>
                </div>
                <div v-else class=" py-1 border rounded-lg bg-white border-gray-400 w-72 px-3">
                    <span class=" text-xs font-semibold text-indigo-500" v-text="getConge.im_emp"> </span>
                    <span class=" py-1 px-3">{{ getConge.nom}} </span>
                </div>
            </div>
            <select name="" id="" class=" outline-none focus:border-indigo-600 py-1 border rounded-lg border-gray-400" v-model="presence.nbr_jour">
                <option :value="i" v-for="i in nb_conger" :key="i" v-text="i+' jour'"></option>
            </select>
            <div class="mb-4 mt-3 ">
                <div class=" flex flex-col ">
                    <input type="text" v-model="presence.motif_conge" class=" outline-none focus:border-indigo-600 cursor-pointer px-3 border rounded-lg py-1 border-gray-400" placeholder="Motifs du congé">
                </div>
            </div>
        </div>
        <div class=" flex flex-row mt-4 w-full  justify-end">
            <button class=" text-gray-600 font-bold" @click="this.$store.state.show_conge=false"> Annuler </button>
            <button @click="(getConge.im_emp && presence.nbr_jour && presence.motif_conge )?enreg_pres():''" :class="(getConge.im_emp && presence.nbr_jour && presence.motif_conge )?'bg-indigo-500 ':'bg-gray-500 '" class=" text-white rounded-lg ml-4 py-1 items-center px-5 flex">
                <svg class=" w-7" viewBox="0 0 24 24">
                    <path class=" fill-current text-white" d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7z" /></svg>
                Enregister
            </button>
        </div>
    </div>
    <div v-if=" show_liste" class=" absolute z-20 border border-gray-200 bg-white rounded-lg py-2">
        <div v-for="item,i in this.emp_disp" @click="getIt(item)" :key="i" class="  hover:bg-gray-100 cursor-pointer items-center px-6 py-2  flex flex-row">
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
                type_conge: "",
                nbr_jour: '',
            },
            show_liste: false,
            getConge: {},
            nb_conger: 0,emp_disp:{}
        }
    },
    methods: {
        getIt(val) {

            this.$store.state.index_conge == 0 ? this.presence.type_conge = 'annuel' : this.$store.state.index_conge == 1 ? this.presence.type_conge = 'matPat' : this.presence.type_conge = 'permission'
            // console.log(this.presence.type_conge);
            this.show_liste = false
            this.getConge.im_emp = val.emp_im
            this.getConge.nom = val.emp_nom_prenom
            this.presence.im_emp = this.getConge.im_emp
            this.presence.etat_conge = 1
        },
        async enreg_pres() {
            var k = [
                'conge',
                this.presence,
                'api/conge',
            ]
            this.$store.commit('enreg_', k)
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
    },
    mounted() {
        var conge_i = this.$store.state.index_conge
        conge_i == 0 ? this.nb_conger = 30 : conge_i == 1 ? this.nb_conger = 15 : this.nb_conger = 3
        console.log(this.nb_conger);
    }
}
</script>

<style>
.my-bg {
    background: rgba(0, 0, 0, 0.603);
}
</style>

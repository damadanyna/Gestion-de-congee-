<template>
<div class=" p-3 flex flex-col">

    <suppr v-if="this.$store.state.show_emp_supp" class=" fixed  top-0 left-0 "></suppr>
    <historique v-if="this.$store.state.show_emp_hist" class=" fixed  top-0 left-0 "></historique>
    <formulaire v-if="this.$store.state.show_emp_form" class=" fixed top-0 left-0"></formulaire>
    <div v-if="!this.$store.state.show_emp_hist" class="flex flex-col z-10 w-full h-full ">
        <div class=" flex justify-between w-full">
            <div class=" flex">
                <router-link to="/" class=" px-2 group transform hover:scale-125">
                    <svg class=" w-9" viewBox="0 0 24 24">
                        <path class=" group-hover:text-indigo-500 fill-current text-gray-600" d="M15.41 16.58 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" /></svg>
                </router-link>
                <div class=" ml-4 text-2xl">Employé</div>
            </div>
            <div class=" flex flex-row">
                <div class=" flex flex-row border border-gray-400 px-3 py-1 rounded-3xl">
                    <svg viewBox="0 0 24 24" class=" w-7">
                        <path d="m15.5 14 5 5-1.5 1.5-5-5v-.79l-.27-.28A6.471 6.471 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3 6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.57 4.23l.28.27h.79m-6-9.5-.55.03c-.24.52-.61 1.4-.88 2.47h2.86c-.27-1.07-.64-1.95-.88-2.47-.18-.03-.36-.03-.55-.03M13.83 7a4.943 4.943 0 0 0-2.68-2.22c.24.53.55 1.3.78 2.22h1.9M5.17 7h1.9c.23-.92.54-1.69.78-2.22A4.943 4.943 0 0 0 5.17 7M4.5 9.5c0 .5.08 1.03.23 1.5h2.14l-.12-1.5.12-1.5H4.73c-.15.47-.23 1-.23 1.5m9.77 1.5c.15-.47.23-1 .23-1.5s-.08-1.03-.23-1.5h-2.14a9.48 9.48 0 0 1 0 3h2.14m-6.4-3-.12 1.5.12 1.5h3.26a9.48 9.48 0 0 0 0-3H7.87m1.63 6.5c.18 0 .36 0 .53-.03.25-.52.63-1.4.9-2.47H8.07c.27 1.07.65 1.95.9 2.47l.53.03m4.33-2.5h-1.9c-.23.92-.54 1.69-.78 2.22A4.943 4.943 0 0 0 13.83 12m-8.66 0a4.943 4.943 0 0 0 2.68 2.22c-.24-.53-.55-1.3-.78-2.22h-1.9z" /></svg>
                    <input type="text" @input="findChar(this.$store.state.conge_char_find)" v-model=" this.$store.state.employe_char_find" placeholder=" Recherche" class=" bg-transparent outline-none">
                </div>
                <button @click=" get_detail(item,false)" class=" transform hover:scale-110 items-center rounded-2xl px-3 ml-3 flex flex-row bg-indigo-500">
                    <svg class=" w-7" viewBox="0 0 24 24">
                        <path class=" fill-current text-white" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                    <span class=" text-white text-sm">Ajouter</span>
                </button>
                <div @click="this.$store.state.decView=false" class="  px-4 py-1 hover:scale-125 transform group cursor-pointer" title=" Deconnectez ?">
                    <svg class=" w-7" viewBox="0 0 24 24">
                        <path class=" fill-current  " :class="this.$store.state.is_dark?'text-white group-hover:text-red-600':'text-gray-700 group-hover:text-red-600'" d="m16.56 5.44-1.45 1.45A5.969 5.969 0 0 1 18 12a6 6 0 0 1-6 6 6 6 0 0 1-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 5.44A7.961 7.961 0 0 0 4 12a8 8 0 0 0 8 8 8 8 0 0 0 8-8c0-2.72-1.36-5.12-3.44-6.56M13 3h-2v10h2" /></svg>
                </div>
            </div>
        </div>
        <div class=" flex flex-col mt-2">
            <div class=" mt-5">
                <span class=" border-b-4 font-bold border-indigo-500">Liste des employés</span>
            </div>
            <div class=" mt-5">
                <table>
                    <tr class=" border-b border-black  ">
                        <th class=" bg-gray-500 w-32">IM</th>
                        <th class=" w-96">Nom et Prenom</th>
                        <th class="w-32">Né(e) le</th>
                        <th class="W-32">Sexe</th>
                        <th class="W-32">Fonction</th>
                        <th class="W-32">Num Tél</th>
                        <th class="W-32">Adresse</th>
                        <th class=" w-52"></th>
                    </tr>

                    <tr v-for="item,i in this.$store.state.liste_employe" :key="i" class=" px-3 cursor-pointer group  ">
                        <td class=" w-32 text-center group-hover:text-indigo-500" @click=" get_detail(item,true)" v-text="item.emp_im"> </td>
                        <td class=" w-96  text-center group-hover:text-indigo-500" @click=" get_detail(item,true)" v-text="get_str( item.emp_nom_prenom ,25)"> </td>
                        <td class=" w-32 text-center group-hover:text-indigo-500" @click=" get_detail(item,true)" v-text="get_str( setDate(item.date_naiss) ,12)"> </td>
                        <td class=" w-32 text-center group-hover:text-indigo-500" @click=" get_detail(item,true)" v-text="item.sexe"> </td>
                        <td class=" w-32 text-center group-hover:text-indigo-500" @click=" get_detail(item,true)" v-text="item.emp_fonction"> </td>
                        <td class=" w-32 text-center group-hover:text-indigo-500" @click=" get_detail(item,true)" v-text="get_str(  item.emp_tel ,10)"> </td>
                        <td class=" w-32 text-center group-hover:text-indigo-500" @click=" get_detail(item,true)" v-text="get_str(  item.emp_adresse ,12)"> </td>
                        <td class=" opacity-0  py-2 group-hover:opacity-100  ">
                            <div class=" flex flex-row  ">
                                <div class="group cursor-pointer hover:scale-125 transform" @click=" this.$store.commit('set_emp_hits',true)">
                                    <svg class=" w-5 " viewBox="0 0 24 24">
                                        <path class=" group-hover:text-green-500 fill-current text-gray-500" d="M13.5 8H12v5l4.28 2.54.72-1.21-3.5-2.08V8M13 3a9 9 0 0 0-9 9H1l3.96 4.03L9 12H6a7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.896 8.896 0 0 0 13 21a9 9 0 0 0 9-9 9 9 0 0 0-9-9" /></svg>
                                </div>
                                <div class="flex w-8"></div>
                                <div class="group cursor-pointer hover:scale-125 transform" @click="getEmpl(item) ">
                                    <svg class=" w-5 " viewBox="0 0 24 24">
                                        <path class=" group-hover:text-red-500 fill-current text-gray-500" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z" /></svg>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import formulaire from "./employee/employeView.vue"
import historique from "./employee/historiqueView.vue"
import suppr from "./employee/suppView.vue"

import MiddelFunction from '../middel_function/' 
export default {
    components: {
        formulaire,
        historique,
        suppr
    },
    data() {
        return {
            liste_employe: [{

            }, ]
        }
    },
    methods: {
        async getAllList() {
            try {
                const _r = await this.$http.get('api/emps')
                let _d = _r.data
                if (_d.status) {
                    console.log(_d);
                    this.$store.state.liste_employe = _d.reponse
                }
            } catch (e) {
                alert('Erreur de donnexion')
                console.log(e)
            }
        },
        get_str(str,end){
           return MiddelFunction.cutStr(str,end)
        },
        get_detail(val,is_modif ){ 
            this.$store.state.this_user=val
            this.$store.commit('set_emp_form',{modify:is_modif,show:true})
        },
        findChar(val) {
            this.$store.state.conge_char_find = val
        this.$store.commit('find', this.array = {
            url: 'api/emps',
            type_var: 'employe',
            value: this.$store.state.employe_char_find,
            date_: '',
            day_type: 0,
            type: ''
        });
        },
        setDate(val) {
            return new Date(val).toDateString()
        },
        getEmpl(val) {
            this.$store.state.show_emp_supp = true
            this.$store.state.employe = val
            console.log(val);
        }
    },

    mounted() {

        this.$store.commit('find', this.array = {
            url: 'api/emps',
            type_var: 'employe',
            value: this.$store.state.employe_char_find,
            date_: '',
            day_type: 0,
            type: ''
        }); 
    },
    created() {
        // this.getAllList()
    }
}
</script>

<style>

  </style>

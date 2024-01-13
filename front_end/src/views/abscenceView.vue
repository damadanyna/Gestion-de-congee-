<template>
    <div class=" p-3 flex flex-col">
    
        <suppr v-if="this.$store.state.show_pres_supp" class=" fixed  top-0 left-0 "></suppr>
        <historique v-if="this.$store.state.show_pres_hist" class=" fixed  top-0 left-0 "></historique> 
        <div v-if="!this.$store.state.show_pres_hist" class="flex flex-col z-10 w-full h-full ">
            <div class=" flex justify-between w-full">
                <div class=" flex">
                    <router-link to="/" class=" px-2 group transform hover:scale-125">
                        <svg class=" w-9" viewBox="0 0 24 24">
                            <path class=" group-hover:text-indigo-500 fill-current text-gray-600" d="M15.41 16.58 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" /></svg>
                    </router-link>
                    <div :class="this.$store.state.is_dark?'text-gray-50':'text-black'" class=" ml-4 text-2xl">Abscence</div>
                </div>
                <div class=" flex flex-row">
                    <div class=" flex flex-row border border-gray-400 px-3 py-1 rounded-3xl">
                        <svg viewBox="0 0 24 24" class=" w-7">
                            <path d="m15.5 14 5 5-1.5 1.5-5-5v-.79l-.27-.28A6.471 6.471 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3 6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.57 4.23l.28.27h.79m-6-9.5-.55.03c-.24.52-.61 1.4-.88 2.47h2.86c-.27-1.07-.64-1.95-.88-2.47-.18-.03-.36-.03-.55-.03M13.83 7a4.943 4.943 0 0 0-2.68-2.22c.24.53.55 1.3.78 2.22h1.9M5.17 7h1.9c.23-.92.54-1.69.78-2.22A4.943 4.943 0 0 0 5.17 7M4.5 9.5c0 .5.08 1.03.23 1.5h2.14l-.12-1.5.12-1.5H4.73c-.15.47-.23 1-.23 1.5m9.77 1.5c.15-.47.23-1 .23-1.5s-.08-1.03-.23-1.5h-2.14a9.48 9.48 0 0 1 0 3h2.14m-6.4-3-.12 1.5.12 1.5h3.26a9.48 9.48 0 0 0 0-3H7.87m1.63 6.5c.18 0 .36 0 .53-.03.25-.52.63-1.4.9-2.47H8.07c.27 1.07.65 1.95.9 2.47l.53.03m4.33-2.5h-1.9c-.23.92-.54 1.69-.78 2.22A4.943 4.943 0 0 0 13.83 12m-8.66 0a4.943 4.943 0 0 0 2.68 2.22c-.24-.53-.55-1.3-.78-2.22h-1.9z" /></svg>
                        <input v-model="search" @input="findChar(search)" type="text" placeholder=" Recherche" class=" bg-transparent outline-none">
                    </div>
                    <button @click=" this.$store.commit('set_pres_form',true)" class=" transform hover:scale-110 items-center rounded-2xl px-3 ml-3 flex flex-row bg-indigo-500">
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
            <div class=" flex flex-col mt-2 h-full w-full ">
                <div class="flex flex-row mt-5 ">
                    <div class="border-b-4 border-indigo-500 flex px-5">
                        <div class="  ">
                            <span :class="this.$store.state.is_dark?'text-gray-400':'text-gray-800'" class=" font-bold ">Liste des Absence</span>
                        </div>
                        <div class="   flex flex-row ">
                            <span class="border border-indigo-500 mx-3  "></span>
                            <div class=" ">
                                <span class=" transform hover:scale-110 border-transparent text-indigo-500 cursor-pointer" @click="showDate" v-text="date_"> </span>
                                <div v-if="show_date" class="flex-col -ml-4 flex absolute py-2 border border-indigo-500 rounded-lg " :class="this.$store.state.is_dark?'bg-gray-400':'bg-gray-300'">
                                    <span v-for=" item,i in this.$store.state.liste_date" :key="i" class="  px-6 hover:bg-indigo-400 py-1 hover:text-white cursor-pointer" v-text="get_Date(item.pres_date_enreg)" @click="selectDate(item.pres_date_enreg)"></span>
                                </div>
                            </div>
                        </div>
                        <div class="   flex flex-row ">
                            <span class="border border-indigo-500 mx-3  "></span>
                            <div class=" ">
                                <span class=" transform  hover:scale-110 border-transparent text-indigo-500 cursor-pointer" @click="setType" v-text="day_type"> </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" mt-5 h-full w-full  ">
                    <div class="flex w-full h-full ">
                        <div v-if="!this.$store.state.liste_abs.length>0" class="flex flex-col w-full h-full items-center justify-center">
                            <svg class=" w-14" viewBox="0 0 24 24">
                                <path d="M3 5v14h17V5H3m4 2v2H5V7h2m-2 6v-2h2v2H5m0 2h2v2H5v-2m13 2H9v-2h9v2m0-4H9v-2h9v2m0-4H9V7h9v2z" /></svg>
                            <span class=" text-xl">La liste est vide</span>
                            <div @click=" this.$store.commit('set_pres_form',true)" class=" cursor-pointer  px-4 flex bg-indigo-500 rounded flex-row items-center">
                                <svg class=" w-8" viewBox="0 0 24 24">
                                    <path class=" fill-current text-white" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                                <span class="  text-white">ajouter</span>
                            </div>
                        </div>
                        <div v-else class="flex h-full w-full">
                            <div class=" grid grid-cols-2  overflow-auto sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full">
                                <div v-for="item,i in this.$store.state.liste_abs" :key="i" class=" w-56 h-44 flex rounded-lg my-2  px-3 flex-col border border-gray-500 ">
                                    <span class=" absolute ml-36 text-xs" :class="this.$store.state.is_dark?'text-gray-400':'text-gray-700'" v-text="item.pres_heure_enreg"></span>
                                    <div class="flex w-full justify-center">
                                        <svg class=" w-32" viewBox="0 0 24 24">
                                            <path class=" fill-current text-gray-500 " d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" /></svg>
                                    </div>
                                    <div class="flex items-center">
                                        <span v-text="initialOf(item.emp_nom_prenom)" class=" text-white font-bold uppercase px-2 bg-indigo-500 rounded-xl"></span>
                                        <div class=" flex flex-col ml-1">
                                            <span class=" text-xs text-indigo-500 font-bold" v-text="item.im_emp"></span>
                                            <span :class="this.$store.state.is_dark?'text-gray-200':'text-gray-700'" class="   text-sm  font-bold" v-text="item.emp_nom_prenom"></span>
                                        </div>
                                    </div>
                                    <!-- <span class=" text-2xl text-gray-700" v-text="item.emp_nom_prenom"></span> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import historique from "./employee/historiqueView.vue"
    import suppr from "./employee/suppView.vue" 
    export default {
        components: { 
            historique,
            suppr,
        },
        data() {
            return {
                liste_abs: [{
    
                }, ],
                search: '',
                array: {},
                show_date: false,
                date_: new Date().toDateString(),
                day_type: 'Matin',
                index: 0,
            }
        },
        methods: {
            setDate(val) {
                return new Date(val).toDateString()
            },
            getEmpl(val) {
                this.$store.state.show_pres_supp = true
                this.$store.state.employe = val
            },
            findChar(val) {
                this.$store.commit('find', this.array = {
                url: 'api/abs',
                type_var: 'abs',
                    value: val,
                    date_: this.date_,
                    day_type: this.index
                });
            },
            initialOf(val) {
                return val.substring(0, 1)
            },
            showDate() {
                if (this.show_date == true) {
                    this.show_date = false
                } else {
                    this.show_date = true
                }
            },
            get_Date(val) {
                return new Date(val).toDateString()
            },
            selectDate(val) {
                this.date_ = val
                this.$store.commit('find', this.array = {
                url: 'api/abs',
                type_var: 'abs',
                    value: '',
                    date_: this.date_,
                    day_type: this.index
                });
                this.show_date = false
            },
            setType() {
                if (this.index == 0) {
                    this.day_type = 'Apres-Midi'
                    this.index = 1
                    this.$store.commit('find', this.array = {
                url: 'api/abs',
                type_var: 'abs',
                        value: '',
                        date_: this.date_,
                        day_type: this.index
                    });
                } else {
                    this.day_type = 'Matin'
                    this.index = 0
                    this.$store.commit('find', this.array = {
                url: 'api/abs',
                type_var: 'abs',
                        value: '',
                        date_: this.date_,
                        day_type: this.index
                    });
    
                }
            }
    
        },
        mounted() {
            console.log(this.$store.state.liste_abs);
        },
        beforeMount(){
            this.$store.commit('find', this.array = {
                url: 'api/abs',
                type_var: 'abs',
                value: '',
                date_: this.date_,
                day_type: 0
            }); 
            // this.$store.commit( 'getAllList',this.array={url:'api/presence',type_var:'presence'}) ; 
            this.$store.commit('getDays', 'api/presence_days');

        },
        created() {}
    }
    </script>
    
    <style>
    
      </style>
    
<template>
<div class=" p-3 flex h-full w-full flex-col">
    <menuView />
    <div v-if="!this.$store.state.liste_conge_annuel.length>0" class="flex h-full w-full">
        <div class="flex flex-col w-full h-full items-center justify-center">
            <svg class=" w-14" viewBox="0 0 24 24">
                <path d="M3 5v14h17V5H3m4 2v2H5V7h2m-2 6v-2h2v2H5m0 2h2v2H5v-2m13 2H9v-2h9v2m0-4H9v-2h9v2m0-4H9V7h9v2z" /></svg>
            <span class=" text-xl">La liste est vide</span>
            <div @click=" this.$store.state.show_conge=true" class=" cursor-pointer  px-4 flex bg-indigo-500 rounded flex-row items-center">
                <svg class=" w-8" viewBox="0 0 24 24">
                    <path class=" fill-current text-white" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                <span class="  text-white">ajouter</span>
            </div>
        </div>
    </div>
    <div v-else class="flex h-full w-full  ">
        <div class=" grid grid-cols-2 overflow-x-hidden overflow-y-auto sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full">
            <div v-for="item,i in this.$store.state.liste_conge_annuel" :key="i" class=" w-56 h-44 flex rounded-lg my-2  px-3 flex-col border border-gray-500 ">
                <!-- <span class=" absolute ml-36 text-xs"  :class="this.$store.state.is_dark?'text-gray-400':'text-gray-700'" v-text="item.pres_heure_enreg"></span> -->
                <div class="flex w-full justify-center ml-20">
                    <svg class=" w-12" viewBox="0 0 24 24">
                        <path class=" fill-current text-gray-500 " d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" /></svg>
                </div>
                <div class="flex relative  -mt-10  flex-col">
                    <div class="flex items-center">
                        <span v-text="initialOf(item.emp_nom_prenom)" class=" text-2xl text-white font-bold uppercase px-2 bg-indigo-500 rounded-full"></span>
                        <div class=" flex flex-col ml-1">
                            <span class=" text-xs text-indigo-500 font-bold" v-text="item.im_emp"></span>
                            <span :class="this.$store.state.is_dark?'text-gray-200':'text-gray-700'" class="   text-sm  font-bold" v-text="item.emp_nom_prenom"></span>
                        </div>
                    </div>
                    <div class=" flex flex-col ml-1 mt-7">
                        <span class=" text-xs text-white font-bold" v-text="setDate(item.conge_date_enreg)"></span>
                        <span class=" text-xs text-indigo-500 font-bold" v-text="endDate(item.conge_date_enreg,item.nbr_jour)"></span>
                        <span class=" text-xs text-gray-500 font-bold" v-text="item.motif_conge"></span>
                    </div>
                    <div class=" flex flex-col ml-1 mt-3">
                        <span 
                        :class="
                        restDate(endDate(item.conge_date_enreg,item.nbr_jour))<=3?
                        ' bg-red-500'
                        :restDate(endDate(item.conge_date_enreg,item.nbr_jour))<=6?
                        ' bg-orange-500'
                        :restDate(endDate(item.conge_date_enreg,item.nbr_jour))<=10?
                        ' bg-yellow-500':'bg-indigo-500'"
                         class="  px-4 rounded-r-md text-xs text-white font-bold" v-text=" item.nbr_jour +'j , Reste: '+restDate(endDate(item.conge_date_enreg,item.nbr_jour))+'j'"></span>
                    </div>
                </div>
                <!-- <span class=" text-2xl text-gray-700" v-text="item.emp_nom_prenom"></span> -->
            </div>

            <div @click=" this.$store.state.show_conge=true" class=" cursor-pointer w-56 h-44 flex rounded-lg my-2 justify-center items-center  px-7 flex-col border border-gray-500 ">
                <svg class=" w-32" viewBox="0 0 24 24">
                    <path class=" fill-current text-gray-500 " d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                <span class=" text-xs text-indigo-500 font-bold" v-text="'Ajouter'"></span>
                <!-- <span class=" text-2xl text-gray-700" v-text="item.emp_nom_prenom"></span> -->
            </div>
        </div>
    </div>
</div>
</template>

  
  
<script>
 import menuView from '../../components/congeeView.vue'
 export default {
     components: {
         menuView,
     },
     data() {
         return {
             boites: [],

         }
     },
     methods: {
         setDate(val) {
             return new Date(val).toDateString()
         },
         endDate(init, end) {
             Date.prototype.addDays = function (days) {
                 this.setDate(this.getDate() + parseInt(days))
                 return this
             }
             return new Date(init).addDays(end).toDateString()
         },
         restDate(end) {
             return (this.dateDiff(new Date(end), new Date()).jour)+1
         },
         getEmpl(val) {
             this.$store.state.show_pres_supp = true
             this.$store.state.employe = val

             this.$store.commit('find', this.array = {
                 url: 'api/congee',
                 type_var: 'conge',
                 value: this.$store.state.conge_char_find,
                 date_: '',
                 day_type: 0,
                 type: 'annuel'
             });
             //  console.log(val);
         },
         initialOf(val) {
             return val.substring(0, 1)
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

         }
     },
     mounted() {
         this.$store.commit('find', this.array = {
             url: 'api/congee',
             type_var: 'conge',
             value: this.$store.state.conge_char_find,
             date_: '',
             day_type: 0,
             type: 'annuel'
         });

     },
     created() {}
 }
</script>
  
  
<style>
  
  </style>

<template>
    <div class=" p-3 flex flex-col">   
      <formulaire v-if="this.$store.state.show_conge"  class=" fixed top-0 left-0"></formulaire>
      <div v-if="!this.$store.state.show_pres_hist" class="flex flex-col z-10 w-full h-full ">
        <div class=" flex justify-between w-full">
          <div class=" flex">
            <router-link to="/" class=" px-2 group transform hover:scale-125">
              <svg class=" w-9" viewBox="0 0 24 24"><path class=" group-hover:text-indigo-500 fill-current text-gray-600" d="M15.41 16.58 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" /></svg>
            </router-link>
            <div class=" ml-4 text-2xl">Conger</div>
          </div>
          <div class=" flex flex-row">
            <div class=" flex flex-row border border-gray-400 px-3 py-1 rounded-3xl">
              <svg viewBox="0 0 24 24" class=" w-7"><path d="m15.5 14 5 5-1.5 1.5-5-5v-.79l-.27-.28A6.471 6.471 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3 6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.57 4.23l.28.27h.79m-6-9.5-.55.03c-.24.52-.61 1.4-.88 2.47h2.86c-.27-1.07-.64-1.95-.88-2.47-.18-.03-.36-.03-.55-.03M13.83 7a4.943 4.943 0 0 0-2.68-2.22c.24.53.55 1.3.78 2.22h1.9M5.17 7h1.9c.23-.92.54-1.69.78-2.22A4.943 4.943 0 0 0 5.17 7M4.5 9.5c0 .5.08 1.03.23 1.5h2.14l-.12-1.5.12-1.5H4.73c-.15.47-.23 1-.23 1.5m9.77 1.5c.15-.47.23-1 .23-1.5s-.08-1.03-.23-1.5h-2.14a9.48 9.48 0 0 1 0 3h2.14m-6.4-3-.12 1.5.12 1.5h3.26a9.48 9.48 0 0 0 0-3H7.87m1.63 6.5c.18 0 .36 0 .53-.03.25-.52.63-1.4.9-2.47H8.07c.27 1.07.65 1.95.9 2.47l.53.03m4.33-2.5h-1.9c-.23.92-.54 1.69-.78 2.22A4.943 4.943 0 0 0 13.83 12m-8.66 0a4.943 4.943 0 0 0 2.68 2.22c-.24-.53-.55-1.3-.78-2.22h-1.9z" /></svg>
              <input @input="findChar(this.$store.state.conge_char_find)" type="text" v-model="this.$store.state.conge_char_find" placeholder=" Recherche" class=" bg-transparent outline-none"> 
            </div> 
            <div  @click="this.$store.state.decView=false" class="  px-4 py-1 hover:scale-125 transform group cursor-pointer" title=" Deconnectez ?" > 
              <svg class=" w-7" viewBox="0 0 24 24"><path class=" fill-current  " :class="this.$store.state.is_dark?'text-white group-hover:text-red-600':'text-gray-700 group-hover:text-red-600'" d="m16.56 5.44-1.45 1.45A5.969 5.969 0 0 1 18 12a6 6 0 0 1-6 6 6 6 0 0 1-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 5.44A7.961 7.961 0 0 0 4 12a8 8 0 0 0 8 8 8 8 0 0 0 8-8c0-2.72-1.36-5.12-3.44-6.56M13 3h-2v10h2" /></svg>
            </div>
          </div>
        </div>
        <div class=" flex  flex-row mt-2 h-full w-full ">
           <router-link @click="this.$store.state.index_conge=item.index" v-for="item,i in boites" :key="i" :to="item.url" class=" flex mx-2">
            <span   v-text="  item.title" class="px-4" ></span>
           </router-link>  
        </div>
      </div>
    </div>
  </template>  
  <script>  
  import formulaire from '../views/conge/formulaireView.vue'
  export default {
    components:{ 
      formulaire
    },
    data(){
      return{  
        array:{},  
        boites:[
          {
            title:"Annuel", 
            url:"/annuel",
            index:0
          },
          {
            title:"Evenementiels",
            url:"/mat",
            index:1
          },
          {
            title:"Récupération",
            url:"/permission",
            index:2
          }
        ],
        label:'annuel'
      }
    },
    methods:{   
     setDate(val){ 
       return new Date(val).toDateString()
     },
      findChar(val){ 
       this.$store.state.index_conge==0?this.label='annuel':this.$store.state.index_conge==1?this.label='matPat':this.$store.state.index_conge==2?this.label='permission':''
        this.$store.state.conge_char_find=val 
        this.$store.commit('find',this.array={url:'api/congee',type_var:'conge',value:this.$store.state.conge_char_find,date_:'',day_type:0,type:this.label}) ;   
      }, 
     },
    mounted(){
    }, 
  }
  </script>
  
  <style  > 
 
  .router-link-active {
    color: #6366f1;
    border-radius: 20px;
    background: #6365f15d;
    border:solid 1px #6366f1;
  }
  </style>
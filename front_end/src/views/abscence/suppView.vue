<template>
  <div class=" z-50 fixed top-0 left-0 flex justify-center items-center w-full h-full my_bg" v-if="this.$store.state.show_emp_supp"  >
      <div class="flex flex-col bg-white px-8 py-2 rounded-xl">
          <div class="flex flex-row items-center" >
              <svg class=" w-12" viewBox="0 0 24 24"><path class=" fill-current text-red-500" d="M13 14h-2V9h2m0 9h-2v-2h2M1 21h22L12 2 1 21z" /></svg>
             <span class=" text-2xl font-bold text-gray-500">Suppression</span>
          </div> 
          <div class=" flex">
            <span class=" text-gray-700">Supprimer </span>
            <span class=" ml-1 font-bold " v-text="this.$store.state.employe.emp_nom_prenom"></span>
            <span> ?</span>
          </div>
          <div class="flex flex-row justify-end mt-3">
              <button @click="this.$store.state.show_abs_supp=false" class=" bg-indigo-500 px-3 rounded-lg text-white">Non</button>
              <button @click="suppression()" class=" ml-3 hover:scale-125 transform cursor-pointer hover:text-red-500">Oui</button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        
        async suppression(){ 
            try {
                const _r=  await this.$http.delete('api/emp/'+this.$store.state.employe.emp_im)  
                if(_r.status){
                    this.getAllList()
                    this.$store.state.show_emp_supp=false
                }
            } catch (e) {
                alert('Erreur de connexion'+e)
            }
        },
     async getAllList(){
        try {
                const _r = await this.$http.get('api/emp') 
                let _d = _r.data 
                if(_d.status ){ 
                  this.$store.state.liste_employe=_d.reponse 
                  console.log(this.$store.state.liste_employe);
                } 
            } catch (e) {
                alert('Erreur de donnexion')
                console.log(e)
            }
     }
    }
}
</script>

<style>

</style>
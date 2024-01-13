<template>
  <div class=" z-50 fixed top-0 left-0 flex justify-center items-center w-full h-full my_bg" v-if="!this.$store.state.decView"  >
      <div class="flex flex-col bg-white px-8 py-2 rounded-xl">
          <div class="flex flex-row items-center" >
            <svg class=" w-12" viewBox="0 0 24 24"><path class=" fill-current text-red-500" d="m16.56 5.44-1.45 1.45A5.969 5.969 0 0 1 18 12a6 6 0 0 1-6 6 6 6 0 0 1-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 5.44A7.961 7.961 0 0 0 4 12a8 8 0 0 0 8 8 8 8 0 0 0 8-8c0-2.72-1.36-5.12-3.44-6.56M13 3h-2v10h2" /></svg>
            <span class=" text-2xl font-bold">Deconnection</span>
          </div> 
          <span>Déconnecter votre compte?</span>
          <div class="flex flex-row justify-end mt-3">
              <button @click="this.$store.state.decView=true" class=" bg-indigo-500 px-3 rounded-lg text-white">Non</button>
              <button @click="deconnection()" class=" ml-3 hover:scale-125 transform cursor-pointer hover:text-red-500">Oui</button>
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
        
        async deconnection(){
            const util={
                util_email:this.$store.state.data.user.util_email,
                util_pass:this.$store.state.data.user.util_pass
            }
            try {
                  await this.$http.post('api/dec_user', util) 
                 window.location='/'
            } catch (e) {
                alert('Erreur de connexion'+e)
            }
        },
    }
}
</script>

<style>
.my_bg{
    background: rgba(0, 0, 0, 0.719);
}

</style>
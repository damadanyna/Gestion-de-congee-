 <template>
  <div class=" z-50 flex justify-center items-center w-full h-full my-bg">
    <div class=" px-10 py-5 flex flex-col bg-white rounded-lg">
      <span class=" text-2xl font-bold pb-2">Fiche absccence</span>
      <div class="flex flex-col">
        <input v-model="employe.emp_im" type="number" class=" border border-gray-300  my-2 px-3 w-96 py-1 rounded-lg" placeholder="IM ">
        <input v-model="employe.emp_nom_prenom" type="text" class=" border border-gray-300 my-2 px-3 w-96 py-1  rounded-lg" placeholder="Nom et prenom ">
        <input v-model="employe.date_naiss" type="date" class=" border border-gray-300 my-2 px-3 w-96 py-1  rounded-lg" placeholder="Date de naissance">
        
        <select name=""  class=" border border-gray-300 my-2 px-3 w-96 py-1  rounded-lg"  id="" v-model="employe.sexe">
              <option value="">Sexe</option>
              <option value="0">Matin</option>
              <option value="1">Apres-Midi</option>
            </select> 
        <input v-model="employe.emp_fonction" type="text" class=" border border-gray-300 my-2 px-3 w-96 py-1  rounded-lg" placeholder="Fonction">
        <input v-model="employe.emp_tel" type="numer" class=" border border-gray-300 my-2 px-3 w-96 py-1  rounded-lg" placeholder="Numero télépone ">
        <input v-model="employe.emp_adresse" type="text" class=" border border-gray-300 my-2 px-3 w-96 py-1  rounded-lg" placeholder="Adresse ">
      </div>
      <div class=" flex flex-row mt-4 w-full  justify-end">  
        <button class=" text-gray-600 font-bold" @click=" this.$store.commit('set_emp_form',false)"> Annuler </button>
        <button @click="(employe.emp_adresse && employe.emp_tel && employe.emp_im && employe.emp_nom_prenom && employe.date_naiss && employe.emp_fonction && employe.sexe )?enreg_emp():''" :class="(employe.emp_adresse && employe.emp_tel && employe.emp_im && employe.emp_nom_prenom && employe.date_naiss && employe.emp_fonction && employe.sexe )?'bg-indigo-500 ':'bg-gray-500 '"  class=" text-white rounded-lg ml-4 py-1 items-center px-5 flex">
           <svg class=" w-7" viewBox="0 0 24 24"><path class=" fill-current text-white" d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7z" /></svg>
           Enregister
          </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{ 
        employe:{ 
            emp_im:'',
            emp_nom_prenom:'',
            date_naiss:'',
            sexe:'',
            emp_fonction:'',
            emp_tel:'',
            emp_adresse:'',
            emp_date_enreg:'',
        },
    }
  },
  methods:{
    async enreg_emp(){ 
            try {
                const _r = await this.$http.post('api/emp',this.employe)
                let _d = _r.data
                if(_d.status){
                  this.getAllList()
                    console.log(_d.message )
                     this.$store.commit('set_emp_form',false)
                }else{
                    console.log(_d.message )
                }
            } catch (e) {
                console.log(e)
            }
    },
     async getAllList(){
        try {
                const _r = await this.$http.get('api/emp') 
                let _d = _r.data 
                if(_d.status ){ 
                  this.$store.state.liste_employe=_d.reponse  
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

.my-bg{
    background: rgba(0, 0, 0, 0.603);
}
</style>
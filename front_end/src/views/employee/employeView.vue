<template>
<div class="z-50 flex justify-center items-center w-full h-full my-bg">
    <div class="px-10 py-5 flex flex-col bg-white rounded-lg">
        <span class="text-2xl font-bold pb-2">Fiche employé</span>
        <div class="flex flex-col">
            <input v-if="!this.$store.state.modify " v-model="employe.emp_im" type="number" class="border border-gray-300 my-2 px-3 w-96 py-1 rounded-lg" placeholder="IM " />
            <input v-model="employe.emp_nom_prenom" type="text" class="border border-gray-300 my-2 px-3 w-96 py-1 rounded-lg" placeholder="Nom et prenom " />
            <input v-model="employe.date_naiss" type="date" class="border border-gray-300 my-2 px-3 w-96 py-1 rounded-lg" placeholder="Date de naissance" />

            <select name="" class="border border-gray-300 my-2 px-3 w-96 py-1 rounded-lg" id="" v-model="employe.sexe">
                <option value="">Sexe</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
            </select>
            <input v-model="employe.emp_fonction" type="text" class="border border-gray-300 my-2 px-3 w-96 py-1 rounded-lg" placeholder="Fonction" />
            <input v-model="employe.emp_tel" type="number" class="border border-gray-300 my-2 px-3 w-96 py-1 rounded-lg" placeholder="Numero télépone " />
            <input v-model="employe.emp_adresse" type="text" class="border border-gray-300 my-2 px-3 w-96 py-1 rounded-lg" placeholder="Adresse " />
        </div>
        <div class="flex flex-row mt-4 w-full justify-end">
            <button class="text-gray-600 font-bold" v-text="this.$store.state.modify ? 'Fermer' : 'Annuler'" @click="this.$store.commit('set_emp_form', false)"></button>
            <button @click="
            employe.emp_adresse &&
            employe.emp_tel &&
            employe.emp_im &&
            employe.emp_nom_prenom &&
            employe.date_naiss &&
            employe.emp_fonction &&
            employe.sexe
              ? enreg_emp()
              : ''
          " :class="
            employe.emp_adresse &&
            employe.emp_tel &&
            employe.emp_im &&
            employe.emp_nom_prenom &&
            employe.date_naiss &&
            employe.emp_fonction &&
            employe.sexe
              ? 'bg-indigo-500 '
              : 'bg-gray-500 '
          " class="bg-indigo-500 text-white rounded-lg ml-4 py-1 items-center px-5 flex">
                <svg v-if="!this.$store.state.modify" class="w-7" viewBox="0 0 24 24">
                    <path class="fill-current text-white" d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7z" />
                </svg>
                <svg v-else viewBox="0 0 24 24" class="w-7">
                    <path class="fill-current text-white" d="M20.71 7.04c-.34.34-.67.67-.68 1-.03.32.31.65.63.96.48.5.95.95.93 1.44-.02.49-.53 1-1.04 1.5l-4.13 4.14L15 14.66l4.25-4.24-.96-.96-1.42 1.41-3.75-3.75 3.84-3.83c.39-.39 1.04-.39 1.41 0l2.34 2.34c.39.37.39 1.02 0 1.41M3 17.25l9.56-9.57 3.75 3.75L6.75 21H3v-3.75z" />
                </svg>
                <span v-text="this.$store.state.modify ? 'Modifier' : 'Enregister'"></span>
            </button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            employe: {
                emp_im: "",
                emp_nom_prenom: "",
                date_naiss: "",
                sexe: "",
                emp_fonction: "",
                emp_tel: "",
                emp_adresse: "",
                emp_date_enreg: "",
            },
        };
    },
    methods: {
        async enreg_emp() {
            if (this.$store.state.modify) {
                this.update_emp();
            } else {
                this.save_emp();
            }
        },
        async save_emp() {
            try {
                const _r = await this.$http.post("api/emp", this.employe);
                let _d = _r.data;
                if (_d.status) {
                    this.getAllList();
                    console.log(_d.message);
                    this.$store.commit("set_emp_form", false);
                } else {
                    console.log(_d.message);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async update_emp() {
            try {
                const _r = await this.$http.post("api/up_emp", this.employe);
                let _d = _r.data;
                if (_d.status) {
                    this.getAllList();
                    console.log(_d.message);
                    this.$store.commit("set_emp_form", false);
                } else {
                    console.log(_d.message);
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getAllList() {
            try {
                const _r = await this.$http.get("api/emp");
                let _d = _r.data;
                if (_d.status) {
                    this.$store.state.liste_employe = _d.reponse;
                }
            } catch (e) {
                alert("Erreur de donnexion");
                console.log(e);
            }
        },
    },
    mounted() {
        if (this.$store.state.modify) {
           // this.employe.date_naiss = this.$store.state.this_user.date_naiss;
            this.employe = this.$store.state.this_user;
            console.log(this.employe);
        } else {
            this.employe = {};
        }
    },
};
</script>

<style>
.my-bg {
    background: rgba(0, 0, 0, 0.603);
}
</style>

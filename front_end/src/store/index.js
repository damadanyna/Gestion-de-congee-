import { createStore } from 'vuex'

import axios from 'axios'
export default createStore({
    state: {
        data: {
            user: {
                nom: 'admin',
                util_status: 1,
                status: true
            }
        },
        all_conge: {},

        liste_date: {},
        this_user: {},
        total_emp: 0,
        nb_pres: 0,
        en_conge: 0,
        nb_male: 0,
        modify: false,

        liste_employe: {},
        liste_presence: {},
        liste_abs: {},
        liste_conge_annuel: {},
        employe_char_find: '',

        employe: {},
        show_conge: false,
        index_conge: 0,
        conge_char_find: '',

        show_emp_form: false,
        show_emp_hist: false,
        show_emp_supp: false,

        show_pres_form: false,
        show_pres_hist: false,
        show_pres_supp: false,

        params: null,
        is_dark: true,
        decView: true,
        message: ""
    },
    getters: {},
    mutations: {
        set_emp_form(state, val) {
            this.state.modify = val.modify
            this.state.show_emp_form = val.show
        },
        set_pres_form(state, val) {
            this.state.show_pres_form = val
        },
        set_emp_hits(state, val) {
            this.state.show_emp_hist = val
        },
        async enreg_(state, val) {
            Date.prototype.addDays = function(days) {
                    this.setDate(this.getDate() + parseInt(days))
                    return this
                }
                //console.log(new Date().addDays(20))  
                // console.log(val[2]);
            try {
                const _r = await axios.post(val[2], val[1])
                let _d = _r.data
                if (_d.status) {
                    try {
                        console.log(val[2]);
                        val[2] == 'api/conge' ? val[2] = 'api/congee' : ''
                        const _r = await axios.post(val[2], { type: val[1].type_conge })
                        let _d = _r.data
                        if (_d.status) {
                            state.liste_conge_annuel = _d.reponse
                        }
                    } catch (e) {
                        alert('Erreur de donnexion')
                        console.log(e)
                    }
                    console.log(_d)
                    this.state.show_conge = false
                } else {
                    console.log(_d.message)
                }
            } catch (e) {
                console.log(e)
            }

        },
        async getAllList(state, array) {
            try {
                const _r = await axios.get(array.url)
                let _d = _r.data
                if (_d.status) {
                    array.type_var == 'presence' ? this.state.liste_presence = _d.reponse : array.type_var == 'all_conge' ? this.state.all_conge = _d.reponse : ''

                }
            } catch (e) {
                alert('Erreur de donnexion')
                console.log(e)
            }
        },
        async getDays(state, array) {
            try {
                const _r = await axios.get(array)
                let _d = _r.data
                if (_d.status) {
                    this.state.liste_date = _d.reponse
                    console.log(this.state.liste_date);
                }
            } catch (e) {
                alert('Erreur de donnexion')
                console.log(e)
            }
        },
        async find(state, array) {
            var type
            array.type ? type = array.type : type = ''
            try {
                const _r = await axios.post(array.url, { find: array.value, date_: array.date_, day_type: array.day_type, type_: type })
                let _d = _r.data
                if (_d.status) {
                    array.type_var == 'presence' ? this.state.liste_presence = _d.reponse : array.type_var == 'conge' ? this.state.liste_conge_annuel = _d.reponse : array.type_var == 'employe' ? this.state.liste_employe = _d.reponse : array.type_var == 'abs' ? this.state.liste_abs = _d.reponse : ''

                }
            } catch (e) {
                alert('Erreur de donnexion')
                console.log(e)
            }
        },
        async update(state, array) {
            try {
                const _r = await axios.post(array.url, { id_conge: array.id_conge, etat_conge: array.etat_conge })
                let _d = _r.data
                if (_d.status) {
                    console.log(_d);
                }
            } catch (e) {
                alert('Erreur de donnexion')
                console.log(e)
            }
        },
        async getDash(state, array) {
            try {
                const _r = await axios.post(array.url, { date_: array.date_ })
                let _d = _r.data
                if (_d.status) {
                    console.log(_d);

                    this.state.nb_pres = _d.pres_.length
                    this.state.total_emp = _d.nb_total_employe
                    this.state.en_conge = _d.en_conge.length
                    this.state.nb_male = _d.nb_male.length
                        //this.state.en_conge=_d.
                }
            } catch (e) {
                alert('Erreur de donnexion')
                console.log(e)
            }
        },
        async getAllListOn(state, array) {
            try {
                const _r = await axios.post(array.url, { type: array.type })
                let _d = _r.data
                if (_d.status) {
                    state.liste_conge_annuel = _d.reponse
                }
            } catch (e) {
                alert('Erreur de donnexion')
                console.log(e)
            }
        },
    },
    actions: {},
    modules: {},
})
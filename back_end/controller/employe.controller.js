let utils = require("../utils/utils");
let D = require("../models/data");

class Employe {
    static async register(req, res) {
        let _d = req.body;
        let employe_data = {
            emp_im: { front_name: "emp_im", fac: true },
            emp_nom_prenom: { front_name: "emp_nom_prenom", fac: false },
            date_naiss: { front_name: "date_naiss", fac: false },
            sexe: { front_name: "sexe", fac: false },
            emp_fonction: { front_name: "emp_fonction", fac: false },
            emp_tel: { front_name: "emp_tel", fac: false },
            emp_adresse: { front_name: "emp_adresse", fac: false },
            emp_date_enreg: {
                front_name: "emp_date_enreg",
                fac: true,
                format: (a) => new Date(),
            },
        };

        //Vérification du employe
        const _pd_keys = Object.keys(employe_data);
        let _tmp = {};
        let _list_error = [];
        try {
            _pd_keys.forEach((v, i) => {
                _tmp = employe_data[v];
                if (!_tmp.fac && !_d[_tmp.front_name]) {
                    _list_error.push({ code: _tmp.front_name });
                }
            });

            if (_list_error.length > 0) {
                return res.send({
                    status: false,
                    message: "Certains champs sont vide ",
                    data: _list_error,
                });
            }

            let _data = {};
            _pd_keys.forEach((v, i) => {
                _tmp = employe_data[v];

                if (_tmp.format != undefined) {
                    _d[_tmp.front_name] = _tmp.format(_d[_tmp.front_name]);
                }

                _data[v] = _d[_tmp.front_name];
            });

            // let user = (await D.exec_params('select * from employe where emp_im = ?', employe_data.emp_im[emp_im]))
            // console.log(user);
            await D.set('employe', _data)
                //Ici tous les fonctions sur l'enregistrement d'un employe
            return res.send({ status: true, message: "user bien enregistrer." });
        } catch (e) {
            console.error(e);
            return res.send({
                status: false,
                message: "Erreur dans la base de donnée",
            });
        }
    }
    static async update(req, res) {
        let _d = req.body;
        let employe_data = {
            emp_im: { front_name: "emp_im", fac: true },
            emp_nom_prenom: { front_name: "emp_nom_prenom", fac: false },
            date_naiss: { front_name: "date_naiss", fac: false },
            sexe: { front_name: "sexe", fac: false },
            emp_fonction: { front_name: "emp_fonction", fac: false },
            emp_tel: { front_name: "emp_tel", fac: false },
            emp_adresse: { front_name: "emp_adresse", fac: false },
            emp_date_enreg: {
                front_name: "emp_date_enreg",
                fac: true,
                format: (a) => new Date(),
            },
        };
        //Vérification du employe
        const _pd_keys = Object.keys(employe_data);
        let _tmp = {};
        let _list_error = [];
        try {
            _pd_keys.forEach((v, i) => {
                _tmp = employe_data[v];
                if (!_tmp.fac && !_d[_tmp.front_name]) {
                    _list_error.push({ code: _tmp.front_name });
                }
            });

            if (_list_error.length > 0) {
                return res.send({
                    status: false,
                    message: "Certains champs sont vide ",
                    data: _list_error,
                });
            }

            let _data = {};
            _pd_keys.forEach((v, i) => {
                _tmp = employe_data[v];

                if (_tmp.format != undefined) {
                    _d[_tmp.front_name] = _tmp.format(_d[_tmp.front_name]);
                }

                _data[v] = _d[_tmp.front_name];
            });
            console.log(_data);
            _data.date_naiss = new Date(_data.date_naiss)
            await D.updateWhere("employe", _data, { emp_im: _data.emp_im });
            //Ici tous les fonctions sur l'enregistrement d'un employe
            return res.send({ status: true, message: "Mise à jour, fait" });
        } catch (e) {
            console.error(e);
            return res.send({
                status: false,
                message: "Erreur dans la base de donnée",
            });
        }
    }

    static async delete(req, res) {
        try {
            await D.del("employe", req.params);
            //Ici tous les fonctions sur l'enregistrement d'un employe
            return res.send({ status: true, message: "user supprimé." });
        } catch (e) {
            console.error(e);
            return res.send({
                status: false,
                message: "Erreur dans la base de donnée",
            });
        }
    }

    //Récupération des détails des employes
    static async getDetailsUser(req, res) {
        try {
            let { id } = req.params;

            //Récupération d'un simple employe
            let user = (
                await D.exec_params("select * from employe where emp_im = ?", id)
            )[0];

            //Récupération accès modules
            let user_access = await D.exec_params(
                `select * from module
            left join util_access on module_id = ua_module_id 
            left join employe on emp_im = ?`,
                id
            );

            let module_list = await D.exec("select * from module");

            // console.log(user);

            return res.send({ status: true, user, user_access, module_list });
        } catch (e) {
            console.error(e);
            return res.send({
                status: false,
                message: "Erreur dans la base de donnée",
            });
        }
    }


    static async getList(req, res) {
        let filters = req.query;
        let _obj_pat = {
            emp_im: "emp_im",
            util_label: "emp_nom_prenom",
        };
        let default_sort_by = "emp_im";

        filters.page = !filters.page ? 1 : parseInt(filters.page);
        filters.limit = !filters.limit ? 100 : parseInt(filters.limit);
        filters.sort_by = !filters.sort_by ?
            _obj_pat[default_sort_by] :
            _obj_pat[filters.sort_by];

        try {
            //A reserver recherche par nom_prenom
            let reponse = await D.exec_params(
                `select * from employe   order by ${filters.sort_by} limit ? offset ? `, [filters.limit, (filters.page - 1) * filters.limit]
            );

            //Liste total des employe
            let nb_total_employe = (
                await D.exec("select count(*) as nb from employe")
            )[0].nb;

            return res.send({ status: true, reponse, nb_total_employe });
        } catch (e) {
            console.error(e);
            return res.send({
                status: false,
                message: "Erreur dans la base de donnée",
            });
        }
    }

    static async getListDisp(req, res) {
        let filters = req.query;
        let _obj_pat = {
            emp_im: "emp_im",
            util_label: "emp_nom_prenom",
        };
        let default_sort_by = "emp_im";
        filters.page = !filters.page ? 1 : parseInt(filters.page);
        filters.limit = !filters.limit ? 100 : parseInt(filters.limit);
        filters.sort_by = !filters.sort_by ?
            _obj_pat[default_sort_by] :
            _obj_pat[filters.sort_by];
        try {
            //A reserver recherche par nom_prenom
            let reponse = await D.exec_params(
                `select employe.*,conge.etat_conge  from
             employe left join conge on employe.emp_im=conge.im_emp where 
             conge.etat_conge is null or conge.etat_conge=0  order by ${filters.sort_by} limit ? offset ? `, [filters.limit, (filters.page - 1) * filters.limit]
            );

            //Liste total des employe
            let nb_total_employe = (
                await D.exec("select count(*) as nb from employe")
            )[0].nb;

            return res.send({ status: true, reponse, nb_total_employe });
        } catch (e) {
            console.error(e);
            return res.send({
                status: false,
                message: "Erreur dans la base de donnée",
            });
        }
    }

    static async findList(req, res) {
        // let find_val =req.body.find
        let filters = req.query;
        let _obj_pat = {
            id_conge: "emp_im",
            emp_nom_prenom: "emp_nom_prenom",
        };
        let default_sort_by = "id_conge";
        filters.page = !filters.page ? 1 : parseInt(filters.page);
        filters.limit = !filters.limit ? 100 : parseInt(filters.limit);
        filters.sort_by = !filters.sort_by ?
            _obj_pat[default_sort_by] :
            _obj_pat[filters.sort_by];
        try {
            let reponse = await D.exec_params(
                `select employe.* 
             from  employe where 
             employe.emp_nom_prenom like ?  order by ${
               "employe." + filters.sort_by
             } limit ? offset ? `, [
                    "%" + req.body.find + "%",
                    filters.limit,
                    (filters.page - 1) * filters.limit,
                ]
            );
            //Liste total des conge
            let nb_total_conge = (
                await D.exec("select count(*) as nb from employe")
            )[0].nb;

            return res.send({ status: true, reponse, nb_total_conge });
        } catch (e) {
            console.error(e);
            return res.send({
                status: false,
                message: "Erreur dans la base de donnée",
            });
        }
    }

    // static async update(req, res) {
    //     let { user, mng_pass } = req.body;
    //     delete user.util_date_enreg;

    //     try {
    //         if (mng_pass.change) {
    //             user.util_mdp = await utils.hash(mng_pass.pass);
    //         } else {
    //             delete user.util_mdp;
    //         }

    //         await D.updateWhere("employe", user, { util_id: user.util_id });
    //         //Ici tous les fonctions sur l'enregistrement d'un employe
    //         return res.send({ status: true, message: "Mise à jour, fait" });
    //     } catch (e) {
    //         console.error(e);
    //         return res.send({
    //             status: false,
    //             message: "Erreur dans la base de donnée",
    //         });
    //     }
    // }
}

module.exports = Employe;
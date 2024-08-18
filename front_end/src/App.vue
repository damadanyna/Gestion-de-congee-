<template>
<div class="h-full w-full">
    <dec></dec>
    <!-- <notif></notif> -->
    <indexView v-if="!this.$store.state.data.user.util_status == 1"></indexView>
    <div v-else class="px-3 h-full w-full" :class="this.$store.state.is_dark ? 'bg-gray' : 'bg-gray-200'">
        <router-view class="h-full w-full" />
    </div>
</div>
</template>

<script>
import indexView from "../src/views/auth/indexView.vue";
import dec from "./components/decView.vue";
export default {
    components: {
        indexView,
        dec,
    },
    data() {
        return {
            date_: new Date().toDateString(),
        };
    },
    methods: {
        async getStatus() {
            try {
                const _r = await this.$http.get("api/users");
                let _d = _r.data;
                if (_d.status && _d.reponse[0] != undefined) {
                    // console.log(_d.reponse[0]);
                    this.$store.state.data.user = _d.reponse[0];
                }
            } catch (e) {
                alert("Erreur de donnexion");
                console.log(e);
            }
        },
        restDate(end) {
            return (this.dateDiff(new Date(end), new Date()).jour)+1
        },
        endDate(init, end) {
            Date.prototype.addDays = function (days) {
                this.setDate(this.getDate() + parseInt(days))
                return this
            }
            return new Date(init).addDays(end).toDateString()
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

        },
        verify_conge() {
            this.$store.commit('getAllList', this.array = {
                url: 'api/congeList',
                type_var: 'all_conge',
                value: '',
                date_: '',
                day_type: '',
                type: 'all_conge'
            });

        }
    },
    mounted() {
        // this.getStatus();
        // this.verify_conge();

        // setTimeout(() => {
        //     this.$store.state.all_conge.forEach(element => {
        //         if (element.im_emp, this.restDate(this.endDate(element.conge_date_enreg, element.nbr_jour)) <= 0) {
        //             console.log(element.id_conge, this.restDate(this.endDate(element.conge_date_enreg, element.nbr_jour)));

        //             this.$store.commit('update', this.array = {
        //                 url: 'api/congeUp',
        //                 id_conge: element.id_conge,
        //                 etat_conge: 0,
        //             });
        //         }
        //     });
        // }, 200);

        // this.$store.commit('getDash', this.array = {
        //     url: 'api/dashboard',
        //     date_: this.date_,
        // });

    },
    create() {

    }
};
</script>

<style>
.shadowing {
    box-shadow: 0px 0px 15px rgb(175, 175, 175);
}

.bg-gray {
    background: rgb(41, 41, 41);
}
</style>

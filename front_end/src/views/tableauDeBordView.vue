<template>
<div class=" flex flex-col w-full">
    <div class=" flex w-full  ">
        <div class=" flex">
            <router-link to="/" class=" px-2 group transform hover:scale-125">
                <svg class=" w-9" viewBox="0 0 24 24">
                    <path class=" group-hover:text-indigo-500 fill-current text-gray-600" d="M15.41 16.58 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" /></svg>
            </router-link>
            <div :class="this.$store.state.is_dark?'text-gray-50':'text-black'" class=" ml-4 text-2xl">Tableau de bord</div>
        </div>
    </div>
    <div class="flex w-full h-full items-center overflow-hidden justify-between flex-row px-16">
        <div id="circle1"></div>
        <div class=" flex flex-col w-full px-24 ">
            <div class="flex flex-col ">
                <u class=" flex flex-col text-xl text-indigo-500 font-bold border-indigo-500 rounded-lg px-2">Presence</u>
                <div class=" mt-4 px-5 ">
                    <span class=" text-white" v-text="this.$store.state.total_emp +' / '+this.$store.state.nb_pres"></span>
                    <div class="  ">
                        <span class=" w-52 bg-shapes h-2 rounded-lg block"></span>
                        <span class=" w-0 duration-1000  relative bg-emerald-600 h-2 rounded-lg block" :style=" 'width:'+pres_w+'px'" style=" margin-top:-8px"></span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col ">
                <u class=" flex flex-col text-xl text-indigo-500 font-bold border-indigo-500 rounded-lg px-2">Abscence</u>
                <div class=" mt-4 px-5 ">
                    <span class=" text-white" v-text="this.$store.state.total_emp +' / '+(this.$store.state.total_emp-this.$store.state.nb_pres)"></span>
                    <div class="  ">
                        <span class=" w-52 bg-shapes h-2 rounded-lg block"></span>
                        <span class="w-0 duration-1000  relative bg-orange-500 h-2 rounded-lg block" :style=" 'width:'+abs_w+'px'" style=" margin-top:-8px"></span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col ">
                <u class=" flex flex-col text-xl text-indigo-500 font-bold border-indigo-500 rounded-lg px-2">En Congé</u>
                <div class=" mt-4 px-5 ">
                    <span class=" text-white" v-text="this.$store.state.total_emp+'/'+this.$store.state.en_conge"></span>
                    <div class="  ">
                        <span class=" w-52 bg-shapes h-2 rounded-lg block"></span>
                        <span class=" w-7 relative bg-violet-600 h-2 rounded-lg block" style=" margin-top:-8px"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class=" flex flex-col ">
            <div class="flex flex-row items-center ">
                <div id="circle2"></div>
                <div class="flex flex-col">
                    <span class=" text-xl font-bold ml-3 text-white">Homes</span>
                    <span class=" text-xl text-gray-400 ml-3" v-text="'Total: '+ this.$store.state.nb_male+'/'+this.$store.state.total_emp"></span>
                </div>
            </div>
            <div class="flex flex-row mt-14 items-center ">
                <div id="circle3"></div>
                <div class="flex flex-col">
                    <span class=" text-xl font-bold ml-3 text-white">Femmes</span>
                    <span class=" text-xl text-gray-400 ml-3" v-text="'Total: '+ (this.$store.state.total_emp-this.$store.state.nb_male)+'/'+this.$store.state.total_emp"></span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Circle from '../circle/'
export default {
    data() {
        return {
            date_: new Date().toDateString(),
            pres_w: 0,
            abs_w: 0
        }
    },
    methods: {
        get_w() {
            return (this.$store.state.nb_pres * 208 / this.$store.state.total_emp)
        },
        get_w2() {
            return (this.$store.state.nb_pres * 208 / this.$store.state.total_emp)
        },
    },
    mounted() {
        var a = this.$store.state.total_emp;
        var b = this.$store.state.nb_male;
        var c = this.$store.state.nb_pres
        var d = this.$store.state.en_conge;

        this.$store.commit('getDash', this.array = {
            url: 'api/dashboard',
            date_: this.date_,
        });
         
        setTimeout(() => {
            this.abs_w = (208 - c * 208 / a)
            this.pres_w = this.get_w()
        }, 100);
        Circle.drawCircle('circle1', 'rgb(99,102,51)', 'white', ' rgb(41, 41, 41)', Math.round(((a - c) + d * 100) / a), 400, 80, true)
        Circle.drawCircle('circle2', 'red', 'white', ' rgb(41, 41, 41)', Math.round(((b * 100) / a)), 180, 30, false)
        Circle.drawCircle('circle3', 'green', 'white', ' rgb(41, 41, 41)', Math.round((((a - b) * 100) / a)), 180, 30, false)
    }
}
</script>

<style>
.bg-shapes {
    background: rgba(128, 128, 128, 0.068);
}
</style>

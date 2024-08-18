<template>
    <div class=" bg-stone-700 ">
        <div id="tree" ref="tree" class=" bg-stone-700"></div>
    </div>
</template>

<script>

    import OrgChart from '@balkangraph/orgchart.js'

    export default { 
        data() {
            return {
                nodes: [
                    { id: 1, name: "Mr.Hery", title: "Ministre", img: `${require('../assets/img/boss.jpg')}` },
                            { id: 2, pid: 1, name: "Misaotrazy", title: "Directeur", img: `${require('../assets/img/rami.jpg')}`},
                            { id: 3, pid: 1, name: "Caden Ellison", title: "Dev Manager", img: "https://cdn.balkan.app/shared/4.jpg" },
                            { id: 4, pid: 2, name: "Elliot Patel", title: "Sales", img: "https://cdn.balkan.app/shared/5.jpg" },
                            { id: 5, pid: 2, name: "Lynn Hussain", title: "Sales", img: "https://cdn.balkan.app/shared/6.jpg" },
                            { id: 6, pid: 2, name: "Lynn Hussain", title: "Sales", img: "https://cdn.balkan.app/shared/6.jpg" },
                            { id: 7, pid: 3, name: "Tanner May", title: "Developer", img: "https://cdn.balkan.app/shared/7.jpg" },
                            { id: 8, pid: 3, name: "Fran Parsons", title: "Developer", img: "https://cdn.balkan.app/shared/8.jpg" }
                ]
            }
        },

        methods: {
            mytree: function(domEl, x) {
                this.chart = new OrgChart (domEl, {
                    nodes: x,
                    nodeBinding: {
                        field_0: "name",
                        img_0: "img"
                    }
                });
            }
        },

        mounted(){
            this.mytree(this.$refs.tree, this.nodes)
        }
    }
</script>

<style scoped>
</style>
<template>
    <div class=" flex flex-col fixed top-5 right-4 px-6 rounded-lg py-2 border border-gray-300"> 
        <div class=" flex flex-row items-center "> 
            <svg class=" w-12" viewBox="0 0 24 24"><path class=" fill-current text-green-500" d="M21 7 9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7z" /></svg>
            <span class=" font-semibold text-xl">Success</span> 
        </div>
        <span class=" text-xs text-indigo-500" v-text=" this.$store.state.message" ></span> 
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
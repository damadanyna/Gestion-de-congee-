<template>
  <div class=" w-full h-full flex-col px-3 z-50 ">
      <div class=" w-full flex justify-between pb-6 bg-gray-900"> 
        <div class="flex"> 
          <div  @click="  " title="Retoure à la liste des employés" class="  group transform cursor-pointer hover:scale-125">
            <svg class=" w-9" viewBox="0 0 24 24"><path class=" group-hover:text-indigo-500 fill-current text-gray-600" d="M15.41 16.58 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" /></svg>
          </div>
          <span class=" text-2xl font-bold">Historique</span>
        </div>
        <div class=" flex rounded-b-2xl px-4 bg-indigo-500">
          <svg class="w-7 " viewBox="0 0 24 24"><path class=" fill-current text-white" d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" /></svg>
          <span class=" text-2xl text-white">Benito</span>
        </div> 
      </div>
      <div class="overflow-y-auto " style="max-height:89vh"> 
        <div class="flex flex-col ">
            <div class="w-full uppercase pb-3">
              <span class=" text-gray-400 font-bold">Retard</span>
            </div>
            <div class=" h-96 bg-gray-400 rounded-lg"></div>
            <div class="w-full uppercase pb-3">
              <span class=" text-gray-400 font-bold">abscence</span>
            </div>
            <div class=" h-96 bg-gray-400 rounded-lg"></div>
            <div class="w-full uppercase pb-3">
              <span class=" text-gray-400 font-bold">Congé</span>
            </div>
            <div class=" h-96 bg-gray-400 rounded-lg"></div>
        </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
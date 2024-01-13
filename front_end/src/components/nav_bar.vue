<template>
  <nav class=" w-full flex flex-col bg-gray-700  px-4 py-4">
      <div class=" flex-col items-center text-xs font-medium sm:text-base lg:flex-row  w-full flex justify-center border-b border-gray-500 py-3 "> 
        <svg class=" w-14"  viewBox="0 0 24 24"><path class=" fill-current text-white" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 6.39A9.973 9.973 0 0 0 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8-3 0-5.61-1.66-7-4.11L6.75 14v-1A1.25 1.25 0 0 1 8 11.75 1.25 1.25 0 0 1 9.25 13v1H12m4-2.25A1.25 1.25 0 0 0 14.75 13 1.25 1.25 0 0 0 16 14.25 1.25 1.25 0 0 0 17.25 13 1.25 1.25 0 0 0 16 11.75z" /></svg>
        <span class=" ml-4 font-bold text-white uppercase  text-center "> Réservatoin du table</span>
    </div>

    <div class="  flex flex-col mt-5">
        <router-link class=" flex-col items-center text-xs font-medium sm:text-base lg:flex-row flex  my-2 text-gray-400" to="/home"> 
          <svg class=" w-7" viewBox="0 0 24 24"><path class=" fill-current text-gray-400" d="M13 3v6h8V3m-8 18h8V11h-8M3 21h8v-6H3m0-2h8V3H3v10z" /></svg>
          <span class=" hidden sm:flex"> Tableau de bord</span>
        </router-link> 
        <router-link class=" flex-col items-center text-xs font-medium sm:text-base lg:flex-row flex  my-2 text-gray-400" to="/reservation"> 
          <svg class=" w-7"  viewBox="0 0 24 24"><path class=" fill-current text-gray-400"  d="m14 12-4-4v3H2v2h8v3m12-4a10 10 0 0 1-19.54 3h2.13a8 8 0 1 0 0-6H2.46A10 10 0 0 1 22 12z" /></svg>
          <span class=" hidden sm:flex">Reservation</span>
        </router-link> 
        <router-link   @click="$store.state.params=null"  class=" flex-col items-center text-xs font-medium sm:text-base lg:flex-row flex  my-2 text-gray-400" to="/client"> 
          <svg class=" w-7" viewBox="0 0 24 24"><path class=" fill-current text-gray-400" d="M12 5a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 5m0 2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 10a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 7M5.5 8A2.5 2.5 0 0 0 3 10.5c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32.44 0 .85-.12 1.21-.32.37-.21.68-.51.91-.87A5.42 5.42 0 0 1 6.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31.12.19.25.34.4.49a2.482 2.482 0 0 0 1.72.7c.44 0 .85-.12 1.21-.32.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0 0 18.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1z" /></svg>
          <span class=" hidden sm:flex">Client</span>
        </router-link> 
    </div>
  </nav>
</template>
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>

nav a.router-link-exact-active {
  color: #ffffff;
  font-weight: bold;
}
nav a.router-link-exact-active path  {
  fill: #ffffff;

  
}
nav .router-link-exact-active{
  transform: translateX(25px);
  
}
</style>

<template>
    <div class=" bg-stone-900 flex flex-col w-full h-full">
        <div class="flex justify-between w-full" >
                <div class=" flex flex-row w-60 rounded-xl justify-center mt-3 ml-3 items-center bg-indigo-600">
                    <svg class=" w-7" viewBox="0 0 24 24">
                        <path class=" fill-current text-white" d="M10 4v4h4V4h-4m6 0v4h4V4h-4m0 6v4h4v-4h-4m0 6v4h4v-4h-4m-2 4v-4h-4v4h4m-6 0v-4H4v4h4m0-6v-4H4v4h4m0-6V4H4v4h4m2 6h4v-4h-4v4M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4c-1.08 0-2-.9-2-2V4a2 2 0 0 1 2-2z" /></svg>
                    <span class=" text-2xl text-white ">Page d'accueil</span>
                </div>
                <div class="flex flex-row items-center text-white">  
                    <router-link to="/scanQRCode"  class=" cursor-pointer">Appareil</router-link  >
                    <div @click="this.$store.state.decView=false" class="  px-4 py-1 hover:scale-125 transform group cursor-pointer" title=" Deconnectez ?">
                        <svg class=" w-7" viewBox="0 0 24 24">
                            <path class=" fill-current  " :class="this.$store.state.is_dark?'text-white group-hover:text-red-600':'text-gray-700 group-hover:text-red-600'" d="m16.56 5.44-1.45 1.45A5.969 5.969 0 0 1 18 12a6 6 0 0 1-6 6 6 6 0 0 1-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 5.44A7.961 7.961 0 0 0 4 12a8 8 0 0 0 8 8 8 8 0 0 0 8-8c0-2.72-1.36-5.12-3.44-6.56M13 3h-2v10h2" /></svg>
                    </div>
                </div>
            </div>
        <div class="w-full hfull flex  flex-row h-full">
            <div class="w-[30vw] h-full border-r border-stone-400 "> 
                <div class="flex px-10 mt-12"> 
                    <video ref="video" width="200" height="300" autoplay></video>
                    <canvas ref="canvas" style="display: none;"></canvas>
                </div>
            <!-- <input type="file" @change="onFileChange" accept="image/*" /> -->
                <div class=" flex flex-col ml-10 mt-12 text-white"> 
                    <div class="flex">
                        <span>ID:</span>
                        <span v-text="decodedResult.util_id??''"></span>
                    </div> 
                    <div class="flex">
                        <span>E-mail:</span>
                        <span v-text="decodedResult.util_email??''"></span>
                    </div> 
                    <div class="flex">
                        <span>Nom :</span>
                        <span v-text="decodedResult.util_name??''"></span>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import jsQR from "jsqr";
  
  export default {
    data() {
      return {
        decodedResult:''
    };
    },
    mounted() {
      this.startVideo();
      console.log(this.decodedResult);
      
    },
    methods: {
      startVideo() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
          .then(stream => {
            this.$refs.video.srcObject = stream;
            this.scanCode();
          })
          .catch(err => {
            console.error("Erreur lors de l'accès à la caméra : ", err);
          });
      },
      scanCode() {
        const video = this.$refs.video;
        const canvas = this.$refs.canvas;
        const context = canvas.getContext("2d");
  
        const scan = () => {
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              this.decodedResult = JSON.parse(code.data);
            }
          }
          requestAnimationFrame(scan);
        };
  
        scan();
      },
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
              const canvas = this.$refs.canvas;
              const context = canvas.getContext('2d');
              canvas.width = img.width;
              canvas.height = img.height;
              context.drawImage(img, 0, 0, canvas.width, canvas.height);
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, imageData.width, imageData.height);
              if (code) {
                this.decodedResult = code.data;
              } else {
                alert('QR Code non détecté.');
              }
            }
          }
          reader.readAsDataURL(file);
        }
      }
    },
   
  };
  </script>
  
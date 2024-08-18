<template>
    <div class="qr-code-generator">
      <h1>QR Code Generator</h1>
      <input v-model="text" placeholder="Enter text to generate QR code" />
      <button @click="generateQRCode">Generate QR Code</button>
      <canvas ref="qrCanvas" class="qr-code-canvas"></canvas>
    </div>
  </template>
  
  <script>
  import QRCode from 'qrcode';
  
  export default {
    data() {
      return {
        text: '',
        logoSrc: '  ', // Remplacez par le chemin réel de votre logo
        qrCodeSize: 200,
      };
    },
    methods: {
      async generateQRCode() {
        try {
          const canvas = this.$refs.qrCanvas;
          const context = canvas.getContext('2d');
          canvas.width = this.qrCodeSize;
          canvas.height = this.qrCodeSize;
  
          // Générer le QR code sur le canvas
          await QRCode.toCanvas(canvas, this.text, {
            width: this.qrCodeSize,
            height: this.qrCodeSize,
          });
  
          // Ajouter le logo au centre du QR code
          const logo = new Image();
          logo.src = this.logoSrc;
          logo.onload = () => {
            const logoSize = this.qrCodeSize / 5;
            const logoX = (canvas.width - logoSize) / 2;
            const logoY = (canvas.height - logoSize) / 2;
            context.drawImage(logo, logoX, logoY, logoSize, logoSize);
          };
        } catch (error) {
          console.error('Failed to generate QR code', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .qr-code-generator {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  
  .qr-code-canvas {
    margin-top: 20px;
  }
  </style>
  
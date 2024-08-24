import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import store from './store'
import axios from 'axios'

//configuration axios

//'http:// http://192.168.2.8:8080/' //Sur serveur
axios.defaults.baseURL = ' http://192.168.2.8:8080/' //'http://localhost:8080/'


const app=createApp(App)
    app.use(store)
    //Ajout de axios dans vue
    app.config.globalProperties.$http = axios
    app.use(router)
    app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import store from './store'
import axios from 'axios'

//configuration axios

//'http://192.168.88.254:4044' //Sur serveur
axios.defaults.baseURL = 'http://localhost:4044' //'http://localhost:4044'


const app=createApp(App)
    app.use(store)
    //Ajout de axios dans vue
    app.config.globalProperties.$http = axios
    app.use(router)
    app.mount('#app')

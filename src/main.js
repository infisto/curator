import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'
import './styles/variable.scss'
import './styles/buttons.scss'
import './styles/main.scss'

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FB_KEY,
    authDomain: "project-one-91cc9.firebaseapp.com",
    databaseURL: "https://project-one-91cc9-default-rtdb.firebaseio.com",
    projectId: "project-one-91cc9",
    storageBucket: "project-one-91cc9.appspot.com",
    messagingSenderId: "419613182253",
    appId: "1:419613182253:web:212edf6d289d6c9773aba4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore()
export default db

let app
firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        createApp(App).use(store).use(router).mount('#app')
    }
})




/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Profile from "./components/Profile";
import moment from "moment";

require('./bootstrap');

window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

import VueRouter from "vue-router";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import { Form, HasError, AlertError } from 'vform'
Vue.use(VueRouter);

window.Form = Form;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

let routes = [
    { path: '/dashboard', component: Dashboard },
    { path: '/profile', component: Profile },
    { path: '/users', component: Users },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

import Swal from 'sweetalert2'
window.Swal = Swal;


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

window.Toast = Toast;

window.Fire = new Vue();


Vue.filter('upText', function (text){
    return text.charAt(0).toUpperCase() + text.slice(1);
});
Vue.filter('myDate',(date) => {
    return moment(date).format('LLL');
});
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
})

const app = new Vue({
    el: '#app',
    router,
});

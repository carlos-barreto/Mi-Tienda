import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';
import VueAxios from 'vue-axios'




Vue.use(VueAxios, axios);
// Vue.prototype.$axios = axios;
Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.config.productionTip = false

Vue.component(
    "categorias-component",
    require("./components/categorias/CategoriasComponent.vue").default
);
Vue.component(
    "auth-component",
    require("./components/AuthComponent.vue").default
);

// let auth_component = {
//     template: "<auth-component></auth-component>"
// };
// let categorias_component = {
//     template: "<categorias-component></categorias-component>"
// };
const router = new VueRouter({
    mode: "history",
    routes: [{
            path: "/",
            name: "auth",
            component: () =>
                import ('./components/AuthComponent.vue')
                //component: auth_component
        },
        {
            path: "/categorias",
            name: "Categorias",
            component: () =>
                import ('./components/categorias/CategoriasComponent.vue')
                // component: categorias_component
        },
        {
            path: "/catalogo/:category_id",
            name: "Catalogo",
            component: () =>
                import ('./components/categorias/CatalogoComponent.vue')
                // component: categorias_component
        },
        {
            path: "/carrito",
            name: "Carrito",
            component: () =>
                import ('./components/CarritoComponent.vue')
                // component: categorias_component
        },
    ]
})
router.beforeEach((to, from, next) => {
    const historyCostumer = JSON.parse(localStorage.getItem("emprendedora"));
    if (historyCostumer && to.name == 'auth') {
        next({ name: 'Categorias' });
    } else if ((to.name == 'Categorias' || to.name == 'Carrito') && historyCostumer == null) {
        next({ name: 'auth' });
    } else {
        next();
    }
})
new Vue({
    render: h => h(App),
    router,
    vuetify: new Vuetify({
        iconfont: "mdi",
        theme: {
            themes: {
                light: {
                    primary: "#EE7D39",
                    secondary: "#363636",
                    accent: "#5C6BC0", // tablas
                    error: "#FF5252",
                    info: "#2196F3",
                    success: "#4CAF50",
                    warning: "#FFC107"
                }
            }
        }
    }),
    data: () => ({
        auth_user: false,
        app_bar: false,
        navigation_drawer: null,
        mini: true,
        items: [
            { title: 'Categorías', icon: 'mdi-home' },
            { title: 'Catálogo', icon: 'mdi-badge-account-outline' },
            { title: 'Carrito', icon: 'mdi-cart-outline' },
        ],
        finishLoagingPage: false,
        cdn: "https://v3.tissini.app",
        historyNav: [],
        carrito: null,
    }),
    beforeMount() {
        this.finishLoagingPage = true;
        document.getElementById("loadOverlay").style.display = "none";
    },
    mounted() {
        this.historialRoute();
    },
    methods: {
        historialRoute() {
            this.historyNav.push({
                to: '/categorias',
                text: 'Categorias',
            })
            localStorage.setItem(
                "historyNav",
                JSON.stringify(this.historyNav)
            );
        }
    },
}).$mount('#app')
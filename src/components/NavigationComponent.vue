<template>
  <div>
    <v-app-bar
      outlined
      elevation="0"
      style="border-bottom: 1px solid #ccc !important"
      color="white"
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="clickToggleDrawer">
        <v-icon 
          >{{ mini == false ? "mdi-menu-open" : "mdi-menu" }}
        </v-icon>
      </v-app-bar-nav-icon>
      <span class="font-weight-bold">Ferchitos Store Tissini App</span>
        <v-spacer></v-spacer>
       <v-btn @click="backPage" outlined v-if="regresar" rounded class="text-capitalize grey lighten-2"> <v-icon left>mdi-arrow-left</v-icon> Regresar </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer_help"
      app
      clipped
      :mini-variant.sync="mini"
    >
      <v-list class="py-0">
       
        <v-list-item to="/categorias" @click="goCategorias" link>
          <v-list-item-icon>
            <v-icon>mdi-book-open-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="text-align: justify">
            <v-list-item-title
              >
              <span > Catalogo </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-list-item to="/carrito" @click="goCarrito" link>
          
          <v-list-item-icon>
             <v-badge
              offset-x="10"
        offset-y="10"
          color="primary"
          :value="total_carrito ? total_carrito : 0"
          :content="total_carrito ? total_carrito : 0"
        >
            <v-icon>mdi-cart-outline</v-icon>
             </v-badge>
          </v-list-item-icon>
          <v-list-item-content style="text-align: justify">
            <v-list-item-title
              >
                Carrito
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list class="py-0">
          <v-list-item @click="salir">
            <v-list-item-icon>
              <v-icon color="red">mdi-logout</v-icon>
            </v-list-item-icon>
             <v-list-item-content style="text-align: justify">
            <v-list-item-title>Salir</v-list-item-title>
             </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  props: ["validarCarrito", "regresar"],
  data() {
    return {
       mini: true,
      drawer_help: true,
      loading_get_info: false,
      perfil_tutorial: [
        ["Editar tu perfil", "mdi-account-multiple-outline", "/perfil"],
      ],
      total_carrito: null,
      total_amount: null,
    };
  },
  watch: {
    validarCarrito() {
        console.log(this.validarCarrito);
      if (this.validarCarrito > 0) this.validarCacheCarrito();
    },
  },
  mounted() {
    this.validarCacheCarrito();
  },
  methods: {
     backPage () {
      this.$router.back()
    },
    goCategorias() {
      this.$router.push("/categorias");
    },
    clickToggleDrawer() {
      this.mini  = !this.mini ;
    },
    validarCacheCarrito() {
      const validador = JSON.parse(localStorage.getItem("cartProducts"));
      if (validador) {
        this.total_carrito = validador
          .map((item) => item.quantity)
          .reduce((prev, curr) => prev + curr, 0);
      }
    },
    goCarrito() {
      this.$router.push("/carrito");
    },
    
    salir() {
      localStorage.clear();
      setTimeout(() => {
        this.$router.push("/");
      }, 800);
    }
  },
};
</script>

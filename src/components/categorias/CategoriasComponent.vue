<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" sm="6">
        <template>
          <barra-navegacion :validarCarrito="validarCarrito"></barra-navegacion>
        </template>
      </v-col>
      <v-col cols="12" md="12" sm="6" class="mt-5">
        <template v-if="loading_get_categorias">
          <div style="center-custom">
            <v-card
              height="176"
              width="500"
              v-for="(item, i) in 5"
              :key="i"
              outlined
              class="center-card"
            >
              <v-card-text>
                <v-row justify-center align="center">
                  <v-col md="12">
                    <v-skeleton-loader
                      height="143"
                      type="table-heading, list-item-two-line, image, table-tfoot"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
        </template>
        <template v-else>
          <items-categoria :array_categories="items_sections"></items-categoria>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import itemCategoriaComponent from "./includes/ItemsCategoriaComponent.vue";
import navigationComponent from "../NavigationComponent.vue";
import axios from "axios";




export default {
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  components: {
   
    "items-categoria": itemCategoriaComponent,
    "barra-navegacion": navigationComponent,
  },
  data() {
    return {
      control_refres_get_categoriaes: true,
      error_busqueda: null,
      loading_get_categorias: null,
      items_categoria: [],
      array_categories: [],
      items_subcategoria: [],
      items_sections: [],
      entradasInvalidas: 0,
      arrPorID: [],
      validarCarrito: null,
      carProducts: [],
    };
  },
  watch: {},
  mounted() {
    this.validarCache();
    this.multivendedor();
    this.categories();
    this.sections();
  },
  computed: {},
  methods: {
    validarCache() {
      this.loading_get_categorias = true;
      this.error_busqueda = null;
      var busqueda_cache = localStorage.categories
        ? JSON.parse(localStorage.getItem("categories"))
        : null;
      if (busqueda_cache != "") {
        this.items_categoria = busqueda_cache;
        this.loading_get_categorias = false;
      } else {
        this.items_categoria = [];
        this.error_busqueda = true;
      }
      if (this.carProducts.length <0) {
        const validar = localStorage.getItem("cartProducts");
        this.carProducts = JSON.parse(validar);
        this.validarCarrito = this.carProducts.length;
      }
    },
    multivendedor() {
      var url = "https://v3.tissini.app/api/v3/stock/multivendor/158966";
      const config = {
        headers: {
          "Referrer-Policy": "no-referrer",
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      axios
        .get(url, config)
        .then((res) => {
          this.items_subcategoria = res.data;
        })
        .catch((err) => {
          const respuesta = err.response.data;
          this.error_busqueda = respuesta;
        });
    },
    categories() {
      this.loading_get_categorias = true;
      var url = "https://v3.tissini.app/api/v3/categories";
      const config = {
        headers: {
          "Referrer-Policy": "no-referrer",
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      axios
        .get(url, config)
        .then((res) => {
          this.array_categories = res.data;
          this.loading_get_categorias = false;
          localStorage.setItem("categories", JSON.stringify(res.data));

          //this.filtrarPorID();
        })
        .catch((err) => {
          const respuesta = err.response.data;
          this.error_busqueda = respuesta;
        });
    },
    sections() {
      var url = "https://v3.tissini.app/api/v3/categories/sections";
      const config = {
        headers: {
          "Referrer-Policy": "no-referrer",
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      axios
        .get(url, config)
        .then((res) => {
          this.items_sections = res.data;
          //console.log(this.items_subcategoria);
          //this.filtrarPorID();
        })
        .catch((err) => {
          const respuesta = err.response.data;
          this.error_busqueda = respuesta;
        });
    },
    filtrarPorID() {
      var filterX = [];
      this.items_categoria.forEach((element) => {
        filterX = this.items_subcategoria.filter(
          (x) => x.category_id == element.id
        );
        //console.log(element.id);
      });
      console.log(filterX);
      //  console.log(this.items_categoria);
    },
  },
};
</script>
<style scoped>
.center-custom {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.center-card {
  margin-left: auto;
  margin-right: auto;
}
</style>
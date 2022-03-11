<template>
  <!-- <v-card class="mx-auto" style="overflow-y: auto; max-height: 600px"> -->
  <v-container style="height: 100vh;" >

    <barra-navegacion :regresar="true" :validarCarrito="validarCarrito"></barra-navegacion>

    <v-layout style="height: 100vh;" wrap justify-center align-center class="mt-3 velmld-parent">
      <v-col cols="12" md="12">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide v-for="card in cards_products" :key="card.title"> <v-card  class="mt-2">
          <v-img contain
            :src="$root.cdn + card.images[0].url"
            class="white--text align-end"
            height="260px"
            min-width="160"
            max-height="260px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-btn class="text-capitalize" depressed rounded color="primary" @click="dialogProducto(card)">
              <v-icon left>mdi-cart-plus</v-icon>
              Agregar
            </v-btn>

            <v-spacer></v-spacer>
            <div class="text-xs-right">
              <span class="item-price">${{ card.price }}</span>
            </div>
          </v-card-actions>
        </v-card></swiper-slide>
       
        <div class="swiper-button-prev1" slot="button-prev">
           <v-icon large style="margin-top: 64px">mdi-chevron-left-circle</v-icon>
        </div>
    <div class="swiper-button-next1" slot="button-next">
      <v-icon large style="margin-top: 64px">mdi-chevron-right-circle</v-icon>
    </div>

        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
       
      </v-col>
    </v-layout>
    <v-dialog v-model="dialosAdd" persistent max-width="400">
      <v-card class="round">
        <v-card-title class="pa-1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="secondary"
                small
                icon
                text
                fab
                @click="cancelarIntento"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>Cerrar</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          <v-container class="px-9 pt-0">
            <div class="text-center">
              <v-icon size="40" color="secondary" left> mdi-cart-plus </v-icon>
            </div>
            <div class="text-center">
              <h4 class="font-weight-bold mt-3 primary--text">
                Selecciona el tamaño
              </h4>
              <v-select
                v-model="talla_select"
                :items="talla"
                item-text="size"
                item-value="id"
                return-object
                placeholder="Selecciona el tamaño"
                outlined
                chips
                dense
                deletable-chips
              ></v-select>
            </div>
            <div>
              <h4 class="font-weight-bold mt-3 primary--text">
                Selecciona la cantidad
              </h4>
              <v-slider
                v-model="cantidad_val"
                :label="cantidad.label"
                :thumb-color="cantidad.color"
                thumb-label="always"
              ></v-slider>
            </div>
            <v-layout wrap>
              <v-col class="text-center px-0" md="12" sm="12" cols="12">
                <v-btn
                  class="text-capitalize mx-auto"
                  block
                  color="primary"
                  depressed
                  rounded
                  @click="addProducto"
                >
                  Agregar al carrito
                </v-btn>
              </v-col>
              <v-col class="pt-0 px-0" md="12" sm="12" cols="12">
                <v-btn @click="cancelarIntento" class="text-capitalize" block rounded outlined depressed>
                  Cancelar
                </v-btn>
              </v-col>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import navigationComponent from "../NavigationComponent.vue";
import axios from "axios";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  components: {
    "barra-navegacion": navigationComponent,
    Swiper,
    SwiperSlide,
  },
  data: () => ({
    banners: ["/1.jpg", "/2.jpg", "/3.jpg"],
    swiperOption: {
      slidesPerView: 4,
      slidesPerColumn: 3,
      spaceBetween: 30,
       navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1'
          },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    },
    cards_catalogo: [],
    cards_products: [],
    route_params: null,
    dialosAdd: false,
    item_producto: [],
    talla_select: null,
    cantidad_val: null,
    talla: [],
    cantidad: { val: 0, color: "primary" },
    item_index: null,
    carProducts: [],
    validarCarrito: null,
  }),
  mounted() {
    this.route_params = this.$route.params.category_id;

    const carrito = JSON.parse(localStorage.getItem("cartProducts"));

    if (carrito) {
      this.carProducts = carrito;
    }
  },
  watch: {
    route_params() {
      if (this.route_params != null) {
        this.categoriesId();
        const historyNav = JSON.parse(localStorage.getItem("historyNav"));
        if (historyNav) {
          historyNav.push({
            to: this.$route.fullPath,
            text: this.$route.name,
          });
          localStorage.setItem("historyNav", JSON.stringify(historyNav));
        }
      }
    },
  },
  methods: {
    dialogProducto(item) {
      this.item_producto = item;
      this.talla = this.item_producto.variants;
      this.cantidad = this.item_producto.quantity;
      this.dialosAdd = true;
    },
    addProducto() {
      this.carProducts.push({
        category: this.item_producto.category,
        id: this.item_producto.id,
        images: this.item_producto.images,
        isAfs: false,
        name: this.item_producto.name,
        origin: null,
        quantity: this.cantidad_val,
        reference: this.item_producto.reference,
        variant: this.talla_select,
        variants: this.talla,
      });
      if (this.carProducts) {
        localStorage.setItem("cartProducts", JSON.stringify(this.carProducts));
        this.validarCarrito = this.carProducts.length;
      }
      this.dialosAdd = false;
    },
    cancelarIntento() {
      this.dialosAdd = false;
      // this.carProducts = [];
    },
    categoriesId() {
      var url = "https://v3.tissini.app/api/v3/categories/" + this.route_params;
      const config = {
        headers: {
          "Referrer-Policy": "no-referrer",
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      axios
        .get(url, config)
        .then((res) => {
          this.cards_catalogo = res.data.categories.categories;
          this.multiVendedor();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    
    multiVendedor() {
      var url =
        "https://v3.tissini.app/api/v3/categories/" +
        this.route_params +
        "/products/multivendor";
      const config = {
        headers: {
          "Referrer-Policy": "no-referrer",
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      axios
        .get(url, config)
        .then((res) => {
          this.cards_products = res.data.products;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
<style scoped>
.velmld-parent {
  position: relative !important;
}
.item-price {
  font-size: 20px;
  color: #ee7d39;
}
</style>

<style lang="scss" scoped>

.swiper-button-prev1{
      position: fixed;
    z-index: 10;
    height: 100%;
    width: 50px;
    top: 0;
    align-items: center;
    display: flex;
    left: 2px;
    justify-content: center;
}
.swiper-button-next1{
      position: fixed;
    z-index: 10;
    height: 100%;
    width: 50px;
    top: 0;
    align-items: center;
    display: flex;
    right: 2px;
    justify-content: center;
}

.swiper {
  height: 1000px;
  margin-left: auto;
  margin-right: auto;

  .swiper-slide {
    height: 300px;
  }
}
</style>
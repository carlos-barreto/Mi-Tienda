<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" sm="6">
        <template>
          <barra-navegacion :validarCarrito="validarCarrito"></barra-navegacion>
        </template>
      </v-col>
      <v-col cols="12" md="8" sm="6" class="mt-5">
        <v-slide-group class="pa-4" mandatory show-arrows style="height: 460px">
          <v-slide-item v-for="(n, index) in items_carrito" :key="index">
            <v-hover>
              <template v-slot:default="{ hover }">
                <v-card
                  class="mx-2 rounded-xl"
                  max-width="300"
                  max-height="400"
                >
                  <div class="position-relative">
                    <v-img
                      class="rounded-xl"
                      :src="$root.cdn + n.images[0].url"
                      height="300"
                      ><div style="text-align: initial">
                        <v-chip
                          class="p-absolute top-0 rounded-r-xl rounded-l-0 mt-3"
                          color="primary"
                          label
                          text-color="white"
                        >
                          <v-icon left> mdi-label </v-icon>
                          <font style="vertical-align: inherit">
                            $ {{ n.variant.price }}</font
                          >
                        </v-chip>
                      </div></v-img
                    >
                  </div>

                  <v-card-title>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="primary--text text-break">{{
                          n.name
                        }}</v-list-item-title>
                        <v-list-item-subtitle
                          class="primary--text text-subtitle-2"
                        >
                          Talla: {{ n.variant.size }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle
                          class="primary--text text-subtitle-2"
                        >
                          Cantidad: {{ n.quantity }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card-title>

                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="rgb(237 203 161)">
                      <v-btn> SKU. {{ n.variant.sku }}</v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-card>
              </template>
            </v-hover>
          </v-slide-item>
        </v-slide-group>
      </v-col>
      <v-col cols="12" md="4" sm="12" class="mt-7">
        <v-card>
          <v-card-title class="mt--2 ma-1"
            >Resumen de los productos</v-card-title
          >
          <v-card-text>
            <v-list class="transparent">
              <v-list-item v-for="(productos, p) in items_carrito" :key="p">
                <v-list-item-title class="text-overline">{{
                  productos.name
                }}</v-list-item-title>

                <v-list-item-subtitle class="text-right">
                  <span class="input__label caption">
                    $ {{ productos.variant.price }}
                  </span>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>

            <v-row>
              <v-col sm="4" class="pt-0 mt-5 mb-1" style="align-self: center">
                <div class="body-1 font-weight-bold">Total pagar</div>
              </v-col>
              <v-col sm="8" class="text-right pt-0 mt-5 mb-1">
                <div class="body-1 font-weight-bold whitespace-no-wrap">
                  <span class="h6 font-weight-bold">
                    $ {{ total_price_real_view ? total_price_real_view : "" }}
                  </span>
                </div>
              </v-col>
              <v-col cols="12" md="12">
                <v-btn
                  :disabled="items_carrito.length == 0 ? true : false"
                  rounded
                  color="primary"
                  @click="checkPago"
                  >CONTINUAR CON EL PAGO</v-btn
                >
              </v-col>
              <v-col cols="12" md="12">
                <v-btn
                  @click="continuarComprando"
                  link
                  rounded
                  color="secondary"
                  >CONTINUAR COMPRANDO</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-dialog
          v-model="dialogPago"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="primary" elevation="0">
              <v-btn icon dark @click="dialogPago = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <formulario-pago
              @dialogPago="dialogPago = $event"
              @pagoConfirm="pagoConfirm = $event"
              :data="items_carrito"
            ></formulario-pago>
          </v-card>
        </v-dialog>
        <v-dialog v-model="pagoConfirm" persistent max-width="290">
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
                  <v-icon size="40" color="secondary" left>
                    mdi-cart-plus
                  </v-icon>
                </div>
                <div class="text-center">
                  <h4 class="font-weight-bold mt-3 primary--text">
                    Gracias por tu compra! Por favor, contáctame para hacer el
                    pago.
                  </h4>
                </div>
                <v-layout wrap>
                  <v-col class="pt-0 px-0" md="12" sm="12" cols="12">
                    <v-btn
                      class="text-capitalize"
                      block
                      rounded
                      outlined
                      depressed
                      @click="goCategorias"
                    >
                      IR AL CATÁLOGO
                    </v-btn>
                  </v-col>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import formularioComponent from "./FormularioPagoComponent.vue";
import navigationComponent from "./NavigationComponent.vue";
import axios from "axios";
export default {
  components: {
    "barra-navegacion": navigationComponent,
    "formulario-pago": formularioComponent,
  },

  data() {
    return {
      items_carrito: [],
      validarCarrito: null,
      total_price_real_view: null,
      dialogPago: false,
      pagoConfirm: false,
    };
  },

  mounted() {
    this.getMyProducts();
  },

  methods: {
    getMyProducts() {
      const historyCarrito = JSON.parse(localStorage.getItem("cartProducts"));
      if (historyCarrito) {
        this.items_carrito = historyCarrito;
        this.validarCarrito = this.items_carrito.length;

        this.total_price_real_view = this.items_carrito
          .map((item) => item.variant.price)
          .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0)
          .toFixed(2);
      }
    },
    continuarComprando() {
      this.$router.replace("/categorias");
    },
    goCategorias() {
      this.$router.push("/categorias");
    },
    checkPago() {
      var url = "https://io.tissini.app/api/v1/cart/check";
      axios
        .post(
          url,
          {
            products: this.items_carrito,
          },
          {
            headers: {
              "Referrer-Policy": "no-referrer",
              "Content-type": "application/json; charset=UTF-8",
              Authorization:
                "Bearer AFZdgWRAzSb6VXmXmTwjR7gCHGEtLZzsOwUjtCovMma4sCeH5kYQpoo3qpKUFVPyUPDmTfxSq94tE3gM",
            },
          }
        )
        .then((res) => {
          if (res) {
            this.dialogPago = true;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
<style >
.input__label {
  color: #eb8635;
  font-size: 15px;
}
</style>
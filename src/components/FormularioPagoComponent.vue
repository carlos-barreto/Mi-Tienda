<template>
  <div class="center-custom">
    <v-stepper v-model="e6" vertical width="600" elevation="0">
      <v-stepper-step :complete="e6 > 1" step="1"> Bienvenida! </v-stepper-step>

      <v-stepper-content step="1">
        <v-card class="mb-12" height="100px">
          <v-card-text>
            Hola! Soy <strong style="color: #ee7d39">Cliente pruebas</strong> y
            te doy la bienvenida a mi tienda, por favor antes de pagar déjame
            saber tus datos para el envío de los productos. Gracias!
          </v-card-text>
        </v-card>
        <v-btn color="primary" @click="e6 = 2"> DE ACUERDO </v-btn>
        <!-- <v-btn text> Cancel </v-btn> -->
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">
        Datos Personales
        <small>Escribe los datos que irán adjunto a tu envío.</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card ref="form" class="mb-12" height="300px">
          <v-card-text>
            <v-text-field
              ref="name"
              v-model="name"
              :rules="[() => !!name || 'Ingresa tu Nombre']"
              :error-messages="errorMessages"
              label="Nombre"
              placeholder="John Doe"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              ref="lastname"
              v-model="lastname"
              :rules="[() => !!lastname || 'Ingresa tus Apellido']"
              :error-messages="errorMessages"
              label="Apellido"
              placeholder="Hudson Doe"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="E-Mail"
              placeholder="ejemplo@ejemplo.com"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              ref="tel"
              v-model="telefono"
              :rules="[
                () => !!telefono || 'Ingresa tu numero de telefono movil',
              ]"
              :error-messages="errorMessages"
              label="Telefono Movil"
              required
              placeholder="555 123 1234"
              outlined
              dense
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-btn color="primary" @click="validador1"> SIGUIENTE </v-btn>
        <v-btn text :disabled="!disable1" @click="e6 = 1">
          VOLVER AL PASO ANTERIOR
        </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">
        Dirección de residencia
        <small>Escribe la dirección donde llegará tu orden.</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card ref="form2" class="mb-12" height="300px">
          <v-card-text>
            <v-text-field
              ref="direccion"
              v-model="direccion"
              :rules="[() => !!direccion || 'Dirección requerida']"
              :error-messages="errorMessages"
              label="Direccion de envios"
              placeholder="9553 Lee Hwy"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="direccion_secundaria"
              label="Direccion secundaria"
              placeholder="9553 Lee Hwy"
              required
              outlined
              dense
            ></v-text-field>
            <v-text-field
              ref="codigo_postal"
              v-model="codigo_postal"
              :rules="[() => !!codigo_postal || 'ZIP Code requerido']"
              :error-messages="errorMessages"
              label="Codigo postal"
              required
              placeholder="22031"
              outlined
              dense
            ></v-text-field>
            <v-checkbox
              ref="confirmar_direccion"
              v-model="confirmar_direccion"
              label="Confirmo que esta es mi dirección"
            ></v-checkbox>
          </v-card-text>
        </v-card>
        <v-btn
          color="primary"
          :disabled="!confirmar_direccion"
          @click="validador2"
        >
          Continue
        </v-btn>
        <v-btn text :disabled="!disable1" @click="e6 = 2"> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 4" step="4">
        Checkout y recepción de Orden
        <small
          >Comprueba que todo esté bien y selecciona el modo de recepción de los
          productos.</small
        >
      </v-stepper-step>

      <v-stepper-content step="4">
        <v-card color="" class="mb-12" height="300px">
          <v-card-text style="overflow-y: auto; max-height: 140px">
            <v-list three-line>
              <v-list-item v-for="(item, index) in data" :key="index">
                <v-list-item-avatar rounded size="56">
                  <v-img :src="$root.cdn + item.images[0].url"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.name"></v-list-item-title>
                  <v-list-item-title
                    v-html="item.variant.sku"
                  ></v-list-item-title>
                  <v-list-item-title
                    v-html="'Tamaño:' + item.variant.size"
                  ></v-list-item-title
                  ><v-list-item-subtitle
                    v-html="item.variant.price"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <span>Si quieres que la orden sea entregada:</span>
            <v-radio-group v-model="ordenEntrega" column>
              <v-radio
                label="Por mi vendedora"
                color="primary"
                value="multivendor"
              ></v-radio>
              <v-radio
                label="En mi casa"
                color="primary"
                value="vendedor"
              ></v-radio>
            </v-radio-group>
          </v-card-actions>
        </v-card>
        <v-btn color="primary" @click="(e6 = 5), tasxes()"> Continue </v-btn>
        <v-btn text @click="e6 = 3"> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step step="5">
        Información de Pago
        <small>Selecciona el método de pago para los productos.</small>
      </v-stepper-step>

      <v-stepper-content step="5">
        <v-card color="" class="mb-12" height="200px">
          <v-card-text>
            <v-radio-group v-model="tipoPago" column>
              <v-radio label="Efectivo" color="primary" value="cash"></v-radio>
              <v-radio
                disabled
                label="Tarjeta de crédito"
                color="primary"
                value="tc"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
        <v-btn color="primary" @click="pagar"> Continue </v-btn>
        <v-btn text @click="e6 = 3"> Cancel </v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["data"],
  data() {
    return {
      e6: 1,
      ordenEntrega: null,
      tipoPago: null,
      errorMessages: "",
      name: null,
      lastname: null,
      email: null,
      telefono: null,
      formHasErrors: false,
      formHasErrors2: false,
      disable1: true,
      direccion: null,
      direccion_secundaria: null,
      codigo_postal: null,
      confirmar_direccion: false,
    };
  },
  computed: {
    form() {
      return {
        name: this.name,
        lastname: this.name,
        email: this.email,
        telefono: this.telefono,
      };
    },
    form2() {
      return {
        direccion: this.direccion,
        codigo_postal: this.codigo_postal,
        confirmar_direccion: this.confirmar_direccion,
      };
    },
  },
  watch: {
    name() {
      this.errorMessages = "";
    },
    codigo_postal() {
      this.errorMessages = "";
    },
    ordenEntrega() {
      this.tasxes();
    },
  },

  methods: {
    validador1() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) {
          this.formHasErrors = true;
        }

        if (this.$refs[f].validate(true)) {
          this.disable1 = false;
          this.e6 = 3;
        }
      });
    },
    validador2() {
      this.formHasErrors2 = false;

      Object.keys(this.form2).forEach((f) => {
        if (!this.form2[f]) {
          this.formHasErrors2 = true;
        }

        if (this.$refs[f].validate(true)) {
          this.disable2 = false;
          this.e6 = 4;
        }
      });
    },
    tasxes() {
      var url = "https://v3.tissini.app/api/v3/taxes";
      var arrayData = [];

      for (let index = 0; index < this.data.length; index++) {
        const category = this.data[index].category.category;
        const discount = 0;
        const id = this.data[index].category.id;
        const price = this.data[index].variant.price;
        const quantity = this.data[index].quantity;
        arrayData.push({
          category: category,
          discount: discount,
          id: id,
          price: price,
          quantity: quantity,
        });
      }
      axios
        .post(
          url,
          {
            products: arrayData,
            shoping: 0,
            state: "VA",
            zipcode: this.codigo_postal,
          },
          {
            headers: {
              "Referrer-Policy": "no-referrer",
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    pagar() {
      this.$emit("dialogPago", false);
      var amount = this.data
        .map((item) => item.variant.price)
        .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr), 0)
        .toFixed(2);
      const historyCostumer = JSON.parse(localStorage.getItem("emprendedora"));
      var client = {
        id: historyCostumer.id,
        user_id: historyCostumer.user_id,
        firstname: this.name,
        lastname: this.lastname,
        email: this.email,
        mobilephone: this.telefono,
        address1: this.direccion,
        address2: this.direccion_secundaria,
        zipcode: this.codigo_postal,
        created_at: historyCostumer.created_at,
        country: "US",
        state: historyCostumer.state,
        city: historyCostumer.city,
      };
      var firmaRequerida = false;
      var from = this.ordenEntrega;
      var products = this.data;
      var shipping_cost = 0;
      var tax = 16;
      var type = this.tipoPago;
      var url = "https://v3.tissini.app/api/v3/multivendor/paynow";
      axios
        .post(
          url,
          {
            amount: amount,
            client: client,
            customer: historyCostumer,
            firmaRequerida: firmaRequerida,
            from: from,
            products: products,
            shipping_cost: shipping_cost,
            tax: tax,
            type: type,
          },
          {
            headers: {
              "Referrer-Policy": "no-referrer",
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status == "payment_submitted") {
            this.$emit("pagoConfirm", false);
            localStorage.removeItem('cartProducts');
            // this.data = [];
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    validarCodigoPostal() {
      var url = "https://ziptasticapi.com/" + this.codigo_postal;

      axios
        .get(url, {
          headers: {
            "Referrer-Policy": "no-referrer",
            "Content-Type": "application/x-www-form-urlencoded",
            "Remote-Address": "[2606:4700:3034::6815:2222]:443",
            "expect-ct":
              'max-age=604800",report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
            expires: "Thu, 10 Mar 2022 21:49:45 GMT",
            nel: '{"success_fraction":0,"report_to":"cf-nel","max_age":604800}',
            "report-to":
              '{"endpoints":[{"url":"https:a.nel.cloudflare.com/report/v3?s=ZcjAZHdOXAe247T5E81dJ82O74twLJiLzJ0gZR9yNBH9Q83UBnrDVk38%2BltGrZBJz9HCo1wwfGKa0rKWMpgKbn79yfGkPVDrJABP4JC08MxyV2zwklYnvRZ%2BRs%2BELGvS3Ue%2F7ahRkGUPJr6mJoKb"}],"group":"cf-nel","max_age":604800}',

            var: "Accept-Encoding,User-Agent",
          },
        })
        .then((res) => {
          if (res) {
            this.disable2 = true;
          }
        })
        .catch((err) => {
          console.error(err);
        });
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
</style>
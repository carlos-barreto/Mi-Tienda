<template>
  <div>
    <div class="auth-wrapper auth-v2">
      <div class="auth-inner">
        <v-row class="auth-row ma-0">
          <v-col
            lg="8"
            class="d-none d-lg-block position-relative overflow-hidden pa-0"
          >
            <div class="auth-illustrator-wrapper">
              <!-- <img
                  src="../assets/base1.png"
                  alt=""
                  style="height: 322px;"
                  class="auth-mask-bg"
                /> -->
              <img
                style="height: 226px; width: 300px"
                src="../assets/base2.png"
                class="auth-tree"
              />
              <div class="d-flex align-center h-full pa-16 pe-0">
                <img
                  src="../assets/base3.png"
                  style="height: 692px; max-width: 100%"
                  alt=""
                />
              </div>
            </div>
          </v-col>
          <v-col lg="4" class="d-flex align-center auth-bg">
            <v-row>
              <v-col class="mx-auto" cols="12" lg="12" md="6" sm="8">
                <v-card flat elevation="3" class="rounded-xl">
                  <v-card-text>
                    <p class="text-2xl font-weight-semibold text--primary mb-2">
                      ¡Bienvenido a Mi Tienda! 👋🏻
                    </p>
                    <p class="mb-2">
                      Inicia sesión en tu cuenta y comienza la aventura.
                    </p>
                  </v-card-text>
                  <v-card-text>
                    <v-alert outlined type="warning" prominent border="left">
                      Correo electrónico del administrador: admin@materio.com /
                      Contraseña: admin Correo electrónico del cliente:
                      client@materio.com / Pase: cliente
                    </v-alert>
                  </v-card-text>
                  <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        v-model="mobilephone"
                        label="Tel"
                        required
                        outlined
                      ></v-text-field>
                      <v-checkbox label="Recuérdame"></v-checkbox>
                      <v-btn block color="primary" dark @click="send"
                        >ACCESO</v-btn
                      >
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,

    mobilephone: null,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    show1: false,
    password: "Password",
  }),
  created() {
    //this.send();
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    send() {
    //  localStorage.clear();
      this.$root.app_bar = true;
      const params = {
        mobilephone: 7865470213,
      };
      var url =
        "https://v3.tissini.app/api/v3/login/client?mobilephone=" +
        params.mobilephone;
      const config = {
        headers: {
          "Referrer-Policy": "no-referrer",
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      axios
        .post(url, config)
        .then((res) => {
          //console.log(res);
          const respuesta = res.data;

          localStorage.setItem(
            "emprendedora",
            JSON.stringify(respuesta.customer)
          );
        
            this.$router.push({ path: "/categorias" });
        
          
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
<style scoped>
.auth-wrapper.auth-v2 {
  align-items: flex-start;
}
.auth-wrapper {
  display: flex;
  min-height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  flex-basis: 100%;
  align-items: center;
}
.auth-wrapper.auth-v2 .auth-inner {
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  margin: 0;
}
.auth-wrapper.auth-v2 .auth-inner .brand-logo {
  /* text-decoration: unset; */
  position: absolute;
  top: 1.83rem;
  left: 2.5rem;
  z-index: 1;
}
.auth-wrapper.auth-v2 .auth-inner .auth-row .auth-illustrator-wrapper {
  width: 100%;
  height: 100%;
}
.auth-wrapper.auth-v2 .auth-inner .auth-row {
  height: 100%;
}
.auth-wrapper.auth-v2 .auth-inner .auth-mask-bg {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.auth-wrapper.auth-v2 .auth-inner .auth-tree {
  left: 0;
  left: 2.125rem;
  bottom: 2.688rem;
  position: absolute;
}
.position-relative {
  position: relative;
}
img {
  border-style: none;
}
.auth-wrapper.auth-v2 .auth-inner .auth-bg {
  background: #fff;
}
</style>
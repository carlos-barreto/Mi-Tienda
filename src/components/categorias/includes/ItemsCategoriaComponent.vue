<template>
  <div style="width: 100%">
    <v-card color="transparent" elevation="0" class="mx-auto" max-width="700">
      <v-row class="mb-6" justify="center" no-gutters>
        <v-col v-for="card in array_categories" :key="card.title" md="auto" class="mt-5">
         
          <div class="content-img1">
            <v-card style=" max-height: 100%">
              <v-img
                :src="$root.cdn + card.image + '?vuetify-preload'"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <v-card-title v-text="card.name"></v-card-title>
              </v-img>
            </v-card>
          </div>
          <v-row class="mt-3">
            <v-slide-group
              light
              class="icon-custom pa-0 mb-9"
              prev-icon="mdi-chevron-left-circle"
              next-icon="mdi-chevron-right-circle"
              show-arrows
              center-active
              style="height: 320px;"
            >
              <v-slide-item v-for="item in card.products" :key="item.id">
                <v-card
                @click="goCatalogo(item.category_id)"
                  rounded="xl"
                  elevation="3"
                  class="ma-3"
                  height="170"
                  style="margin: 6px 80px 6px 6px; height: 170px;"
                >
                  <img
                    class="rounded-xl"
                    style="height: 100%; width: 100%;"
                    :src="$root.cdn + item.images[0].url"
                  >
                  <v-card-actions class="px-2" style="flex-direction: column;">
                    <p class="truncate">
                      <strong>{{item.name}}</strong>
                    </p>
                    <p class="text-uppercase grey--text" style="font-size: 12px;">
                      <strong>{{item.categories.category}}</strong>
                    </p>
                    <p class="primary--text">
                      <strong>${{item.price}}</strong>
                    </p>
                  </v-card-actions>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  components: {

  },
  props: ["array_categories"],
  data() {
    return { 
     
    };
  },
  methods: {
    goCatalogo(id) {
      this.$router.push(
        "/catalogo/" + id
      );
      //window.open(routeData.href);
    }
  },
};
</script>


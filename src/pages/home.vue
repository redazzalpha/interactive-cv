<template>
  <article>
    <v-lazy :options="{ threshold: 1 }" transition="fade-transition">
      <v-container grid-list-xl>
        <!-- title row -->
        <v-row v-bind="rowBindings" style="margin: 0">
          <v-col>
            <h1 class="text-center text-lg-left">
              Concepteur développeur d'applications
            </h1>
            <DrawerList v-show="$vuetify.display.mobile" />
          </v-col>
        </v-row>

        <!-- code lines row -->
        <v-row v-bind="rowBindings" style="margin-top: 100px">
          <v-col v-bind="colBindings" lg="12">
            <TheCodeLines />
          </v-col>
        </v-row>

        <!-- technical stack row -->
        <v-row v-bind="rowBindings">
          <v-col v-bind="colBindings">
            <v-img
              src="@/assets/giphy.gif"
              max-width="550"
              class="rounded-lg"
            ></v-img>
          </v-col>
          <v-col v-bind="colBindings">
            <p class="text-h6 text-sm-h5 text-md-h4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-lazy>
  </article>
</template>

<script setup lang="ts">
//#region bindings
const colBindings = {
  class: "d-flex justify-center align-center",
  cols: "12",
  lg: "6",
};
const rowBindings = {
  style: "margin: 300px 0px",
};
//#endregion

//#endregion
</script>

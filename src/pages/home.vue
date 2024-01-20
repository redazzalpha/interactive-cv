import TheCodeLines from '@/components/TheCodeLines.vue';
<template>
  <article>
    <v-container grid-list-xs>
      <!-- title row -->
      <v-row>
        <v-col>
          <h1>Lorem ipsum dolor sit amet</h1>
          <DrawerList v-show="$vuetify.display.mobile" />
        </v-col>
      </v-row>

      <!-- code lines row -->
      <v-row>
        <v-col cols="12" class="pa-0 d-flex justify-center">
          <TheCodeLines />
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

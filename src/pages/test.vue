<template>
  <article>
    <v-container grid-list-xs class="pa-0">
      <v-row>
        <v-col>
          <h1>Page test in construction</h1>
          <Animated3DModel :id="id" :model3d="model3D" />
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import Animated3DModel from "@/components/Animated3DModel.vue";

//#region variables
const id = "test-3D-computer";
const model3D = "/3D/laptop.glb";
//#endregion
</script>

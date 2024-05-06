<template>
  <v-card>
    <v-container v-bind="containerBindings">
      <!-- animated title -->
      <v-row>
        <v-col>
          <AnimatedTitle
            v-show="!$vuetify.display.mobile"
            id="title-about"
            tag="h1"
            :text="title"
            v-bind="animatedTitleBindings"
            style="position: fixed"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
import {
  animatedTitleBindings,
  containerBindings,
} from "@/utils/objectBindings";

//#region
const title: string = "Fun art";
//#endregioin
</script>

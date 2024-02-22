<template>
  <AppDrawer tag="aside">
    <!-- title slot -->
    <template v-slot:title>
      <v-container grid-list-xs fluid>
        <v-row>
          <v-col>
            <p class="text-center text-h5">Nessoumou Wilfried</p>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!-- avatar container -->
    <v-container class="pa-0 ma-0">
      <v-row>
        <v-col class="pa-0">
          <!-- avatar -->
          <AnimatedAvatar
            id="avatar-drawer"
            :image="store.avatar"
            :size="170"
            mail="willness@outlook.fr"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- links slot -->
    <template v-slot:links>
      <div class="text-center mt-5">
        <v-btn icon variant="plain" :href="store.githubDataUrl">
          <v-icon icon="mdi-github" size="50"></v-icon
        ></v-btn>
      </div>
    </template>

    <!-- text slot -->
    <template v-slot:text>
      <v-container grid-list-xs fluid class="mt-5">
        <v-row>
          <v-col>
            <p class="text-center">
              Titulaire d'une certification de niveau VI (bac+3/4) en tant que
              concepteur et développeur d'applications je suis passionné par les
              nouvelles technologies.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppDrawer>
</template>

<script setup lang="ts">
import AppDrawer from "@/components/AppDrawer.vue";
import AnimatedAvatar from "@/components/AnimatedAvatar.vue";
import { useAppStore } from "@/store/app";
const store = useAppStore();
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Kalam&display=swap");
p {
  font-family: "Kalam", cursive;
}
</style>

<template>
  <v-navigation-drawer location="right" v-model="drawer">
    <DrawerList />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref<boolean | null>(false);
</script>

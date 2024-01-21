<template>
  <v-navigation-drawer
    location="right"
    disable-resize-watcher
    :model-value="useAppStore().drawer"
  >
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";
</script>

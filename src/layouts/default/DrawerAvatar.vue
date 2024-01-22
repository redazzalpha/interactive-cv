<template>
  <AppDrawer tag="aside">
    <!-- avatar -->
    <AppAvatar :image="Avatar" mail="willness@outlook.fr" :size="170" />
  </AppDrawer>
</template>

<script setup lang="ts">
import Avatar from "@/assets/wolf.jpg";
</script>

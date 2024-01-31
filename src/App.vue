<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
window.onbeforeunload = function () {
  return "Do you really want to close?";
};
</script>

<style lang="scss">
.v-application__wrap {
  overflow-x: hidden;
}
</style>

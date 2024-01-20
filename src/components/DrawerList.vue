<template>
  <v-list class="mt-15">
    <!-- avatar item -->
    <v-list-item v-bind="listItemBindings">
      <v-avatar size="170" image="@/assets/wolf.jpg"></v-avatar>
    </v-list-item>

    <!-- mail item -->
    <v-list-item v-bind="listItemBindings">
      <a href="mailto:willness@outlook.fr">willness@outlook.fr</a>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
//#region bindings
const listItemBindings = {
  class: "d-flex justify-center",
};
//#endregion
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>

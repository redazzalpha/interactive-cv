<template>
  <v-list class="mt-15">
    <!-- avatar item -->
    <v-list-item v-bind="listItemBindings">
      <v-avatar :size="props.size" :image="props.image"></v-avatar>
    </v-list-item>

    <!-- mail item -->
    <v-list-item v-bind="listItemBindings">
      <a :href="`mailto:${props.mail}`">{{ props.mail }}</a>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
//#region bindings
const listItemBindings = {
  class: "d-flex justify-center",
};
//#endregion

//#region props
interface Props {
  image: string;
  size?: number;
  mail?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 170,
});
//#endregion
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>

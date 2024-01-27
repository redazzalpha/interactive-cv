<template>
  <v-list>
    <!-- avatar item -->
    <v-list-item v-bind="listItemBindings">
      <a href="mailto:willness@outlook.fr">
        <v-avatar :size="props.size" :image="props.image"></v-avatar>
      </a>
    </v-list-item>

    <!-- mail item -->
    <v-list-item v-bind="listItemBindings">
      <a :href="`mailto:${props.mail}`" class="text-decoration-underline">{{
        props.mail
      }}</a>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
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

//#region bindings
const listItemBindings: Binding = {
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

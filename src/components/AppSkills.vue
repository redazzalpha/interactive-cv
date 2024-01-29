<template>
  <v-img
    id="skills"
    :src="props.image"
    max-width="700"
    style="opacity: 0"
  ></v-img>
</template>

<script setup lang="ts">
//#region props
interface Props {
  image: string;
}
const props = defineProps<Props>();
//#endregion
</script>

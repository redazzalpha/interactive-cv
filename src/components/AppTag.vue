<template>
  <v-sheet>
    <!-- chevron left -->
    <v-icon
      class="icon"
      icon="mdi-chevron-left"
      :size="props.sizeChevron"
      style="position: relative; left: 10px"
      :color="props.visible ? 'white' : 'transparent'"
    ></v-icon>

    <!-- content -->
    <slot> </slot>

    <!-- slash -->
    <v-icon
      class="icon"
      icon="mdi-slash-forward"
      :size="props.sizeSlash"
      :color="props.visible ? 'white' : 'transparent'"
    ></v-icon>

    <!-- chevron right -->
    <v-icon
      class="icon"
      icon="mdi-chevron-right"
      :size="props.sizeChevron"
      style="position: relative; right: 20px"
      :color="props.visible ? 'white' : 'transparent'"
    ></v-icon>
    <br />
  </v-sheet>
</template>

<script setup lang="ts">
//#region props
interface Props {
  sizeChevron?: number;
  sizeSlash?: number;
  visible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  sizeChevron: 40,
  sizeSlash: 30,
  visible: true,
});
//#endregion
</script>

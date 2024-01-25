<template>
  <div class="glow" v-bind="glowBindings"></div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from "vue";

//#region props
interface Props {
  width?: number;
  height?: number;
  color?: string;
  unsetWidth?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  width: 0,
  height: 0,
  color: "#0ff",
  unsetWidth: false,
});
//#endregion

//#region computed
const computedWidth = computed<string>(() => {
  if (props.unsetWidth) return "unset";
  else return `${props.width}px`;
});
//#endregion

//#region bindings
const glowBindings: Ref<Binding> = ref({
  style: `width: ${computedWidth.value};\
    height: ${props.height}px;\
    border-radius: 50%;\
    background-color: ${props.color};\
    box-shadow: 0px 0px 50px 30px ${props.color}`,
});

//#endregion
</script>

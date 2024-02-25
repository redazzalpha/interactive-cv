<template>
  <!-- main model container -->
  <div>
    <!-- buttons actions -->
    <v-card-actions v-show="showAction && isReady" :style="computedActionStyle">
      <v-btn
        variant="outlined"
        class="text-lowercase px-8"
        rounded="xl"
        @click="close"
        >close</v-btn
      >
      <v-btn
        variant="outlined"
        class="text-lowercase px-8"
        rounded="xl"
        @click="open"
        >open</v-btn
      >
    </v-card-actions>

    <!-- 3D model container -->
    <div
      :id="props.id"
      style="position: relative; top: 30px; height: 615px"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, computed } from "vue";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import vuetify from "@/plugins/vuetify";

//#region exported types
export interface Animations {
  [index: string]: THREE.AnimationAction;
}
//#endregion

//#region props
interface Props {
  id: string;
  model3d: string;
  isstart?: boolean;
  showAction?: boolean;
  scrollLimit?: number;
}
const props = withDefaults(defineProps<Props>(), {
  isstart: true,
  showAction: true,
  scrollLimit: 0,
});
//#endregion

//#region refs
const isReady = ref<boolean>(false);
//#endregion

//#region computed
const computedActionStyle = computed<string>(() => {
  let leftValue: number = 0;

  switch (vuetify.display.name.value) {
    case "xs":
      leftValue = 0;
      break;
    case "sm":
      leftValue = 0;
      break;
    case "md":
      leftValue = 0;
      break;
    case "lg":
      leftValue = 350;
      break;
    case "xl":
      leftValue = 350;
      break;
    case "xxl":
      leftValue = 0;
      break;
    default:
      leftValue = 0;
      break;
  }

  return `position: absolute; left: ${leftValue}px`;
});
//#endregion

//#region variables
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const loader = new GLTFLoader();
const clock = new THREE.Clock();
const animations: Animations = {};

let model3D = ref<GLTF>();
let camera: THREE.PerspectiveCamera;
let mixer: THREE.AnimationMixer;
let frameId = 0;
let isOpen = false;
let isClosed = false;
let isScrolling = true;
//#endregion

//#region functions
function load3DModel(): HTMLCanvasElement {
  // load 3D model
  loader.load(
    // model path
    props.model3d,
    // onload
    (gltf) => initGltfScene(gltf),
    // onprogress
    (/*xhr*/) => {
      /**console.log((xhr.loaded / xhr.loaded) * 100 + "% loaded") */
    },
    // onerror
    (error) => console.error(`An error happened: ${error}`)
  );
  return renderer.domElement;
}
function initGltfScene(gltf: GLTF): void {
  model3D.value = gltf;

  setCamera();
  setAnimations();

  scene.add(gltf.scene);

  render();
  if (props.scrollLimit > 0) addEventListener("scroll", onScroll);
  else start();
}
function setCamera() {
  camera = model3D.value!.cameras[0] as THREE.PerspectiveCamera;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
function setAnimations() {
  let i = 0;
  mixer = new THREE.AnimationMixer(model3D.value!.scene);
  model3D.value!.animations.forEach((item: THREE.AnimationClip) => {
    item.name;
    animations[item.name] = initAnimation(i++);
  });

  animations["entrance"].play();
}
function initAnimation(index: number): THREE.AnimationAction {
  const animation = mixer.clipAction(model3D.value!.animations[index]);
  animation.clampWhenFinished = true;
  animation.repetitions = 1;
  return animation;
}
function render(): void {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);
}
function close() {
  if (isReady.value && isOpen) {
    animations["entrance"].stop();
    animations["open"].stop();
    animations["close"].play();
    isOpen = false;
    isClosed = true;
  }
}
function open() {
  if (isReady.value && isClosed) {
    animations["entrance"].stop();
    animations["close"].stop();
    animations["open"].play();
    isClosed = false;
    isOpen = true;
  }
}
function start(): void {
  frameId = requestAnimationFrame(start);
  if (!animations["entrance"].isRunning()) {
    isReady.value = true;
    isOpen = true;
  }

  mixer.update(clock.getDelta());
  renderer.render(scene, camera);
}
//#endregion

//#region event handlers
function onResize(): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  render();
}
function onScroll(): void {
  if (isScrolling && scrollY >= props.scrollLimit) {
    start();
    isScrolling = false;
  }
}
//#endregion

//#region hooks
onMounted(() => {
  const container = document.getElementById(props.id);
  container?.appendChild(load3DModel());

  addEventListener("resize", onResize, false);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
});
//#endregion
</script>

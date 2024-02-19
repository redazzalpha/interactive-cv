<template>
  <div>
    <v-card-actions v-show="isReady" style="position: absolute">
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
    <div
      :id="props.id"
      style="position: relative; top: 30px; height: 615px"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//#region export interfaces
export interface Model3DExposed {
  model3D: GLTF;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  animate: () => void;
  stopAnimate: () => void;
}
//#endregion

//#region props
interface Props {
  id: string;
  model3d: string;
  animationIndex: number;
  isAnimate?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isAnimate: true,
});
//#endregion

//#region refs
const isReady = ref<boolean>(false);
//#endregion

//#region variables
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const clock = new THREE.Clock();
const loader = new GLTFLoader();

let camera: THREE.PerspectiveCamera;
let mixer: THREE.AnimationMixer;
let animationAction: THREE.AnimationAction;
let animationAction1: THREE.AnimationAction;
let animationAction2: THREE.AnimationAction;
let frameId = 0;
let model3D = ref<GLTF>();
let isOpen = false;
let isClosed = false;
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
  animate();
}
function setCamera() {
  camera = model3D.value!.cameras[0] as THREE.PerspectiveCamera;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
function setAnimations() {
  mixer = new THREE.AnimationMixer(model3D.value!.scene);
  animationAction = initAnimation(0);
  animationAction1 = initAnimation(1);
  animationAction2 = initAnimation(2);

  animationAction.play();
}
function initAnimation(index: number): THREE.AnimationAction {
  const animation = mixer.clipAction(model3D.value!.animations[index]);
  animation.clampWhenFinished = true;
  animation.repetitions = 1;
  return animation;
}
function close() {
  if (isReady.value && isOpen) {
    animationAction.stop();
    animationAction2.stop();
    animationAction1.play();
    isOpen = false;
    isClosed = true;
  }
}
function open() {
  if (isReady.value && isClosed) {
    animationAction.stop();
    animationAction1.stop();
    animationAction2.play();
    isClosed = false;
    isOpen = true;
  }
}
function render(): void {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);
}
function animate(): void {
  frameId = requestAnimationFrame(animate);
  if (animationAction.isRunning()) {
    // mixer.update(clock.getDelta());
    // renderer.render(scene, camera);
  } else {
    isReady.value = true;
    isOpen = true;
    // cancelAnimationFrame(frameId);
  }

  mixer.update(clock.getDelta());
  renderer.render(scene, camera);
}
//#endregion

//#region event handlers
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  render();
}
//#endregion

//#region define exposed
defineExpose({ animate, model3D, scene, renderer });
//#endregion

//#region hooks
onMounted(() => {
  addEventListener("resize", onResize, false);

  const container = document.getElementById(props.id);
  container?.appendChild(load3DModel());
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
});
//#endregion
</script>

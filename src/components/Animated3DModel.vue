<template>
  <div
    :id="props.id"
    style="position: relative; top: 30px; height: 615px"
  ></div>
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
  isAnimate?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isAnimate: true,
});
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
let ready = false;
let frameId = 0;
let model3D = ref<GLTF>();
//#endregion

//#region functions
function setCamera(gltf: GLTF) {
  camera = gltf.cameras[0] as THREE.PerspectiveCamera;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // camera.position.z += 5;
}
function setAnimation(gltf: GLTF) {
  mixer = new THREE.AnimationMixer(gltf.scene);
  animationAction = mixer.clipAction(gltf.animations[0]);
  // animationAction1 = mixer.clipAction(gltf.animations[1]);
  // animationAction2 = mixer.clipAction(gltf.animations[2]);

  animationAction.play();
  // animationAction1.play();
  // animationAction2.play();
  animationAction.paused = true;
  ready = true;
}
function render(): void {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);
}
function initGltfScene(gltf: GLTF): void {
  console.log(gltf);

  model3D.value = gltf;

  setCamera(gltf);
  setAnimation(gltf);

  scene.add(gltf.scene);

  render();
  animate();
}
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
function animate(): void {
  frameId = requestAnimationFrame(animate);
  if (ready) {
    console.log("ready");
    mixer.update(clock.getDelta());
    animationAction.paused = false;
  }
  // render();
  renderer.render(scene, camera);
}
function stopAnimate(): void {
  cancelAnimationFrame(frameId);
  animationAction.paused = true;
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
defineExpose({ animate, stopAnimate, model3D, scene, renderer });
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

<style lang="scss" scoped>
canvas {
  border: solid blue 3px;
}
</style>

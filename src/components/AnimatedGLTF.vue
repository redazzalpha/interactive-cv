<template>
  <div :id="props.id" :style="`height: ${props.height}px`"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//#region interfaces
export interface Animations {
  [index: string]: THREE.AnimationAction;
}
export interface AnimationsModel {
  animations: Animations;
  update: () => void;
  stopAll: () => void;
}
interface Emits {
  (ready: string, animations: AnimationsModel): void;
  (finishAction: string, action: string): void;
  (error: string, value: string): void;
}
const emit = defineEmits<Emits>();
//#endregion

//#region props
interface Props {
  id: string;
  gltf: string;
  height?: number;
}
const props = withDefaults(defineProps<Props>(), {
  height: 500,
});
//#endregion

//#region variables
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
const loader = new GLTFLoader();
const clock = new THREE.Clock();
const animationModel: AnimationsModel = {
  animations: {},
  update: () => {},
  stopAll: () => {},
};

let model3D = ref<GLTF>();
let camera: THREE.PerspectiveCamera;
let mixer: THREE.AnimationMixer;
//#endregion

//#region functions
function load3DModel(): HTMLCanvasElement {
  // load 3D model
  loader.load(
    // gltf path
    props.gltf,
    // onload
    (gltf) => initGltfScene(gltf),
    // onprogress
    (/*xhr*/) => {
      /**console.log((xhr.loaded / xhr.loaded) * 100 + "% loaded") */
    },
    // onerror
    (error) => emit("error", `${error}`)
  );
  return renderer.domElement;
}
function initGltfScene(gltf: GLTF): void {
  model3D.value = gltf;
  setCamera();
  setAnimations();
  setEnvironment();
  scene.add(gltf.scene);
}
function setEnvironment(): void {
  // important part of the threejs scene
  // this code sets environment which
  // provides baselight

  // TODO: add a props to get images from client to decouple component
  new THREE.CubeTextureLoader().load(
    [
      "3D/environnement/px.png",
      "3D/environnement/px.png",
      "3D/environnement/px.png",
      "3D/environnement/px.png",
      "3D/environnement/px.png",
      "3D/environnement/px.png",
    ],
    (environmentMap: THREE.CubeTexture) => {
      scene.environment = environmentMap;
      render();
      emit("ready", animationModel);
    }
  );
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
    animationModel.animations[item.name] = initAnimation(i++);
  });
  animationModel.update = update;
  animationModel.stopAll = stopAll;

  mixer.addEventListener("finished", (e) => {
    emit("finishAction", e.action.getClip().name);
  });
}
function initAnimation(index: number): THREE.AnimationAction {
  const animation = mixer.clipAction(model3D.value!.animations[index]);
  animation.clampWhenFinished = true;
  animation.repetitions = 1;
  return animation;
}
function render(): void {
  // if (vuetify.display.name.value == "xs")
  //   renderer.setSize(window.innerWidth / 1.25, window.innerHeight / 1.25);
  // else renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);
}
function update(): void {
  mixer.update(clock.getDelta());
  render();
}
function stopAll(): void {
  mixer.stopAllAction();
  render();
}
//#endregion

//#region event handlers
function onResize(): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  render();
}
//#endregion

//#region hooks
onMounted(() => {
  const container = document.getElementById(props.id);
  container?.appendChild(load3DModel());

  addEventListener("resize", onResize, false);
});
//#endregion
</script>

<style lang="scss" scoped></style>

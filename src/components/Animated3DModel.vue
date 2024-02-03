<template>
  <div :id="props.id"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//#region props
interface Props {
  id: string;
  model3d: string;
  width?: number;
  height?: number;
}
const props = withDefaults(defineProps<Props>(), {
  width: window.innerWidth,
  height: window.innerHeight,
});
//#endregion

//#region variables
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const clock = new THREE.Clock();
const loader = new GLTFLoader();

let mixer: THREE.AnimationMixer;
let animationAction: THREE.AnimationAction;
let ready = false;
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
  mixer = new THREE.AnimationMixer(gltf.scene);
  animationAction = mixer.clipAction(gltf.animations[0]);
  scene.add(gltf.scene);
  gltf.scene.rotation.x = 0.5;
  camera.position.z = 5;
  ready = true;

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  animate();
}
function animate() {
  requestAnimationFrame(animate);
  if (ready) {
    animationAction.play();
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera);
}
//#endregion

//#region event handlers
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}
//#endregion

//#region hooks
onMounted(() => {
  addEventListener("resize", onResize, false);

  const container = document.getElementById(props.id);
  container?.appendChild(load3DModel());
});
//#endregion
</script>

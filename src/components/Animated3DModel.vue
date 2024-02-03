<template>
  <div :id="props.id"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//#region props
interface Props {
  id: string;
}
const props = defineProps<Props>();
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
function foo(): HTMLCanvasElement {
  const container = document.getElementById(props.id);

  // load 3D model
  loader.load(
    "/3D/laptop.glb",
    (glb) => {
      mixer = new THREE.AnimationMixer(glb.scene);
      animationAction = mixer.clipAction(glb.animations[0]);
      scene.add(glb.scene);
      glb.scene.rotation.x = 0.5;
      camera.position.z = 5;
      ready = true;

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
      container?.appendChild(renderer.domElement);

      animate();
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.loaded) * 100 + "% loaded");
    },
    (error) => {
      console.log(`An error happened: ${error}`);
    }
  );

  return renderer.domElement;
}
function animate() {
  requestAnimationFrame(animate);
  if (ready) {
    animationAction.play();
    mixer.update(clock.getDelta());
  }

  renderer.render(scene, camera);
}
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

  foo();
});
//#endregion
</script>

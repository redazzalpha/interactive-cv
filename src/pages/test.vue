<template>
  <article>
    <v-container grid-list-xs class="pa-0">
      <v-row>
        <v-col>
          <h1>Page test in construction</h1>
          <div id="the-container"></div>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//#region variables
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const renderer = new THREE.WebGLRenderer();
const loader = new GLTFLoader();

let mixer: THREE.AnimationMixer;
let animationAction: THREE.AnimationAction;
const clock = new THREE.Clock();
let ready = false;

//#endregion

//#region functions
function foo(): HTMLCanvasElement {
  const container = document.getElementById("the-container");

  loader.load(
    "/3D/laptop.glb",
    (glb) => {
      scene.add(glb.scene);
      camera.position.z = 5;
      glb.scene.rotation.x = 0.5;

      mixer = new THREE.AnimationMixer(glb.scene);
      animationAction = mixer.clipAction(glb.animations[0]);

      renderer.render(scene, camera);
      ready = true;
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.loaded) * 100 + "% loaded");
    },
    (error) => {
      console.log(`An error happened: ${error}`);
    }
  );

  renderer.setSize(window.innerWidth, window.innerHeight);
  container?.appendChild(renderer.domElement);
  animate();

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
//#endregion

//#region hooks
onMounted(() => {
  foo();
});
//#endregion
</script>

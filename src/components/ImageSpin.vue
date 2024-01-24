<template>
  <v-sheet v-bind="sheetBindings">
    <div id="container" v-bind="containerBindings">
      <v-img
        id="giphy"
        :src="ImgGiphy"
        v-bind="imgBindings"
        style="position: relative; opacity: 0"
      ></v-img>
      <v-img
        id="spinner"
        :src="ImgSpin"
        v-bind="imgBindings"
        style="position: absolute; opacity: 1"
      ></v-img>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import * as dynamics from "dynamics.js";
import { onMounted, ref } from "vue";
import ImgSpin from "@/assets/spinner.png";
import ImgGiphy from "@/assets/giphy.gif";

//#region variables
let spinning: boolean = true;
const timeout: number = 3000;
//#endregion

//#region bindings
const sheetBindings = {
  id: "sheet_image-spin",
  style:
    "width: fit-content;\
    position: relative;",
};
const containerBindings = ref({
  style: "width: 550px;",
});
const imgBindings = ref({
  style:
    "width: 550px;\
    top: 0;\
    border-radius: 15px;",
});
//#endregion

//#region animation functions
function breath(element: HtmlItem): void {
  const init = { scale: 1 };
  const shrink = { scale: 0.1 };
  const type: unknown = dynamics.bezier;
  const duration: number = 800;
  const points = [
    { x: 0, y: 0, cp: [{ x: 0.96, y: -0.133 }] },
    {
      x: 0.841,
      y: 0.647,
      cp: [
        { x: 0.741, y: 0.647 },
        { x: 0.963, y: 0.621 },
      ],
    },
    { x: 1, y: 1, cp: [{ x: 0.9, y: 1 }] },
  ];

  dynamics.css(element, init);
  dynamics.animate(element, shrink, {
    type,
    duration,
    points,
    complete: () => {
      dynamics.animate(element, init, { type, duration, points });
    },
  });
}
function ghost([willAppear, willDisappear]: [HtmlItem, HtmlItem]): void {
  const init = { opacity: 0, scale: 0 };
  const appear = { opacity: 1, scale: 1 };
  const disappear = { opacity: 0 };
  const type: unknown = dynamics.bezier;
  const duration: number = 1500;
  const points = [
    { x: 0, y: 0, cp: [{ x: 0.96, y: -0.133 }] },
    {
      x: 0.841,
      y: 0.647,
      cp: [
        { x: 0.741, y: 0.647 },
        { x: 0.963, y: 0.621 },
      ],
    },
    { x: 1, y: 1, cp: [{ x: 0.9, y: 1 }] },
  ];

  // initialization will appear element
  dynamics.css(willAppear, init);

  // will appear element animate
  dynamics.animate(willAppear, appear, {
    type,
    duration,
    points,
  });

  // will disappear element animate
  dynamics.animate(willDisappear, disappear, {
    type,
    duration,
    points,
    complete: () => (spinning = false),
  });
}
function spin(element: HtmlItem): void {
  const init = { rotateZ: 0 };
  const rotation = { rotateZ: 179 };
  const type = dynamics.linear;
  const duration = 300;

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, rotation, {
    type,
    duration,
    complete: () => {
      if (spinning) spin(element);
      else {
        dynamics.css(element, init);
      }
    },
  });
}
//#endregion

//#region hooks
onMounted(() => {
  setTimeout(() => {
    const sheet: HtmlItem = document.getElementById("sheet_image-spin");
    const spinner: HtmlItem = document.getElementById("spinner");
    const giphy: HtmlItem = document.getElementById("giphy");
    const container: HtmlItem = document.getElementById("container");

    ghost([giphy, spinner]);
    spin(sheet);
    breath(container);
  }, timeout);
});
//#endregion
</script>

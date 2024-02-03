<template>
  <v-sheet :id="props.idSheet" v-bind="sheetBindings">
    <!-- container -->
    <div :id="props.idContainer">
      <!-- image appear -->
      <v-img
        :id="props.idImage"
        :src="props.imageAppear"
        style="border-radius: 15px; opacity: 0"
      ></v-img>

      <!-- image spinner -->
      <v-img
        :id="props.idSpinner"
        :src="props.imageSpinner"
        v-bind="imgBindings"
        style="opacity: 1"
      ></v-img>

      <!-- image glow -->
      <v-img
        :id="props.idGlow"
        :src="props.imageGlow"
        v-bind="imgBindings"
        style="opacity: 0"
      ></v-img>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import * as dynamics from "dynamics.js";

//#region props
interface Props {
  idSheet: string;
  idSpinner: string;
  idImage: string;
  idContainer: string;
  idGlow: string;
  disabled?: boolean;
  imageSpinner: string;
  imageAppear: string;
  imageGlow: string;
  animateScrollLimite: number;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  animateScrollLimite: 0,
});
//#endregion

//#region variables
let spinning: boolean = true;
let scrolling: boolean = true;
//#endregion

//#region bindings
const sheetBindings: Binding = {
  style:
    "width: 100%;\
    background-color: transparent;\
    position: relative;",
};
const imgBindings: Ref<Binding> = ref({
  style:
    "width: 100%;\
    border-radius: 15px;\
    position: absolute;\
    top: 0;\
    left: 0; ",
});
//#endregion

//#region event handlers
function onScroll(): void {
  if (scrolling && scrollY >= props.animateScrollLimite) {
    imgSpin();
    scrolling = false;
  }
}
//#endregion

//#region animation functions
// low level animations
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

  // intialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, shrink, {
    type,
    duration,
    points,
    complete: () => {
      dynamics.animate(element, init, {
        type,
        duration,
        points,
      });
    },
  });
}
function ghost([willAppear, willDisappear]: [HtmlItem, HtmlItem]): void {
  const init = { opacity: 0, scale: 0 };
  const appear = { opacity: 1, scale: 1 };
  const disappear = { opacity: 0 };
  const type: unknown = dynamics.bezier;
  const duration: number = 1300;
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
function blur(element: HtmlItem): void {
  const init = { opacity: 0 };
  const appear = { opacity: 0.9 };
  const type: unknown = dynamics.bezier;
  const duration: number = 500;
  const delay = 350;
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

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, appear, {
    type,
    points,
    duration,
    delay,
    complete: () => {
      dynamics.animate(element, init, { type, points, duration });
    },
  });
}

// top level animations
function imgSpin(): void {
  if (!props.disabled) {
    const sheet: HtmlItem = document.getElementById(props.idSheet);
    const spinner: HtmlItem = document.getElementById(props.idSpinner);
    const image: HtmlItem = document.getElementById(props.idImage);
    const container: HtmlItem = document.getElementById(props.idContainer);
    const glow: HtmlItem = document.getElementById(props.idGlow);
    const ready: boolean =
      sheet != null &&
      spinner != null &&
      image != null &&
      container != null &&
      glow != null;

    if (ready) {
      ghost([image, spinner]);
      spin(sheet);
      blur(glow);
      breath(container);
    }
  }
}
//#endregion

//#region hooks
onMounted(() => {
  addEventListener("scroll", onScroll);
});
//#endregion
</script>

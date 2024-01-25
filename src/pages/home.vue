<template>
  <article>
    <AppGlow :unset-width="true" />

    <v-container grid-list-xs class="pa-0">
      <!-- title row -->
      <v-row :style="rowMargin" style="margin: 0">
        <v-col>
          <h1 id="title" class="text-center text-lg-left">
            Concepteur développeur d'applications
          </h1>

          <!-- avatar mobile -->
          <AppAvatar
            :image="AvatarImg"
            :size="170"
            mail="willness@outlook.fr"
            v-show="$vuetify.display.mobile"
          />
        </v-col>
      </v-row>

      <!-- code lines row -->
      <v-row :style="titleMargin">
        <v-col>
          <TheCodeLines />
        </v-col>
      </v-row>

      <!-- technical stack row -->
      <v-row :style="rowMargin">
        <v-col v-bind="colBindings">
          <ImageSpin :image-spinner="ImgSpinner" :image-appear="ImgGiphy" />
        </v-col>
        <v-col v-bind="colBindings">
          <p class="text-h6 text-sm-h5 text-xl-h4">
            C/C++, C#, JAVA, Javascript, TypeScript, HTML5, CSS3, Scss, Kotlin,
            SQL, NoSQL<br />
            Bootstrap, JQuery, VueJs, Vuetify, Flutter, Spring Boot, ADO.net,
            WPF.NET, Xaml, Web ASP.NET MVC, Java JPA-Hibernate, Xamarin,
            ReactJs, React native, NodeJs, git, Script Bash, Modélisation 3D,
            ...<br />
          </p>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import vuetify from "@/plugins/vuetify";
import AvatarImg from "@/assets/wolf.jpg";
import ImgSpinner from "@/assets/spinner.png";
import ImgGiphy from "@/assets/giphy.gif";
import * as dynamics from "dynamics.js";

//#region variables
let spinning: boolean = true;
let scrolling: boolean = true;
//#endregion

//#region computed
const titleMargin = computed<string>(() => {
  return `margin: ${vuetify.display.mobile.value ? 40 : 100}px 0px`;
});
const rowMargin = computed<string>(() => {
  return `margin: ${vuetify.display.mobile.value ? 40 : 300}px 0px`;
});
//#endregion

//#region bindings
const colBindings: Binding = {
  class: "d-flex justify-center align-center",
  cols: "12",
  lg: "6",
};
//#endregion

//#region event handlers
function onScroll(): void {
  if (scrolling && scrollY >= 720) {
    imgSpin();
    scrolling = false;
  }
}
//#endregion

//#region animation functions
// low level animations
function bounce(element: HtmlItem): void {
  const init = { scale: 0 };
  const grow = { scale: 1 };
  const type = dynamics.spring;
  const delay = 800;

  // initialize element's css
  dynamics.css(element, init);

  // animate element
  dynamics.animate(element, grow, {
    type,
    delay,
  });
}
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
  const appear = { opacity: 0.8 };
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
function writeCode(codeElements: NodeListOf<Element>) {
  const appear = { scale: 1 };
  const type = dynamics.spring;
  const friction = 1000;
  const duration = 1;
  const offset: number = 100;
  let count: number = 0;

  codeElements.forEach((code: Element): void => {
    dynamics.animate(code, appear, {
      type,
      friction,
      duration,
      delay: count * offset,
    });
    count++;
  });
}

// top level animations
function handWrite(
  background: HtmlItem,
  codeElements: NodeListOf<Element>
): void {
  const init = { scale: 0 };
  const appear = { scale: 1 };
  const type = dynamics.spring;
  const delay = 1500;

  // initialize elements's css
  dynamics.css(background, init);
  dynamics.css(codeElements, init);

  // animate elements
  dynamics.animate(background, appear, {
    type,
    delay,
    complete: () => writeCode(codeElements),
  });
}
function imgSpin(): void {
  const sheet: HtmlItem = document.getElementById("sheet_image-spin");
  const spinner: HtmlItem = document.getElementById("spinner");
  const image: HtmlItem = document.getElementById("image");
  const container: HtmlItem = document.getElementById("container");
  const glow: HtmlItem = document.getElementById("glow");

  ghost([image, spinner]);
  spin(sheet);
  blur(glow);
  breath(container);

  // setTimeout(() => {}, timeout);
}
//#endregion

//#region hooks
onMounted(() => {
  onscroll = onScroll;

  const title: HtmlItem = document.getElementById("title");
  const sheet: HtmlItem = document.getElementById("sheet_code-lines");
  const codeElements: NodeListOf<Element> = document.querySelectorAll(".code");
  bounce(title);
  handWrite(sheet, codeElements);
});
//#endregion
</script>

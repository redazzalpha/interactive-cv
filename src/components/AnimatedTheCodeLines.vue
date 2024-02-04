<template>
  <v-sheet :id="props.idSheet" v-bind="sheetBindings" :style="computedSize">
    <!-- line numbers container-->
    <div v-bind="lineNumbersContainerBindings">
      <!-- line numbers -->
      <div v-bind="lineNumbersBinding">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
        <p>12</p>
        <p>13</p>
        <p>14</p>
        <p>15</p>
        <p>16</p>
        <p>17</p>
        <p>18</p>
      </div>
      <!-- vertical line -->
      <div v-bind="verticalLine"></div>
    </div>

    <!-- code lines container  -->
    <div>
      <!-- template tag -->
      <div :class="containerClass">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode" v-bind="textBlue">{{ template }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>

      <!-- v-container tag -->
      <div :class="containerClass" v-bind="ml3">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode" v-bind="textTeal">{{ vcontainer }}</p>
        <p :class="props.classCode" v-bind="textBlueLighten" v-bind:="ml2">
          {{ gridList }}
        </p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>

      <!-- row tag -->
      <div :class="containerClass" v-bind="ml7">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode" v-bind="textTeal">{{ row }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>

      <!-- col tag -->
      <div :class="containerClass" v-bind="ml11">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode" v-bind="textTeal">{{ col }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>

      <!-- h1 tag -->
      <div :class="containerClass" v-bind="ml15">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode" v-bind="textBlue">{{ h1 }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
        <p :class="props.classCode">{{ firstname }}</p>
        <p :class="props.classCode" v-bind="ml2">{{ lastname }}</p>
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode">{{ slash }}</p>
        <p :class="props.classCode" v-bind="textBlue">{{ h1 }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>

      <!-- p tag -->
      <div :class="containerClass" v-bind="ml15">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode" v-bind="textBlue">{{ p }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
        <p :class="props.classCode">{{ activityH2 }}</p>
        <p :class="props.classCode" v-bind="ml2">{{ activityH2_1 }}</p>
        <p
          :class="props.classCode"
          v-bind="ml2"
          v-show="!$vuetify.display.mobile"
        >
          {{ activityH2_2 }}
        </p>
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode">{{ slash }}</p>
        <p :class="props.classCode" v-bind="textBlue">{{ p }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>

      <!-- p tag 2 -->
      <div :class="containerClass" v-bind="ml15">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode" v-bind="textBlue">{{ p }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
        <p :class="props.classCode">{{ activityH3 }}</p>
        <p :class="props.classCode" v-bind="ml2">{{ activityH3_1 }}</p>
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode">{{ slash }}</p>
        <p :class="props.classCode" v-bind="textBlue">{{ p }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>

      <!-- end tag col -->
      <div :class="containerClass" v-bind="ml11">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode">{{ slash }}</p>
        <p :class="props.classCode" v-bind="textTeal">{{ col }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>

      <!-- end tag row -->
      <div :class="containerClass" v-bind="ml7">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode">{{ slash }}</p>
        <p :class="props.classCode" v-bind="textTeal">{{ row }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>

      <!-- end tag v-container -->
      <div :class="containerClass" v-bind="ml3">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode">{{ slash }}</p>
        <p :class="props.classCode" v-bind="textTeal">{{ vcontainer }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>

      <!-- end tag template -->
      <div :class="containerClass">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode">{{ slash }}</p>
        <p :class="props.classCode" v-bind="textBlue">{{ template }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>

      <br />

      <!-- script tag -->
      <div :class="containerClass">
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode" v-bind="textBlue">{{ script }}</p>
        <p :class="props.classCode" v-bind="ml2" v-bind:="textBlueLighten">
          {{ setup }}
        </p>
        <p :class="props.classCode" v-bind="ml2" v-bind:="textBlueLighten">
          {{ lang }}
        </p>
        <p :class="props.classCode">{{ equal }}</p>
        <p :class="props.classCode" v-bind="textRed">
          {{ quote }}{{ ts }}{{ quote }}
        </p>
        <p :class="props.classCode">{{ chevronRight }}</p>
        <p :class="props.classCode">{{ chevronLeft }}</p>
        <p :class="props.classCode">{{ slash }}</p>
        <p :class="props.classCode" v-bind="textBlue">{{ script }}</p>
        <p :class="props.classCode">{{ chevronRight }}</p>
      </div>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import * as dynamics from "dynamics.js";
import vuetify from "@/plugins/vuetify";

//#region props
interface Props {
  idSheet: string;
  classCode: string;
  disabled?: boolean;
  animateScrollLimit: number;
}
const props = withDefaults(defineProps<Props>(), { disabled: false });
//#endregion

//#region computed
const computedSize = computed<string>(() => {
  if (vuetify.display.xs.value) return "font-size: 100%";
  if (vuetify.display.sm.value) return "font-size: 110%";
  if (vuetify.display.md.value) return "font-size: 130%";
  if (vuetify.display.lg.value) return "font-size: 130%";
  if (vuetify.display.xl.value) return "font-size: 130%";
  return "font-size: 90%";
});
//#endregion

//#region variables
const containerClass: string = "d-flex";

const slash = "/";
const template = "template";
const vcontainer = "v-container";
const gridList = "grid-list-xs";
const row = "row";
const col = "col";
const h1 = "h1";
const p = "p";
const script = "script";
const lang = "lang";
const setup = "setup";
const ts = "ts";
const quote = '"';
const equal = "=";
const chevronLeft = "<";
const chevronRight = ">";
const firstname = "Wilfried";
const lastname = "Nessoumou";
const activityH2 = "Concepteur";
const activityH2_1 = "développeur";
const activityH2_2 = "d'applications";
const activityH3 = "Développeur";
const activityH3_1 = "web";

let scrolling = true;
//#endregion

//#region bindings
const sheetBindings: Binding = {
  class: "pa-0 py-5 pa-sm-5 pa-md-8 d-flex flex-row rounded-lg",
  style: "line-height: 130%;",
  color: "primary",
  "max-width": 1000,
  "min-width": 300,
};
const lineNumbersContainerBindings: Binding = {
  class: "d-flex flex-row",
};
const lineNumbersBinding: Binding = {
  class: "d-flex flex-column pr-5 text-right",
};
const textBlue: Binding = {
  class: "text-blue",
};
const textBlueLighten: Binding = {
  class: "text-blue-lighten",
};
const textTeal: Binding = {
  class: "text-teal",
};
const textRed: Binding = {
  class: "text-red",
};
const verticalLine: Binding = {
  class: "mr-5",
  style: "border: solid grey 1px",
};
const ml2: Binding = {
  class: "ml-2",
};
const ml3: Binding = {
  class: "ml-3",
};
const ml7: Binding = {
  class: "ml-7",
};
const ml11: Binding = {
  class: "ml-11",
};
const ml15: Binding = {
  class: "ml-15",
};
//#endregion

//#region event handlers
function onScroll(): void {
  if (scrolling && scrollY >= props.animateScrollLimit) {
    handWrite();
    scrolling = false;
  }
}
//#endregion

//#region animation functions
// low leveal animations
function writeCode(sheet: HtmlItem, codeElements: NodeListOf<Element>) {
  const init = { scale: 0 };
  const appear = { scale: 1 };
  const type = dynamics.spring;
  const friction = 1000;

  // initialize elements's css
  dynamics.css(sheet, init);
  dynamics.css(codeElements, init);

  // animate elements
  dynamics.animate(sheet, appear, {
    type,
    friction,
    complete: () => {
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
    },
  });
}

// top level animations
function handWrite(): void {
  if (!props.disabled) {
    const sheet: HtmlItem = document.getElementById(props.idSheet);
    const codeElements: NodeListOf<Element> = document.querySelectorAll(
      `.${props.classCode}`
    );
    const ready: boolean = sheet != null && codeElements != null;
    if (ready) writeCode(sheet, codeElements);
  }
}
//#endregion

//#region hooks
onMounted(() => {
  addEventListener("scroll", onScroll);
});
//#endregion
</script>

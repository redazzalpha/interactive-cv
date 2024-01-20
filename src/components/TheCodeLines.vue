<template>
  <v-sheet v-bind="sheetBinding">
    <!-- line numbers container-->
    <div v-bind="lineNumbersContainerBinding">
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

    <!-- code lines  -->
    <div>
      <!-- template tag -->
      <p>
        {{ chevronLeft }}<span v-bind="textBlue">{{ template }}</span
        >{{ chevronRight }}
      </p>

      <!-- v-container tag -->
      <p v-bind="ml3">
        {{ chevronLeft }}<span v-bind="textTeal">{{ vcontainer }}</span>
        <span v-bind="textBlueLighten" v-bind:="ml2">{{ gridList }}</span
        >{{ chevronRight }}
      </p>

      <!-- row tag -->
      <p v-bind="ml7">
        {{ chevronLeft }}<span v-bind="textTeal">{{ row }}</span
        >{{ chevronRight }}
      </p>

      <!-- col tag -->
      <p v-bind="ml11">
        {{ chevronLeft }}<span v-bind="textTeal">{{ col }}</span
        >{{ chevronRight }}
      </p>

      <!-- h1 tag -->
      <p v-bind="ml15">
        {{ chevronLeft }}<span v-bind="textBlue">{{ h1 }}</span
        >{{ chevronRight }}{{ text1 }}{{ chevronLeft }}{{ slash
        }}<span v-bind="textBlue">{{ h1 }}</span
        >{{ chevronRight }}
      </p>

      <!-- h2 tag -->
      <p v-bind="ml15">
        {{ chevronLeft }}<span v-bind="textBlue">{{ h2 }}</span
        >{{ chevronRight }}{{ text2 }}{{ chevronLeft }}{{ slash
        }}<span v-bind="textBlue">{{ h2 }}</span
        >{{ chevronRight }}
      </p>

      <!-- h3 tag -->
      <p v-bind="ml15">
        {{ chevronLeft }}<span v-bind="textBlue">{{ h3 }}</span
        >{{ chevronRight }}{{ text3 }}{{ chevronLeft }}{{ slash
        }}<span v-bind="textBlue">{{ h3 }}</span
        >{{ chevronRight }}
      </p>

      <!-- end tag col -->
      <p v-bind="ml11">
        {{ chevronLeft }}{{ slash }}<span v-bind="textTeal">{{ col }}</span
        >{{ chevronRight }}
      </p>

      <!-- end tag row -->
      <p v-bind="ml7">
        {{ chevronLeft }}{{ slash }}<span v-bind="textTeal">{{ row }}</span
        >{{ chevronRight }}
      </p>
      <!-- end tag v-container -->
      <p v-bind="ml3">
        {{ chevronLeft }}{{ slash
        }}<span v-bind="textTeal">{{ vcontainer }}</span
        >{{ chevronRight }}
      </p>

      <!-- end tag template -->
      <p>
        {{ chevronLeft }}{{ slash }}<span v-bind="textBlue">{{ template }}</span
        >{{ chevronRight }}
      </p>

      <!-- script tag -->
      <br />
      <p>
        {{ chevronLeft }}<span v-bind="textBlue">{{ script }}</span>
        <span v-bind="ml2" v-bind:="textBlueLighten">{{ setup }}</span>
        <span v-bind="ml2" v-bind:="textBlueLighten">{{ lang }}</span
        >{{ equal }}<span v-bind="textRed">{{ quote }}{{ ts }}{{ quote }}</span
        >{{ chevronRight }}{{ chevronLeft }}{{ slash
        }}<span v-bind="textBlue">{{ script }}</span
        >{{ chevronRight }}
      </p>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";

//#region variables
const slash = "/";
const template = "template";
const vcontainer = "v-container";
const gridList = "grid-list-xs";
const row = "row";
const col = "col";
const h1 = "h1";
const h2 = "h2";
const h3 = "h3";
const script = "script";
const lang = "lang";
const setup = "setup";
const ts = "ts";
const quote = '"';
const equal = "=";
const chevronLeft = "<";
const chevronRight = ">";
const text1 = "Wilfried Nessoumou";
const text2 = "Concepteur développeur d'applications";
const text3 = "Développeur web";
//#endregion

//#region bindings
const sheetBinding = ref({
  class: "pa-3 d-flex flex-row rounded-lg",
  style: "font-size: 18px; line-height: 130%",
  color: "#1f1f1f",
  "max-width": 900,
  "min-width": 300,
});
const lineNumbersContainerBinding = ref({
  class: "d-flex flex-row",
});
const lineNumbersBinding = ref({
  class: "d-flex flex-column pr-5 text-right",
});
const textBlue = ref({
  class: "text-blue",
});
const textBlueLighten = ref({
  class: "text-blue-lighten-2",
});
const textTeal = ref({
  class: "text-teal-accent-3",
});
const textRed = ref({
  class: "text-red-lighten-2",
});
const verticalLine = {
  class: "mr-5",
  style: "border: solid grey 1px",
};
const ml2 = ref({
  class: "ml-2",
});
const ml3 = ref({
  class: "ml-3",
});
const ml7 = ref({
  class: "ml-7",
});
const ml11 = ref({
  class: "ml-11",
});
const ml15 = ref({
  class: "ml-15",
});
const mr5 = ref({
  class: "mr-5",
});
//#endregion
</script>

<style lang="scss" scoped>
p {
  color: white;
}
</style>

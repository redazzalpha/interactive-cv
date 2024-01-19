<template>
  <div style="font-size: 16px; line-height: 130%">
    <v-sheet position="absolute" style="z-index: 1">
      <v-img src="@/assets/capture.png" width="600"></v-img>
    </v-sheet>
    <v-sheet
      position="absolute"
      style="z-index: 2; background-color: transparent"
      class="mt-6 ml-15"
    >
      <!-- template tag -->
      <p>
        {{ chevronLeft }}<span class="text-blue">{{ template }}</span
        >{{ chevronRight }}
      </p>

      <!-- v-container tag -->
      <p class="ml-3">
        {{ chevronLeft
        }}<span class="text-teal-accent-3">{{ vcontainer }}</span>
        <span class="text-blue-lighten-2 ml-2">{{ gridList }}</span
        >{{ chevronRight }}
      </p>

      <!-- row tag -->
      <p class="ml-7">
        {{ chevronLeft }}<span class="text-teal-accent-3">{{ row }}</span
        >{{ chevronRight }}
      </p>

      <!-- col tag -->
      <p class="ml-11">
        {{ chevronLeft }}<span class="text-teal-accent-3">{{ col }}</span
        >{{ chevronRight }}
      </p>

      <!-- h1 tag -->
      <p class="ml-15">
        {{ chevronLeft }}<span class="text-blue">{{ h1 }}</span
        >{{ chevronRight }}{{ text1 }}{{ chevronLeft }}{{ slash
        }}<span class="text-blue">{{ h1 }}</span
        >{{ chevronRight }}
      </p>

      <!-- h2 tag -->
      <p class="ml-15">
        {{ chevronLeft }}<span class="text-blue">{{ h2 }}</span
        >{{ chevronRight }}{{ text2 }}{{ chevronLeft }}{{ slash
        }}<span class="text-blue">{{ h2 }}</span
        >{{ chevronRight }}
      </p>

      <!-- h3 tag -->
      <p class="ml-15">
        {{ chevronLeft }}<span class="text-blue">{{ h3 }}</span
        >{{ chevronRight }}{{ text3 }}{{ chevronLeft }}{{ slash
        }}<span class="text-blue">{{ h3 }}</span
        >{{ chevronRight }}
      </p>

      <!-- end tag col -->
      <p class="ml-11">
        {{ chevronLeft }}{{ slash
        }}<span class="text-teal-accent-3">{{ col }}</span
        >{{ chevronRight }}
      </p>

      <!-- end tag row -->
      <p class="ml-7">
        {{ chevronLeft }}{{ slash
        }}<span class="text-teal-accent-3">{{ row }}</span
        >{{ chevronRight }}
      </p>
      <!-- end tag v-container -->
      <p class="ml-3">
        {{ chevronLeft }}{{ slash
        }}<span class="text-teal-accent-3">{{ vcontainer }}</span
        >{{ chevronRight }}
      </p>

      <!-- end tag template -->
      <p>
        {{ chevronLeft }}{{ slash }}<span class="text-blue">{{ template }}</span
        >{{ chevronRight }}
      </p>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
const slash = "/";
const template = "template";
const vcontainer = "v-container";
const gridList = "grid-list-xs";
const row = "row";
const col = "col";
const h1 = "h1";
const h2 = "h2";
const h3 = "h3";
const chevronLeft = "<";
const chevronRight = ">";
const text1 = "Wilfried Nessoumou";
const text2 = "Concepteur développeur d'applications";
const text3 = "Développeur web";
</script>

<style lang="scss" scoped>
p {
  color: white;
}
</style>

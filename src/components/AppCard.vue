<template>
  <v-card max-width="600" min-width="300" min-height="800" color="red">
    <v-card-title>
      <slot name="title"></slot>
    </v-card-title>
    <v-card-text>
      <slot name="text"></slot>
    </v-card-text>
  </v-card>
</template>

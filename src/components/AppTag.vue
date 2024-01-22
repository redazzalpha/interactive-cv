<template>
  <router-link :to="props.href" active-class="active">
    <v-card flat class="item">
      <v-icon :icon="props.icon"></v-icon>

      <!-- chevron left -->
      <v-icon
        class="item_chevron-left item_tag"
        icon="mdi-chevron-left"
        :size="props.sizeChevron"
      ></v-icon>

      <!-- content -->
      <span :class="props.textVariantSize">
        <slot> </slot>
      </span>

      <!-- slash -->
      <v-icon
        class="item_slash item_tag"
        icon="mdi-slash-forward"
        :size="props.sizeSlash"
      ></v-icon>

      <!-- chevron right -->
      <v-icon
        class="item_chevron-right item_tag"
        icon="mdi-chevron-right"
        :size="props.sizeChevron"
      ></v-icon>
    </v-card>
  </router-link>
</template>

<script setup lang="ts">
//#region props
interface Props {
  href: string;
  sizeChevron?: number;
  sizeSlash?: number;
  visible?: boolean;
  textVariantSize?: string;
  icon?: string;
  onClick: (path: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  sizeChevron: 40,
  sizeSlash: 30,
  visible: true,
  textVariantSize: "text-subtitle-1",
  icon: "",
});
//#endregion
</script>

<style lang="scss" scoped>
$duration: 0.4s;
$transition-color: color linear $duration;
$transition-opacity: opacity linear $duration;
$transition-left: left linear $duration;
$transition-right: right linear $duration;
$color-active: #03a9f4;
$color-hover: #c43b3b;
$color-base: white;
$opacity-start: 0;
$opacity-end: 1;
$item-start-x: -20px;
$chevron-left-end: 10px;
$chevron-right-end: 20px;

@mixin position($direction) {
  position: relative;
  #{$direction}: $item-start-x;
}

a {
  text-decoration: none;
}

.active {
  .item {
    color: $color-active;
    &_tag {
      color: $color-base;
      opacity: $opacity-end;
    }
    &_chevron-left {
      left: $chevron-left-end;
    }
    &_chevron-right {
      right: $chevron-right-end;
    }
  }
}

.item {
  width: 100%;
  transition: $transition-color;
  &_tag {
    color: $color-base;
    opacity: $opacity-start;
    transition: $transition-color, $transition-opacity, $transition-left,
      $transition-right;
  }
  &_chevron-left {
    @include position("left");
  }
  &_chevron-right {
    @include position("right");
  }

  &:hover {
    color: $color-hover;
    .item {
      &_tag {
        color: $color-base;
        opacity: $opacity-end;
      }
      &_chevron-left {
        left: $chevron-left-end;
      }
      &_chevron-right {
        right: $chevron-right-end;
      }
    }
  }
}
</style>

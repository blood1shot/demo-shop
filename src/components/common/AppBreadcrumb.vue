<template lang="pug">
.breadcrumbs
  router-link(:to="{ name: items[0].name }")
    .icon.icon_vector
  .breadcrumb(v-for="item in items", :key="item.text")
    router-link.app-subtitle(v-if="item.name", :to="{ name: item.name }") {{ item.text }}
    .app-subtitle(v-else, :class="{ 'app-subtitle_active': item.isActive }") {{ item.text }}
</template>
<script lang="ts" setup>
import { IBreadCrumbItem } from "@/types/entities/IBreadCrumbItem";

interface Props {
  items: IBreadCrumbItem[];
}
// eslint-disable-next-line no-undef
withDefaults(defineProps<Props>(), {
  items: () => [],
});
</script>
<style lang="scss" scoped>
.icon {
  display: inline-block;
  &.icon_vector {
    margin-right: 24px;
    cursor: pointer;
    @include icon-mask("vector", 24px, 24px, var(--text-color));
  }
}
.breadcrumbs {
  display: flex;
  .breadcrumb {
    position: relative;
    margin-right: 22px;
    max-width: 33%;
    &:not(:last-child):after {
      content: "/";
      position: absolute;
      right: -14px;
      top: 2px;
      font-family: "Inter", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 22px;
      color: #6a6a6b;
    }
    .app-subtitle {
      color: var(--text-color-2);
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-decoration: none;
      &.app-subtitle_active {
        color: black;
        font-weight: 700;
      }
    }
  }
}
</style>

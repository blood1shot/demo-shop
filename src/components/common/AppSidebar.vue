<template lang="pug">
.app-sidebar(:class="{ 'app-sidebar_collapsed': collapsed }")
  .sidebar-head
    .filters-head
      v-icon.filter-icon(icon="mdi-filter")
      p(v-if="!collapsed") Filters
    .icon.icon_collapse(
      :class="{ icon_collapsed: collapsed }",
      @click="collapseSidebar"
    )
  .sidebar-list
    label.checkbox.mb1 Watch
      input(v-model="checkbox", type="checkbox", value="Watch")
      span.checkmark
    label.checkbox.mb1 Phone
      input(v-model="checkbox", type="checkbox", value="Phone")
      span.checkmark
    label.checkbox.mb1 Notebook
      input(v-model="checkbox", type="checkbox", value="Notebook")
      span.checkmark
</template>

<script lang="ts" setup>
import { Ref, ref, watch } from "vue";
import { useUIStore } from "@/store/ui";
import { storeToRefs } from "pinia";
import { FilterEnum } from "@/utils/enum/FilterEnum";
import { useFilterStore } from "@/store/filter";

const filterStore = useFilterStore();
const { collapsed } = storeToRefs(useUIStore());
const { collapseSidebar } = useUIStore();
const checkbox: Ref<FilterEnum[]> = ref([]);
const checked: FilterEnum[] = filterStore.checked;

watch(
  () => checkbox,
  (value) => {
    console.log(value);
    filterStore.replaceAll(value.value);
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
@import "src/scss/checkbox.scss";
.logo {
  width: 112px;
  height: 31px;
  background-size: cover;
}
.short-logo {
  width: 30px;
  height: 31px;
  background-size: cover;
}
.icon_collapse {
  transform: rotate(360deg);
  &.icon_collapsed {
    transform: rotate(180deg);
  }
}
.link_hide {
  justify-content: center;
  .app-subtitle {
    display: none;
  }
}
.sidebar-list {
  color: white;
  margin-top: 35px;
  .link {
    transition: all ease-in-out 200ms;
    text-decoration: none;
    border-radius: 8px;
    padding: 8px;
    width: 100%;
    display: flex;

    &.link_active,
    &:hover {
      .icon {
        background-color: var(--white);
      }
      .app-subtitle {
        color: var(--white);
      }
      background-color: var(--primary);
    }
  }
  .app-subtitle {
    margin-left: 8px;
  }
}
.app-sidebar {
  padding: 28px 16px;
  height: 100%;
  position: fixed;
  width: 216px;
  background-color: #000;
  z-index: 2;
  &.app-sidebar_collapsed {
    width: 94px;
  }
  .sidebar-head {
    align-items: center;
    display: flex;
    justify-content: space-between;
    .filter-icon {
      color: #747474;
    }
    .filters-head {
      color: #747474;
      display: flex;
    }
  }
}

.icon {
  display: inline-block;
  &.icon_collapse {
    cursor: pointer;
    @include icon-mask("collapse", 24px, 24px, #747474);
  }
}
</style>

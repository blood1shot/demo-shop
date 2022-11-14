<template lang="pug">
.app-sidebar(:class="{ 'app-sidebar_collapsed': collapsed }")
  .sidebar-head
    .icon.icon_collapse(
      :class="{ icon_collapsed: collapsed }",
      @click="collapseSidebar"
    )
  .sidebar-list
    //- router-link.link.mb1(
    //-   v-for="(link, index) in links",
    //-   :key="index",
    //-   :to="{ name: link.route }",
    //-   active-class="link_active",
    //-   :class="[{ link_hide: collapsed }]"
    //- )
    //-   .icon(:class="link.iconName")
    //-   .app-subtitle {{ link.name }}
</template>

<script lang="ts" setup>
import { useUIStore } from "@/store/ui";
import { storeToRefs } from "pinia";

const { collapsed } = storeToRefs(useUIStore());
const { collapseSidebar } = useUIStore();
</script>

<style lang="scss" scoped>
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

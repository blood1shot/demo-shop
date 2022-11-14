import { defineStore } from "pinia";
import { ref, Ref } from "vue";

export const useUIStore = defineStore(
  "ui",
  () => {
    const collapsed: Ref<boolean> = ref(false);
    const collapseSidebar = (): void => {
      collapsed.value = !collapsed.value;
    };

    return {
      collapseSidebar,
      collapsed,
    };
  },
  {
    persist: {
      paths: ["collapsed"],
    },
  }
);

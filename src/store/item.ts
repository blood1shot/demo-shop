import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { IItem } from "@/types/entities/IItem";
import itemApi from "@/services/itemApi";

export const useItemStore = defineStore("item", () => {
  const items: Ref<IItem[]> = ref([]);
  const getAll = (): void => {
    itemApi.getAll().then((res) => {
      items.value = res.data;
    });
  };

  return {
    items,
    getAll,
  };
});

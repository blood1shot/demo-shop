import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { FilterEnum } from "@/utils/enum/FilterEnum";

export const useFilterStore = defineStore("filter", () => {
  const checked: Ref<FilterEnum[]> = ref([]);
  const addOne = (type: FilterEnum): void => {
    checked.value.push(type);
  };
  const removeOne = (type: FilterEnum): void => {
    checked.value = checked.value.filter((checkedType) => checkedType !== type);
  };
  const replaceAll = (arr: FilterEnum[]): void => {
    checked.value = arr;
  };
  return {
    checked,
    addOne,
    removeOne,
    replaceAll,
  };
});

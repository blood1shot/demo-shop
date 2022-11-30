import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { FilterEnum } from "@/utils/enum/FilterEnum";

export const useFilterStore = defineStore("filter", () => {
  const checked: Ref<FilterEnum[]> = ref([]);
  const price: Ref<number> = ref(0);
  const addOne = (type: FilterEnum): void => {
    checked.value.push(type);
  };
  const removeOne = (type: FilterEnum): void => {
    checked.value = checked.value.filter((checkedType) => checkedType !== type);
  };
  const replaceAll = (arr: FilterEnum[]): void => {
    checked.value = arr;
  };
  const changePrice = (number: number): void => {
    price.value = +number;
  };
  return {
    checked,
    price,
    addOne,
    removeOne,
    replaceAll,
    changePrice,
  };
});

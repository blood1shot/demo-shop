<template lang="pug">
div
  img.slide-img(src="@/assets/images/13-discount.png")
  app-text-input.mb3(
    v-model.trim="search",
    :placeholder="'Search...'",
    :search="true"
  )
  .item-list
    product-card(v-for="item in filteredItems", :key="item.id", :item="item")
</template>

<script lang="ts" setup>
import { ref, Ref, computed, ComputedRef } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import itemApi from "@/services/itemApi";
import { IItem } from "@/types/entities/IItem";
import { FilterEnum } from "@/utils/enum/FilterEnum";
import { useItemStore } from "@/store/item";
import { useFilterStore } from "@/store/filter";
import AppTextInput from "@/components/common/AppTextInput.vue";

const filterStore = useFilterStore();
const itemStore = useItemStore();
const items: Ref<IItem[]> = ref([]);
const search: Ref<string> = ref("");

const filteredItems: ComputedRef<IItem[]> = computed(() => {
  if (
    filterStore.price !== 0 &&
    filterStore.checked.length === 0 &&
    !search.value
  ) {
    return items.value.filter((item) => item.price <= filterStore.price);
  }
  if (
    filterStore.checked.length === 0 &&
    filterStore.price === 0 &&
    !search.value
  ) {
    return items.value;
  }
  if (
    filterStore.checked.length !== 0 &&
    filterStore.price === 0 &&
    !search.value
  ) {
    return items.value.filter(
      (item) => filterStore.checked.indexOf(item.type) !== -1
    );
  }
  if (
    filterStore.checked.length !== 0 &&
    filterStore.price !== 0 &&
    !search.value
  ) {
    const arr = items.value.filter(
      (item) => filterStore.checked.indexOf(item.type) !== -1
    );
    return arr.filter((item) => item.price <= filterStore.price);
  }
  if (
    filterStore.checked.length === 0 &&
    filterStore.price === 0 &&
    search.value
  ) {
    let newArray = [];
    for (let key in items.value) {
      let el = items.value[key];
      if (el.item_name.toLowerCase().indexOf(search.value.toLowerCase()) != -1)
        newArray.push(el);
    }
    return newArray;
  }
  if (
    filterStore.checked.length !== 0 &&
    filterStore.price === 0 &&
    search.value
  ) {
    const arr = items.value.filter(
      (item) => filterStore.checked.indexOf(item.type) !== -1
    );
    let newArray = [];
    for (let key in arr) {
      let el = arr[key];
      if (el.item_name.toLowerCase().indexOf(search.value.toLowerCase()) != -1)
        newArray.push(el);
    }
    return newArray;
  }
  if (
    filterStore.checked.length === 0 &&
    filterStore.price !== 0 &&
    search.value
  ) {
    const arr = items.value.filter((item) => item.price <= filterStore.price);
    let newArray = [];
    for (let key in arr) {
      let el = arr[key];
      if (el.item_name.toLowerCase().indexOf(search.value.toLowerCase()) != -1)
        newArray.push(el);
    }
    return newArray;
  }
  if (
    filterStore.checked.length !== 0 &&
    filterStore.price !== 0 &&
    search.value
  ) {
    let arr = items.value.filter(
      (item) => filterStore.checked.indexOf(item.type) !== -1
    );
    arr = arr.filter((item) => item.price <= filterStore.price);
    let newArray = [];
    for (let key in arr) {
      let el = arr[key];
      if (el.item_name.toLowerCase().indexOf(search.value.toLowerCase()) != -1)
        newArray.push(el);
    }
    return newArray;
  } else {
    return items.value;
  }
});

itemApi.getAll().then((res) => {
  items.value = res.data;
});
</script>

<style scoped lang="scss">
.slide-img {
  // height: 245px;
  width: 100%;
}
.item-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  // column-gap: 5%;
  justify-content: space-around;
  row-gap: 25px;
}
</style>

<template lang="pug">
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

const filterStore = useFilterStore();
const itemStore = useItemStore();
const items: Ref<IItem[]> = ref([]);

const filteredItems: ComputedRef<IItem[]> = computed(() => {
  if (filterStore.checked.length === 0) {
    return items.value;
  } else {
    return items.value.filter(
      (item) => filterStore.checked.indexOf(item.type) !== -1
    );
  }
});

itemApi.getAll().then((res) => {
  items.value = res.data;
});
</script>

<style scoped lang="scss">
.item-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  // column-gap: 5%;
  justify-content: space-around;
  row-gap: 25px;
}
</style>

<template lang="pug">
.item-list
  product-card(v-for="item in items", :item="item")
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import itemApi from "@/services/itemApi";
import { IItem } from "@/types/entities/IItem";

const items: Ref<IItem[]> = ref([]);

itemApi.getItems().then((res) => {
  items.value = res.data;
});
</script>

<style scoped lang="scss">
.item-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 35px;
  row-gap: 15px;
}
</style>

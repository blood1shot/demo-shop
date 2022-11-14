<template lang="pug">
.details-page-wrapper
  p Details {{ itemId }}
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
import itemApi from "@/services/itemApi";
import { IItem } from "@/types/entities/IItem";
import { useRoute } from "vue-router";

const route = useRoute();
const itemId: Ref<number> = ref(Number(route.params.id));
const items: Ref<IItem[]> = ref([]);

itemApi.getItems().then((res) => {
  items.value = res.data;
  console.log(items.value);
});
</script>

<style scoped lang="scss">
.home-wrapper {
  padding-top: 64px;
  .main-page-wrapper {
    .main-page {
      width: calc(100% - 216px);
      float: right;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      column-gap: 35px;
      row-gap: 15px;
    }
    .main-page_collapsed {
      width: calc(100% - 94px);
    }
  }
}
</style>

<template lang="pug">
.home-wrapper
  v-app-bar(:elevation="2")
    template(#prepend)
      v-icon(icon="mdi-apple")
    v-app-bar-title Official Apple reseller
    template(#append)
      span.amount-of-items(v-if="cartStore.cart.length") {{ itemsInCart }}
      router-link.app-link(:to="{ name: routesName.checkoutPage }")
        v-btn(icon="mdi-cart")
  .main-page-wrapper
    app-sidebar
    .main-page(:class="{ 'main-page_collapsed': collapsed }")
      router-view(v-slot="{ Component }")
        transition(name="fade", mode="out-in")
          component(:is="Component")
</template>

<script lang="ts" setup>
import { ref, Ref, computed, ComputedRef } from "vue";
import routesName from "@/utils/constants/routesName";
import AppSidebar from "@/components/common/AppSidebar.vue";
import { useUIStore } from "@/store/ui";
import { useCartStore } from "@/store/cart";
import { storeToRefs } from "pinia";
import itemApi from "@/services/itemApi";
import { IItem } from "@/types/entities/IItem";

const items: Ref<IItem[]> = ref([]);

itemApi.getAll().then((res) => {
  items.value = res.data;
  console.log(items.value);
});

const cartStore = useCartStore();
const itemsInCart: ComputedRef<number | undefined> = computed(() => {
  let quantity: Ref<number> = ref(0);
  cartStore.cart.forEach((item) => {
    quantity.value += item.quantity;
  });
  return quantity.value;
});
const { collapsed } = storeToRefs(useUIStore());
</script>

<style lang="scss" scoped>
.home-wrapper {
  padding-top: 64px;
  .amount-of-items {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 16px;
    width: 16px;
    color: white;
    font-size: 10px;
    font-weight: 700;
    padding: 1.5px 3px;
    background: #eb1d36;
    border-radius: 50%;
    margin-left: 10px;
    text-align: center;
  }
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

<template lang="pug">
.game-container
  .inner.smaller
    app-breadcrumb(:items="breadcrumbs")
    .content-wrapper
      .content-img-wrapper
        img.content-img(:src="getImgUrl()")
      .details
        .details-header.mb2
          p.app-h4.details-title {{ item.item_name }} Details
          .edit
            p.app-body-1 Vendor code: {{ item.vendor }}
        p.app-subtitle.description-text.mb1 {{ item.description }}
        .price-and-button
          .discount(v-if="item.discount")
            p.discount-price {{ item.price }}
            span.discount-persentage -{{ item.discount }}%
          p.app-price(v-if="item.discount") {{ item.price - item.price * (item.discount / 100) }}$
          p.app-price(v-else) {{ item.price }}$
          app-button.add-to-cart(@click="addToCart(item)") Add to cart
</template>

<script lang="ts" setup>
import { ref, Ref, computed, ComputedRef } from "vue";
import itemApi from "@/services/itemApi";
import { IItem } from "@/types/entities/IItem";
import { useRoute } from "vue-router";
import AppBreadcrumb from "@/components/common/AppBreadcrumb.vue";
import AppButton from "@/components/common/AppButton.vue";
import { IBreadCrumbItem } from "@/types/entities/IBreadCrumbItem";
import { useCartStore } from "@/store/cart";
import routesName from "@/utils/constants/routesName";

const route = useRoute();
const itemId: Ref<number> = ref(Number(route.params.id));
const item: Ref<IItem | undefined> = ref();
const cartStore = useCartStore();

itemApi.getOne(itemId.value).then((res) => {
  item.value = res.data;
});

const breadcrumbs: ComputedRef<IBreadCrumbItem[]> = computed(() => [
  {
    text: "Items",
    name: routesName.home,
  },
  {
    text: `${item.value?.item_name} Details`,
    isActive: true,
  },
]);

const getImgUrl = () => {
  return require(`@/assets/images/${item.value?.img_name}.png`);
};

const addToCart = (item: IItem) => {
  cartStore.addTo(item);
};
</script>

<style scoped lang="scss">
@import "src/scss/details-page.scss";
</style>

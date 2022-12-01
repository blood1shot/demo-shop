<template lang="pug">
.card-wrapper
  h3 {{ item.item_name }}
  img(:src="getImgUrl(item.img_name)")
  p.price.mb1 {{ item.price }}$
  router-link(:to="{ name: routesName.itemDetails, params: { id: item.id } }")
    app-button.info-btn
      v-icon(icon="mdi-information")
  app-button.product-btn(@click="addToCart(item)") Add to cart
</template>

<script setup lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import routesName from "@/utils/constants/routesName";
import { useCartStore } from "@/store/cart";
import { IItem } from "@/types/entities/IItem";

interface IProps {
  item?: IItem;
}

withDefaults(defineProps<IProps>(), {
  item: undefined,
});

const cartStore = useCartStore();

const getImgUrl = (img_name: string) => {
  return require(`@/assets/images/${img_name}.png`);
};
const addToCart = (item: IItem) => {
  cartStore.addTo(item);
  console.log(item.quantity);
};
</script>
<style lang="scss" scoped>
.card-wrapper {
  padding: 10px;
  text-align: center;
  border: 2px solid var(--text-color);
  border-radius: 8px;
  width: 270px;
  height: 400px;
  position: relative;
  .product-btn {
    max-width: 200px;
  }
  img {
    width: 210px;
  }
  .info-btn {
    max-width: 40px;
    max-height: 40px;
    padding: 10px;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  a {
    text-decoration: none;
  }
}
</style>

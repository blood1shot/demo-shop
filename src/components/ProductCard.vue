<template lang="pug">
.card-wrapper
  h3 {{ item.item_name }}
  img(:src="getImgUrl(item.img_name)")
  .price
    .discount(v-if="item.discount")
      p.discount-price {{ item.price }}
      span.discount-persentage -{{ item.discount }}%
    p.app-price(v-if="item.discount") {{ item.price - item.price * (item.discount / 100) }}$
    p.app-price(v-else) {{ item.price }}$
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
  .discount {
    // position: absolute;
    // left: 2px;
    // top: -8px;
    display: flex;
    align-items: center;
    height: 20px;
    .discount-price {
      margin: 0;
      color: gray;
      font-size: 14px;
      text-decoration: line-through;
    }
    .discount-persentage {
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 4px;
      background: #eb1d36;
      border-radius: 1.2rem;
      margin-left: 10px;
    }
  }
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
  .price {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>

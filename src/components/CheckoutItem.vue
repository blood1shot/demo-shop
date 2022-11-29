<template lang="pug">
.card-wrapper.mb2
  .item-title
    img(:src="getImgUrl(item.img_name)")
    router-link(
      :to="{ name: routesName.itemDetails, params: { id: item.id } }"
    )
      p.app-h3 {{ item.item_name }}
  .item-price
    .quantity
      app-button.plus-minus(@click="changeQuantity(item.id, 'decrement')") -
      .amount {{ item.quantity }}
      app-button.plus-minus(@click="changeQuantity(item.id, 'increment')") +
    p.app-price {{ item.price }}$
    app-button(@click="removeFromCart(item.id)")
      v-icon(icon="mdi-trash-can")
</template>

<script setup lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import routesName from "@/utils/constants/routesName";
import { useCartStore } from "@/store/cart";
import { IItem } from "@/types/entities/IItem";

interface IProps {
  item?: IItem;
}
// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<IProps>(), {
  item: undefined,
});

const cartStore = useCartStore();

const getImgUrl = (img_name: string) => {
  return require(`@/assets/images/${img_name}.png`);
};
const removeFromCart = (id: number) => {
  cartStore.removeFrom(id);
};
const changeQuantity = (id: number, action: string) => {
  cartStore.changeQuantity(id, action);
};
</script>
<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  text-align: center;
  border: 2px solid var(--text-color);
  border-radius: 8px;
  width: 100%;
  align-items: center;
  position: relative;
  .item-title {
    display: flex;
    align-items: center;
  }
  .item-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .quantity {
      display: flex;
      align-items: center;
      margin-right: 32px;
      .amount {
        margin: 0 5px;
        border: 2px solid black;
        padding: 5px;
        border-radius: 8px;
      }
      .plus-minus {
        padding: 5px;
        width: 20px;
        height: 20px;
      }
    }
    .app-price {
      margin-right: 32px;
      font-size: 30px;
    }
  }
  .product-btn {
    max-width: 200px;
  }
  img {
    width: 80px;
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

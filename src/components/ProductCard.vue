<template lang="pug">
.card-wrapper
  h3 {{ item_name }}
  img(:src="getImgUrl(img_name)")
  p.price.mb1 {{ price }}{{ currency }}
  router-link(:to="{ name: routesName.itemDetails, params: { id: id } }")
    app-button.info-btn
      v-icon(icon="mdi-information")
  app-button.product-btn Add to cart
</template>

<script setup lang="ts">
import AppButton from "@/components/common/AppButton.vue";
import routesName from "@/utils/constants/routesName";

interface IProps {
  id: number;
  img_name: string;
  item_name: string;
  currency?: string;
  price: number;
  discount?: string;
}
// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<IProps>(), {
  id: 0,
  img_name: "",
  item_name: "",
  currency: "$",
  price: 0,
  discount: "0%",
});

const getImgUrl = (img_name: string) => {
  return require(`@/assets/images/${img_name}.png`);
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

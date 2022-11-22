<template lang="pug">
.game-container
  .inner.smaller
    .content-wrapper
      .details-header.mb2
        p.app-h4.details-title Your Order
        .edit
          router-link.app-link(:to="{ name: routesName.home }")
            app-button Continue shopping
      checkout-item(v-for="item in items", :item="item")
      p.empty-cart(v-if="items.length === 0") Cart is empty
</template>

<script lang="ts" setup>
import { computed, ComputedRef } from "vue";
import { IItem } from "@/types/entities/IItem";
import AppButton from "@/components/common/AppButton.vue";
import { useCartStore } from "@/store/cart";
import routesName from "@/utils/constants/routesName";
import CheckoutItem from "@/components/CheckoutItem.vue";

const cartStore = useCartStore();
const items: ComputedRef<IItem[] | undefined> = computed(() => cartStore.cart);
</script>

<style scoped lang="scss">
.game-container {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 108px);
  background-color: #fff;
  border-radius: 16px;
  .smaller {
    padding: 24px 100px 24px 52px;
    .details-title {
      font-size: 24px;
      line-height: 38px;
      font-family: "Poppins", sans-serif;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .content-wrapper {
      padding: 24px 48px 0 48px;
      .empty-cart {
        border: 2px solid black;
        border-radius: 8px;
        font-size: 20px;
        text-align: center;
      }
      .details {
        .price-and-button {
          display: flex;
          align-items: center;
          position: relative;
        }
        .description-text {
          max-width: 500px;
          line-height: 30px;
          margin-bottom: 24px;
        }
        .add-to-cart {
          max-width: 220px;
          margin-left: 35px;
        }
      }
      .content-img-wrapper {
        text-align: center;
        width: 100%;
        .content-img {
          width: 70%;
        }
      }
      .icon {
        display: inline-flex;
        flex: 0 0 24px;
      }
      .details-header {
        display: flex;
        justify-content: space-between;
        .edit {
          display: flex;
          align-items: center;
          cursor: pointer;
          .app-link {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
  .inner {
    position: relative;
    padding: 10px 28px 30px 28px;
    min-height: calc(100vh - 108px);
  }
}
</style>

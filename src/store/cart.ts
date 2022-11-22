import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { IItem } from "@/types/entities/IItem";

export const useCartStore = defineStore("cart", () => {
  const cart: Ref<IItem[]> = ref([]);
  const addToCart = (item: IItem): void => {
    if (cart.value.length) {
      let isProduct = false;
      cart.value.forEach((cartItem) => {
        if (cartItem.id === item.id) {
          isProduct = true;
          item.quantity++;
        }
      });
      if (!isProduct) {
        cart.value.push(item);
      }
    } else {
      cart.value.push(item);
    }
  };
  const removeFromCart = (id: number): void => {
    cart.value = cart.value.filter((item) => item.id !== id);
  };
  const changeQuantity = (id: number, action: string): void => {
    cart.value.forEach((item) => {
      if (item.id === id) {
        if (action === "increment") {
          item.quantity++;
        }
        if (action === "decrement" && item.quantity > 1) {
          item.quantity--;
        }
      }
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    changeQuantity,
  };
});

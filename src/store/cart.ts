import { defineStore } from "pinia";
import { ref, Ref, ComputedRef, computed } from "vue";
import { IItem } from "@/types/entities/IItem";

export const useCartStore = defineStore("cart", () => {
  const cart: Ref<IItem[]> = ref([]);
  const addTo = (item: IItem): void => {
    if (cart.value.length) {
      let isProduct = false;
      const cartItem: IItem | undefined = cart.value.find(
        (cartItem) => cartItem.id === item.id
      );
      if (cartItem) {
        isProduct = true;
        item.quantity++;
        console.log(item.item_name + ": " + item.quantity);
      }
      if (!isProduct) {
        cart.value.push(item);
      }
    } else {
      cart.value.push(item);
    }
  };
  const removeFrom = (id: number): void => {
    cart.value = cart.value.filter((item) => item.id !== id);
  };
  const changeQuantity = (id: number, action: string): void => {
    const item = cart.value.find((item) => item.id === id);
    if (action === "increment") {
      item ? item.quantity++ : item;
    }
    if (action === "decrement") {
      item && item.quantity > 1 ? item.quantity-- : item;
    }
  };
  const totalCost: ComputedRef<number> = computed(() => {
    const total: number = cart.value.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    return total;
  });

  return {
    cart,
    addTo,
    removeFrom,
    changeQuantity,
    totalCost,
  };
});

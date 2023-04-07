<template lang="pug">
.circular-progress-wrapper(v-if="fetching && !items.length")
  app-loader
template(v-else-if="items.length")
  div
    #carouselExampleControls.carousel.slide.mb3(data-bs-ride="carousel")
      .carousel-inner
        .carousel-item.active
          img.d-block.w-100(
            src="@/assets/images/13-discount.png",
            alt="iphone-13-discount"
          )
        .carousel-item
          img.d-block.w-100(
            src="@/assets/images/apple-watch.jpeg",
            alt="apple-watch"
          )
        .carousel-item
          img.d-block.w-100(
            src="@/assets/images/macbook-air.jpg",
            alt="apple-watch"
          )
      button.carousel-control-prev(
        type="button",
        data-bs-target="#carouselExampleControls",
        data-bs-slide="prev"
      )
        span.carousel-control-prev-icon(aria-hidden="true")
        span.visually-hidden Previous
      button.carousel-control-next(
        type="button",
        data-bs-target="#carouselExampleControls",
        data-bs-slide="next"
      )
        span.carousel-control-next-icon(aria-hidden="true")
        span.visually-hidden Next
    app-text-input.mb3(
      v-model.trim="search",
      :placeholder="'Search...'",
      :search="true"
    )
    .item-list
      product-card(v-for="item in filteredItems", :key="item.id", :item="item")
no-data-section(v-else)
</template>

<script lang="ts" setup>
import { ref, Ref, computed, ComputedRef } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import itemApi from "@/services/itemApi";
import { IItem } from "@/types/entities/IItem";
import { useFilterStore } from "@/store/filter";
import AppTextInput from "@/components/common/AppTextInput.vue";
import AppLoader from "@/components/common/AppLoader.vue";
import NoDataSection from "@/components/NoDataSection.vue";

const fetching: Ref<boolean> = ref(false);
const filterStore = useFilterStore();
const items: Ref<IItem[]> = ref([]);
const search: Ref<string> = ref("");

const filterProductsByCategory = (items: IItem[]): IItem[] => {
  if (filterStore.checked.length) {
    return items.filter(
      (item) => filterStore.checked.indexOf(item.type) !== -1
    );
  } else {
    return items;
  }
};

const filterProductsByName = (items: IItem[]): IItem[] => {
  if (search.value) {
    let newArray = [];
    for (let key in items) {
      let el = items[key];
      if (el.item_name.toLowerCase().indexOf(search.value.toLowerCase()) != -1)
        newArray.push(el);
    }
    return newArray;
  } else {
    return items;
  }
};

const filterProductsByRange = (items: IItem[]): IItem[] => {
  if (filterStore.price !== 0) {
    return items.filter((item) =>
      item.price > 0 && item.price <= filterStore.price ? item : ""
    );
  } else {
    return items;
  }
};

const filteredItems: ComputedRef<IItem[]> = computed(() => {
  return filterProductsByRange(
    filterProductsByName(filterProductsByCategory(items.value))
  );
});
const getItems = () => {
  fetching.value = true;
  itemApi
    .getAll()
    .then((res) => {
      items.value = res.data;
    })
    .finally(() => (fetching.value = false));
};
getItems();
</script>

<style scoped lang="scss">
.slide-img {
  width: 100%;
}
.item-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  row-gap: 25px;
}
.carousel {
  border-radius: 8px;
  overflow: hidden;
}
.carousel-control-prev {
  width: 5%;
}
.carousel-control-next {
  width: 5%;
}
</style>

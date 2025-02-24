<script setup lang="ts">
// 👉 Data
const { $api } = useNuxtApp();
const route = useRoute();
console.log(route.params);
var params: any = {};
const { data }: any = await useAsyncData("product-list", async () => {
  if (!import.meta.client) return null;
  const [products, categories] = await Promise.all([
    $api("products"),
    $api("categories"),
  ]);

  return { products, categories };
});
// 👉 Methods
const getProducts = async (paramsData: Object) => {
  params = { ...params, ...paramsData };
  data.value.products = await $api("products", { query: params });
};
</script>
<template>
  <div class="products-container flex gap-12" v-if="data">
    <div class="left-side w-1/4">
      <ProductFilter
        :categories="data.categories?.data"
        @get-products="getProducts"
      />
    </div>
    <div class="right-side w-3/4">
      <ProductList
        :products="data.products?.data"
        @get-products="getProducts"
      />
    </div>
  </div>
  <div v-else>
    <p>Loading products...</p>
  </div>
</template>
<style lang="scss" src="@/assets/scss/product.scss" scoped></style>

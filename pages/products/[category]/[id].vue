<script setup>
// 👉 Data
const { $api } = useNuxtApp();
const productId = useRoute().params.id;
const { data: product } = await useAsyncData("product", () =>
  import.meta.client ? $api("products/" + productId) : null
);
</script>
<template>
  <div class="single-product-container flex flex-col" v-if="product">
    <ProductDetails :product="product.data" />
    <ProductTabs :product="product.data" />
    <!-- <ProductRelated /> -->
  </div>
</template>
<style src="@/assets/scss/product.scss" scoped></style>

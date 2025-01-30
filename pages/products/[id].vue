<script setup>
const product = ref("");
</script>
<template>
  <div class="single-product-container flex flex-col">
    <ProductDetails />
    <ProductTabs />
    <ProductRelated />
  </div>
</template>
<style src="@/assets/scss/product.scss" scoped></style>

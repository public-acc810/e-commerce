<script setup>
// 👉 Data
// const  { data: products, error } = await useAsyncData("products", () =>
//   $fetch("/products", {
//     baseURL: "http://127.0.0.1:8000/api/website",
//   })
// );
// console.log(products,error);
const { data: products, error } = await useAPI("products");
// 👉 Methods
</script>
<template>
  <div class="products-container flex gap-12" v-if="products">
    <div class="left-side w-1/4">
      <ProductFilter />
    </div>
    <div class="right-side w-3/4">
      <ProductList :products="products.data" />
    </div>
  </div>
  <div v-else-if="error">
    <p class="text-red-500">{{ error }}</p>
  </div>

  <div v-else>
    <p>Loading products...</p>
  </div>
</template>
<style lang="scss" src="@/assets/scss/product.scss" scoped></style>

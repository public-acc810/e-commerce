<script setup lang="ts"></script>

<template>
  <div class="cart-container flex mb-20" style="gap: 64px">
    <div class="left-side" style="width:70%">
      <CartProducts />
    </div>
    <div class="right-side" style="width: 30%">
      <CartCheckout />
    </div>
  </div>
  <div class="mt-20">
    <ProductRelated />
  </div>
</template>
<style lang="scss" src="@/assets/scss/cart.scss" scoped></style>

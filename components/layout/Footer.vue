<script setup lang="ts">
const productItems = ref([
  { name: "Accessories & stainless", link: "/" },
  { name: "Musical instruments", link: "/" },
  { name: "Leather products", link: "/" },
  { name: "Occasion Gifts", link: "/" },
  { name: "Silver", link: "/" },
  { name: "Sunglasses", link: "/" },
]);
const serviceItems = ref([
  { name: "Build a box", link: "/" },
  { name: "Make a request", link: "/makerequest" },
  { name: "Track your order", link: "/trackorder" },
]);
const storeItems = ref([
  { name: "About", link: "/" },
  { name: "Contact", link: "/" },
  { name: "FAQs", link: "/" },
]);
</script>

<template>
  <div class="footer-container bg-main-color pt-16">
    <div class="top-footer flex justify-between items-start mb-10">
      <!---------------------------------- left side footer ----------------- -->
      <div class="left-footer-side flex flex-col flex-1 gap-8">
        <div class="flex items-center gap-4">
          <img alt="logo" src="/logo/logo.png" class="h-16" />
          <img alt="turkish" src="/logo/turkish.png" class="h-10" />
        </div>
        <p class="text-white font-normal pr-36 pb-12">
          Exploring a Turkish store can indeed be a gateway to experiencing the
          beauty and elegance . Bringing Turkish magic to your gifting
          experience
        </p>
        <div class="social-footer flex gap-2">
          <Button
            icon="pi pi-twitter"
            variant="text"
            rounded
            class="bg-white text-main-color"
          />
          <Button
            variant="text"
            rounded
            class="bg-white text-main-color p-button-icon-only"
          >
            <font-awesome icon="fa-brands fa-facebook-f" />
          </Button>
          <Button
            icon="pi pi-tiktok"
            variant="text"
            rounded
            class="bg-white text-main-color"
          />
          <Button
            icon="pi pi-instagram"
            variant="text"
            rounded
            class="bg-white text-main-color"
          />
        </div>
      </div>
      <!--------------------------------------- right side footer  --------------------->
      <div class="right-footer-side flex justify-between flex-1">
        <div class="flex flex-col gap-2">
          <h3>Product</h3>
          <NuxtLink
            v-for="Product in productItems"
            :key="Product.name"
            :to="Product.link"
            >{{ Product.name }}</NuxtLink
          >
        </div>
        <div class="flex flex-col gap-2">
          <h3>Services</h3>
          <NuxtLink
            v-for="service in serviceItems"
            :key="service.name"
            :to="service.link"
            >{{ service.name }}</NuxtLink
          >
        </div>
        <div class="flex flex-col gap-2">
          <h3>Store</h3>
          <NuxtLink
            v-for="store in storeItems"
            :key="store.name"
            :to="store.link"
            >{{ store.name }}</NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="bottom-footer flex justify-between items-start mb-8">
      <p class="text-white text-xs font-normal">
        Copyright © 2023 TURKISH - All rights reserved
      </p>
      <div class="footer-links flex gap-4">
        <NuxtLink to="/">Terms And Conditions</NuxtLink>
        <NuxtLink to="/">privacy Policy</NuxtLink
        ><NuxtLink to="/">Returns</NuxtLink
        ><NuxtLink to="/">Cookies</NuxtLink>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/layouts/footer.scss" scoped />

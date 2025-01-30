<script setup>
const Wishlist = ref([]);
</script>
<template>
  <div
    class="empty-wishlist flex flex-col items-center justify-center text-center mx-auto"
    style="width: 430px;"
    v-if="Wishlist.length == 0"
  >
    <img src="/heart_broken.png" class="w-24 h-24 mb-6" />
    <h3 class="text-3xl font-bold mb-2">Nothing found in Wishlist!</h3>
    <span class="text-main-color text-sm font-medium mb-8"
      >Once you have added items to your Wishlist, the page should display the
      contents of your cart, including the products, quantities, and cost.</span
    >
    <UiButtonComponent content="Go Shopping" as="router-link" to="/" />
  </div>
  <div class="wishlist-container flex flex-col gap-6" v-else>
    <Card
      class="cart-products-container"
      pt:root:class="shadow-none border-2 border-border-color  rounded-xl"
      pt:body:class="p-0 gap-0"
    >
      <template #title>
        <h3 class="text-black text-3xl font-bold px-6 py-5">Wishlist</h3>
      </template>
      <template #content>
        <div class="data-view-header flex items-center gap-6 px-6 py-2">
          <p style="width: 49%">Products</p>
          <p style="width: 18%">Price</p>
          <p style="width: 18%">Stock Status</p>
          <p style="width: 15%">Actions</p>
        </div>
        <DataView :value="Wishlist" pt:root:class="overflow-y-scroll max-h-96">
          <template #list="slotProps">
            <div class="flex flex-col p-6">
              <div v-for="(item, index) in slotProps.items" :key="index">
                <div
                  class="flex items-center gap-6 py-4"
                  :class="{
                    'pt-0': index === 0,
                    'pb-0': index === slotProps.items.length - 1,
                  }"
                >
                  <div
                    class="flex justify-start items-center gap-3"
                    style="width: 49%"
                  >
                    <img
                      :src="item.img"
                      :alt="item.name"
                      style="width: 72px; height: 72px"
                    />
                    <span class="text-black text-sm font-normal">{{
                      item.name
                    }}</span>
                  </div>
                  <div class="flex items-center gap-2" style="width: 18%">
                    <span
                      class="line-through text-sm text-font-color font-normal"
                      >99EGP
                    </span>
                    <p class="text-main-color text-sm font-medium">
                      {{ item.price }}
                    </p>
                  </div>
                  <div style="width: 18%">
                    <Button
                      label="in Stock"
                      severity="success"
                      variant="text"
                    />
                  </div>
                  <div class="flex items-center gap-6" style="width: 15%">
                    <Button
                      class="bg-second-color text-white border-second-color w-12 h-12 rounded-xl"
                      icon="pi pi-shopping-cart"
                    />
                    <i
                      class="pi pi-times-circle text-font-color cursor-pointer"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </template>
    </Card>
    <NuxtLink to="/" class="text-second-color text-lg font-semibold"
      >Continue Shopping</NuxtLink
    >
  </div>
</template>
<style lang="scss" src="@/assets/scss/cart.scss" scoped></style>

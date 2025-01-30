<template>
  <UiMainSwiper
    title="Related products"
    subtitle="You may also like"
    className="related-product-swiper"
    :slides-per-view="3"
    :space-between="24"
    :items="[1, 2, 3, 4, 5]"
  >
    <template #default="{ item, index }">
      <ProductCard />
    </template>
  </UiMainSwiper>
</template>

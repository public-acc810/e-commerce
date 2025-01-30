<script setup>
import { Navigation } from "swiper/modules";

const props = defineProps({
  subtitle: String,
  title: String,
  slidesPerView: Number,
  spaceBetween: Number,
  className: String,
  items: Array,
});
const navigationOptions = ref({
  nextEl: ".custom-" + props.className + "-next",
  prevEl: ".custom-" + props.className + "-prev",
});
</script>
<template>
  <div class="related-product-container flex flex-col gap-5 pt-20">
    <p
      class="before:bg-second-color before:absolute before:w-4 before:h-9 before:rounded before:-left-7 before:top-1/2 before:-translate-y-1/2 relative text-base font-bold text-second-color"
    >
      {{ title }}
    </p>
    <div class="flex justify-between">
      <h3 class="text-4xl font-bold text-main-color">{{ subtitle }}</h3>
      <div class="navigation-container flex gap-2">
        <Button
          icon="pi pi-arrow-left"
          variant="text"
          rounded
          :class="'custom-' + className + '-prev'"
          class="text-black bg-border-color border-0"
        />
        <Button
          icon="pi pi-arrow-right"
          variant="text"
          rounded
          :class="'custom-' + className + '-next'"
          class="text-black bg-border-color border-0"
        />
      </div>
    </div>
    <Swiper
      :modules="[Navigation]"
      :slidesPerView="slidesPerView"
      :space-between="spaceBetween"
      :class="['w-full', className]"
      :navigation="navigationOptions"
    >
      <swiper-slide v-for="(item, index) in items" :key="index">
        <slot :item="item" :index="index"></slot>
      </swiper-slide>
    </Swiper>
  </div>
</template>

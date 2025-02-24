<script setup>
// 👉 Data
const { $api } = useNuxtApp();
const { data: categories } = await useAsyncData("categories", () =>
  import.meta.client ? $api("categories") : null
);
</script>
<template>
  <div class="home-container" v-if="categories">
    <UiMainSwiper
      title="Categories"
      subtitle="Browse By Category"
      className="categories-swiper"
      :slides-per-view="6"
      :space-between="24"
      :items="categories.data"
    >
      <template #default="{ item, index }">
        <CategoryCard :category="item" />
      </template>
    </UiMainSwiper>
  </div>
</template>

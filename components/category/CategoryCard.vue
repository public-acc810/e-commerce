<script setup>
// 👉 Props
const props = defineProps({
  category: Object,
});
</script>
<template>
  <div
    class="category-card p-4 flex flex-col justify-center items-center gap-4 rounded cursor-pointer border border-border-color hover:bg-second-color"
  >
    <img :src="category.image" class="w-20 h-20" />
    <p class="text-main-color text-base font-semibold">{{ category.title }}</p>
  </div>
</template>
<style scoped lang="scss">
.category-card {
  &:hover {
    p {
      color: white !important;
    }
  }
}
</style>

<script setup>
// 👉 Props
const props = defineProps({
  category: Object,
});
</script>
<template>
  <div
    class="p-4 flex flex-col justify-center items-center gap-4 rounded cursor-pointer border border-border-color"
  >
    <p class="text-main-color text-base font-semibold">{{ category.title }}</p>
  </div>
</template>

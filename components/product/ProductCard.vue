<script setup>
const props = defineProps({
  product: Object,
});
</script>
<template>
  <Card
    style="box-shadow: none"
    pt:header:class="relative"
    pt:body:class="p-0"
    pt:content:class="flex flex-col gap-4 p-4"
  >
    <template #header>
      <img alt="user header" src="/image1.png" class="w-full rounded-t-xl" />
      <Tag
        pt:root:class="absolute top-0 left-0 py-2 px-4 rounded-tl-xl  rounded-tr-none rounded-bl-none rounded-br-xl bg-second-color text-white"
        >New</Tag
      >
    </template>
    <template #content>
      <div class="flex flex-col justify-start gap-2">
        <p class="text-main-color text-lg font-semibold">{{ product.title }}</p>
        <p class="text-main-color text-base font-normal">
          {{ product.desc }}
        </p>
      </div>
      <div class="flex flex-col justify-start gap-2">
        <p class="text-black text-xs font-semibold">
          EGP <span class="text-lg"> {{ product.price }} </span>
        </p>
        <p class="text-black text-sm font-normal">Free Shipping</p>
      </div>
    </template>
  </Card>
</template>

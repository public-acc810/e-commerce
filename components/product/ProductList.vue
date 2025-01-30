<script setup>
// 👉 Data
const props = defineProps(["products"]);
const searchProduct = ref("");
const selectedSort = ref(null);
const options = ref([
  { name: "Relevance" },
  { name: "Price: Low to High" },
  { name: "Price: High to Low" },
  { name: "Date: New to Old" },
  { name: "Date: Old to New" },
]);
</script>
<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between">
      <IconField class="basis-5/12">
        <InputText
          v-model="searchProduct"
          placeholder="Search for anything..."
          class="py-3 px-4 text-sm font-medium w-full"
        />
        <InputIcon class="pi pi-search text-main-color cursor-pointer" />
      </IconField>
      <div class="flex items-center gap-5 basis-1/3">
        <label class="text-sm font-medium whitespace-nowrap">Sort by :</label>
        <Select
          v-model="selectedSort"
          :options="options"
          optionLabel="name"
          placeholder="Select..."
          class="w-full"
          :checkmark="true"
          pt:option:class="sort-option"
          pt:optionlabel:class="text-sm font-medium text-main-color"
        >
        </Select>
      </div>
    </div>
    <DataView :value="products" layout="grid">
      <template #grid="{ items }">
        <div class="grid grid-cols-12 gap-6">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="md:col-span-4"
          >
            <ProductCard/>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

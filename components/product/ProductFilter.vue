<script setup>
// 👉 props
const props = defineProps({
  categories: Array,
});
// 👉 Emits
const emit = defineEmits(["getProducts"]);
const selectedSubCategory = ref(null);
const priceRange = ref([20, 80]);
const priceList = ref([
  { name: "All prices" },
  { name: "Under 250EGP" },
  { name: "1000EGP to 2000EGP" },
]);
const selectedPrice = ref("All prices");
const colorList = ref([
  { hex: "#B1B5B8", name: "dark gray" },
  { hex: "#E0E1E1", name: "gray" },
  { hex: "#FBBC05", name: "yellow" },
]);
const selectedColor = ref("#B1B5B8");
const getProducts = () => {
  emit("getProducts", { sub_category_id: selectedSubCategory.value });
};
</script>
<template>
  <div class="flex flex-col gap-3">
    <div class="category-filter flex flex-col gap-4">
      <p class="text-black text-lg font-bold">Category</p>
      <Accordion :value="[]" multiple>
        <AccordionPanel
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
          pt:root:class="border-none mb-3"
        >
          <AccordionHeader
            pt:root:class="border-2 border-border-color rounded-xl text-base font-medium text-main-color p-4"
            pt:toggleicon:class="text-main-color"
            >{{ category.title }}</AccordionHeader
          >
          <AccordionContent v-if="category.sub_categories">
            <div
              v-for="subCategory of category.sub_categories"
              :key="subCategory.id"
              class="mt-3 flex items-center gap-2 price-filter"
            >
              <RadioButton
                v-model="selectedSubCategory"
                name="dynamic"
                :value="subCategory.id"
                @change="getProducts"
              />
              <label>{{ subCategory.title }}</label>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
    <Divider class="my-3" />
    <div class="price-filter flex flex-col gap-4">
      <p class="text-black text-lg font-bold">Price Range</p>
      <Slider
        v-model="priceRange"
        range
        class="w-full"
        :min="0"
        :max="100"
        pt:range:class="bg-second-color"
        pt:endhandler:class="border-2 border-second-color before:w-full before:h-full"
        pt:starthandler:class="border-2 border-second-color before:w-full before:h-full"
      />
      <div class="flex gap-3">
        <InputNumber v-model="priceRange[0]" fluid />
        <InputNumber v-model="priceRange[1]" fluid />
      </div>
      <div class="flex flex-col gap-3">
        <div
          v-for="price in priceList"
          :key="price.name"
          class="flex items-center gap-2"
        >
          <RadioButton
            v-model="selectedPrice"
            name="dynamic"
            :value="price.name"
          />
          <label>{{ price.name }}</label>
        </div>
      </div>
    </div>
    <Divider class="my-3" />
    <div class="color-filter flex flex-col gap-4">
      <p class="text-black text-lg font-bold">Color</p>
      <div class="flex flex-col gap-3">
        <div
          v-for="color in colorList"
          :key="color.name"
          class="flex items-center gap-2"
        >
          <RadioButton
            v-model="selectedColor"
            name="dynamic"
            :value="color.hex"
            pt:root:class="rounded-full flex justify-center items-center w-8 h-8 border-transparent"
            pt:box:class="border-4 border-white w-full h-full"
            pt:icon:class="invisible"
            :pt:box:style="{ backgroundColor: color.hex }"
          />
          <label>{{ color.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

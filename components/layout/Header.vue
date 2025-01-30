<script setup lang="ts">
// 👉 Data
const selectedLang = ref("English");
const languages = ref([{ name: "English" }, { name: "Arabic" }]);
const toolbarItems = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "Pre-made boxes", link: "/home" },
  { name: "Build a box", link: "/home" },
];
const searchWord = ref("");
const menu = ref();
const accountItems = ref([
  { label: "Account Details" },
  { separator: true },
  { label: "product Review" },
  { separator: true },
  { label: "order History" },
  { separator: true },
  { label: "Addresses" },
  { separator: true },
  { label: "Saved Cards" },
  { separator: true },
  {
    label: "Logout",
    command: () => {
      auth.logout();
    },
  },
]);
const auth = useAuthStore();
// 👉 Functions
const toggle = (event: any) => {
  if (auth.isAuth) {
    menu.value.toggle(event);
  } else navigateTo("/auth/signin");
};
</script>
<template>
  <!---------------------------- System bar ------------------------------->
  <div class="system-bar flex justify-between items-center py-1">
    <p class="text-white text-sm font-normal">
      Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
    </p>
    <Select
      v-model="selectedLang"
      :options="languages"
      optionLabel="name"
      option-value="name"
      pt:root:style="background-color: transparent !important; border: none !important;"
      pt:label:class="text-white text-sm"
      pt:dropdown:class="text-white text-sm"
      pt:option:class="list-option"
    />
  </div>
  <!-- -------------------------header container ------------------------- -->
  <div class="header-container">
    <Toolbar
      pt:root:class="toolbar-container px-0 border-none	"
      pt:start:class="gap-2"
      pt:center:class="gap-6"
    >
      <template #start>
        <img alt="logo" src="/logo/coloredLogo.png" class="h-10" />
        <img alt="turkish" src="/logo/coloredTurkish.png" class="h-6" />
      </template>

      <template #center>
        <NuxtLink
          v-for="item in toolbarItems"
          :key="item.name"
          :to="item.link"
          class="text-sm font-medium"
          >{{ item.name }}</NuxtLink
        >
      </template>

      <template #end>
        <Inplace pt:display:class="p-0 hover:bg-inherit">
          <template #display>
            <!-- <Button type="button" icon="pi pi-search" variant="text" rounded /> -->
            <i class="pi pi-search header-icons rounded-full cursor-pointer" />
          </template>
          <template #content="{ closeCallback }">
            <IconField>
              <InputText
                v-model="searchWord"
                placeholder="What are you looking for ?"
                class="py-3 text-xs bg-[#F5F5F5] border-none min-w-[250px] w-full"
              />
              <InputIcon
                class="pi pi-search text-main-color cursor-pointer"
                @click="closeCallback"
              />
            </IconField>
          </template>
        </Inplace>
        <NuxtLink to="/wishlist" class="header-icons rounded-full">
          <i class="pi pi-heart" />
        </NuxtLink>
        <NuxtLink to="/shoppingcart" class="header-icons rounded-full">
          <i class="pi pi-shopping-bag" />
        </NuxtLink>
        <i
          class="pi pi-user header-icons rounded-full cursor-pointer"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="account_menu"
        />
        <Menu
          ref="menu"
          id="account_menu"
          :model="accountItems"
          :popup="true"
          pt:root:class="account-menu"
          pt:itemlabel:class="text-sm"
        />
      </template>
    </Toolbar>
  </div>
  <Divider class="m-0" />
</template>
<style lang="scss" src="@/assets/scss/components/layouts/header.scss" scoped />

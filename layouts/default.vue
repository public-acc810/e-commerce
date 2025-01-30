<script lang="ts" setup>

</script>
<template>
  <div class="flex flex-col min-h-screen">
    <LayoutHeader />
    <div class="body-content grow py-20">
      <slot></slot>
    </div>
    <LayoutFooter />
  </div>
</template>

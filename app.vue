<script setup>
const isLoading = useLoadingState();
</script>
<template>
  <div>
    <NuxtRouteAnnouncer />
    <ConfirmDialog></ConfirmDialog>
    <UiLoadingBlock :blocked="isLoading" />
    <NuxtLoadingIndicator
      :height="5"
      color="var(--second-color)"
      errorColor="red"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

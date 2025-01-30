<script setup lang="ts">
// 👉 Data
const forms: any = ref({
  signIn: true,
  forgetPassword: false,
  resetPassword: false,
});

// 👉 Methods
const setActiveForm = (activeFormKey: string) => {
  for (const key in forms.value) {
    forms.value[key] = key === activeFormKey;
  }
};

</script>
<template>
  <div class="login-container">
    <AuthSignInForm v-if="forms.signIn" @change-form="setActiveForm" />
    <AuthForgetPasswordForm v-else-if="forms.forgetPassword" @change-form="setActiveForm" />
    <AuthResetPasswordForm v-else-if="forms.resetPassword" @change-form="setActiveForm" />
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/auth/auth.scss" scoped />

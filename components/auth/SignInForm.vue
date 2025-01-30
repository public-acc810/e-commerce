<script setup lang="ts">
// 👉 Data
const initialValues = ref({
  email: "",
  password: "",
});
const auth = useAuthStore();
const isLoading = useLoadingState();
const { $toast } = useNuxtApp();
// 👉 Functions
const resolver = ({ values }: any) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = [{ message: "email is required." }];
  }

  if (!values.password) {
    errors.password = [{ message: "password is required." }];
  }
  return {
    errors,
  };
};
const onFormSubmit = async (event: any) => {
  if (event.valid) {
    isLoading.value = true;
    const res = await auth.login({
      email: event.states.email.value,
      password: event.states.password.value,
    });
    if (res) {
      $toast.error(res.value.data.message);
    }
    isLoading.value = false;
  }
};
</script>
<template>
  <AuthCardForm>
    <template #header>
      <p class="text-main-color">Welcome back!</p>
      <h3 class="text-4xl font-bold text-main-color">
        Sign in to your account
      </h3>
    </template>
    <template #content>
      <Form
        v-slot="$form"
        :initialValues
        :resolver
        :validateOnBlur="true"
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full"
        pt:root:class="form-container"
      >
        <div class="flex flex-col gap-1">
          <label>Email Address*</label>
          <InputText
            name="email"
            type="text"
            placeholder="Enter Your email"
            fluid
          />
          <Message
            v-if="$form.email?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.email.error.message }}</Message
          >
        </div>
        <div class="flex flex-col gap-1">
          <label>Password*</label>
          <Password
            type="text"
            name="password"
            placeholder="Enter Your password"
            :feedback="false"
            toggleMask
            fluid
            pt:root:class="password-container"
          />
          <Message
            v-if="$form.password?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.password.error.message }}</Message
          >
        </div>
        <div class="flex justify-end">
          <Button
            label="Forget password ?"
            variant="text"
            class="text-second-color text-sm font-normal hover:bg-inherit p-0"
            @click="$emit('changeForm', 'forgetPassword')"
          />
        </div>
        <UiButtonComponent
          type="submit"
          class="auth-button"
          content="Sign in"
        />
      </Form>
    </template>
    <template #footer>
      <p class="text-main-color text-sm font-medium mt-2">
        Don’t have an account ?
        <NuxtLink class="text-second-color" to="/auth/signUp">
          Sign up</NuxtLink
        >
      </p>
    </template>
  </AuthCardForm>
</template>

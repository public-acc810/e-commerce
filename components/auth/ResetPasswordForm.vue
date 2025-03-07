<script lang="ts" setup>
// 👉 props
const props = defineProps(["payload"]);
// 👉 Emits
const emit = defineEmits(["changeForm"]);
// 👉 Data
const initialValues = ref({
  password: "",
  confirmPassword: "",
});
const auth = useAuthStore();
const isLoading = useLoadingState();
const { $toast } = useNuxtApp();
// 👉 Methods
const resolver = ({ values }: any) => {
  const errors: any = { confirmPassword: [] };

  if (!values.password) {
    errors.password = [{ message: "password is required." }];
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = [{ message: "confirm password is required." }];
  }
  if (values.password && values.password !== values.confirmPassword) {
    errors.confirmPassword = [{ message: "your passwords are not identical" }];
  }
  return {
    errors,
  };
};
const onFormSubmit = async (event: any) => {
  if (event.valid) {
    isLoading.value = true;
    const res = await auth.resetPassword({
      email: props.payload.email,
      code: props.payload.code,
      password: event.states.password.value,
      password_confirmation: event.states.confirmPassword.value,
    });
    if (res.status == "fail") {
      $toast.error(res.message);
    } else {
      $toast.success(res.message);
      emit("changeForm", "signIn", null);
    }
    isLoading.value = false;
  }
};
</script>
<template>
  <AuthCardForm>
    <template #header>
      <h3 class="text-4xl font-bold text-main-color">Reset your password</h3>
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
          <label>Password</label>
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
        <div class="flex flex-col gap-1">
          <label>Confirm password</label>
          <Password
            type="text"
            name="confirmPassword"
            placeholder="Confirm your password"
            :feedback="false"
            toggleMask
            fluid
            pt:root:class="password-container"
          />
          <Message
            v-if="$form.confirmPassword?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.confirmPassword.error.message }}</Message
          >
        </div>
        <UiButtonComponent
          type="submit"
          class="auth-button"
          content="Reset my password"
        />
      </Form>
    </template>
    <template #footer>
      <p class="text-main-color text-sm font-medium mt-2">
        Already have an account?
        <Button
          label="Sign in"
          variant="text"
          class="text-second-color text-sm font-medium hover:bg-inherit p-0"
          @click="$emit('changeForm', 'signIn', null)"
        />
      </p>
    </template>
  </AuthCardForm>
</template>

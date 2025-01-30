<script lang="ts" setup>
// 👉 Data
const forgetFormActive = ref(true);
const forgetForm = ref({
  email: "",
});
const emit = defineEmits(["changeForm"]);
const resetForm = ref({
  passcode: "",
});
// 👉 Functions
const resolveForgetForm = ({ values }: any) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = [{ message: "email is required." }];
  }
  return {
    errors,
  };
};
const resolveResetForm = ({ values }: any) => {
  const errors: any = {};

  if (!values.passcode) {
    errors.passcode = [{ message: "Incorrect Code" }];
  }
  return {
    errors,
  };
};
const onForgetFormSubmit = ({ valid }: any) => {
  if (valid) {
    forgetFormActive.value = false;
  }
};
const onResetFormSubmit = ({ valid }: any) => {
  if (valid) {
    emit("changeForm", "resetPassword");
  }
};
</script>
<template>
  <AuthCardForm>
    <template #header>
      <h3 class="text-4xl font-bold text-main-color">Forget password ?</h3>
      <p class="text-main-color text-center">
        Enter your email to send you a message to recover your password easily.
      </p>
    </template>
    <template #content>
      <Form
        v-slot="$forgetForm"
        :initialValues="forgetForm"
        :resolver="resolveForgetForm"
        :validateOnBlur="true"
        @submit="onForgetFormSubmit"
        class="flex flex-col gap-4 w-full"
        pt:root:class="form-container"
        v-if="forgetFormActive"
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
            v-if="$forgetForm.email?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $forgetForm.email.error.message }}</Message
          >
        </div>
        <UiButtonComponent type="submit" class="auth-button" content="Send code" />
      </Form>
      <Form
        v-slot="$resetForm"
        :initialValues="resetForm"
        :resolver="resolveResetForm"
        @submit="onResetFormSubmit"
        class="flex flex-col gap-4 w-full"
        pt:root:class="form-container"
        v-else
      >
        <div class="flex flex-col gap-1">
          <label>Enter code</label>
          <InputOtp
            name="passcode"
            integerOnly
            size="large"
            pt:root:class="otp-container"
          />
          <Message
            v-if="$resetForm.passcode?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $resetForm.passcode.error?.message }}</Message
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
      <p
        class="text-main-color text-sm font-medium mt-2"
        v-if="forgetFormActive"
      >
        Already have an account?
        <Button
          label="Sign in"
          variant="text"
          class="text-second-color text-sm font-medium hover:bg-inherit p-0"
          @click="$emit('changeForm', 'signIn')"
        />
      </p>
      <p class="text-main-color text-sm font-medium mt-2" v-else>
        You didn’t receive any code yet ?
        <Button
          label="Resend it"
          variant="text"
          class="text-second-color text-sm font-medium hover:bg-inherit p-0"
          @click="() => console.log('send')"
        />
      </p>
    </template>
  </AuthCardForm>
</template>

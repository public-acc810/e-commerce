<script setup lang="ts">
// 👉 Data
const initialValues = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  confirmPassword: "",
});
const termsCheck = ref(false);
const selectedCity = ref(null);
const cities = ref([
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
]);
const auth = useAuthStore();
const isLoading = useLoadingState();
const { $toast } = useNuxtApp();
// 👉 Functions
const resolver = ({ values }: any) => {
  const errors: any = { confirmPassword: [] };
  if (!values.firstName) {
    errors.firstName = [{ message: "please enter your first name." }];
  }
  if (!values.lastName) {
    errors.lastName = [{ message: "please enter your first name." }];
  }
  if (!values.email) {
    errors.email = [{ message: "please enter your email." }];
  }
  if (!values.phone) {
    errors.phone = [{ message: "please enter your phone." }];
  }
  if (!values.address) {
    errors.address = [{ message: "please enter your address." }];
  }
  if (!values.password) {
    errors.password = [{ message: "please enter your password." }];
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = [{ message: "please confirm your password." }];
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
    const res = await auth.register({
      ...event.states,
    });
    if (res) {
      $toast.error(res.value.data.message);
    }
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="register-container">
    <AuthCardForm>
      <template #header>
        <p class="text-main-color text-base font-medium">Welcome !</p>
        <h3 class="text-4xl font-bold text-main-color">Create an account</h3>
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
          <div class="flex gap-3">
            <div class="flex flex-col gap-1">
              <label>First Name*</label>
              <InputText
                name="firstName"
                type="text"
                placeholder="Enter Your first name"
                fluid
              />
              <Message
                v-if="$form.firstName?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.firstName.error.message }}</Message
              >
            </div>
            <div class="flex flex-col gap-1">
              <label>Last Name*</label>
              <InputText
                name="lastName"
                type="text"
                placeholder="Enter Your last name"
                fluid
              />
              <Message
                v-if="$form.lastName?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.lastName.error.message }}</Message
              >
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label>Email*</label>
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
            <label>Address*</label>
            <Textarea
              name="address"
              type="text"
              placeholder="Enter Your address"
              style="resize: none"
              fluid
            />
            <Message
              v-if="$form.address?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.address.error.message }}</Message
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
          <div class="flex flex-col gap-1">
            <label>Confirm Password*</label>
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
          <div class="flex justify-start gap-2">
            <Checkbox
              v-model="termsCheck"
              binary
              id="terms-check"
              pt:root:class="checkbox-container"
            />
            <label for="terms-check"
              >I agree to
              <NuxtLink class="text-second-color" to="/"
                >the Terms & Conditions</NuxtLink
              ></label
            >
          </div>
          <UiButtonComponent
            :disabled="!termsCheck"
            type="submit"
            class="auth-button"
            content="Create my account"
          />
        </Form>
      </template>
      <template #footer>
        <p class="text-main-color text-sm font-medium mt-2">
          Already have an account?
          <NuxtLink class="text-second-color" to="/auth/signIn">
            Sign in</NuxtLink
          >
        </p>
      </template>
    </AuthCardForm>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/auth/auth.scss" scoped />

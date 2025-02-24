<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
// 👉 Data
const auth = useAuthStore();
const globalStore = useGlobalStore();
const countries = globalStore.countries;
const initialValues = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone_code: countries[0].phone_code,
  phone: "",
  address: "",
  password: "",
  password_confirmation: "",
});
const termsCheck = ref(false);
const isLoading = useLoadingState();
const { $toast } = useNuxtApp();
// 👉 Functions
const resolver = ({ values }: any) => {
  const errors: any = { password_confirmation: [] };
  if (!values.first_name) {
    errors.first_name = [{ message: "please enter your first name." }];
  }
  if (!values.last_name) {
    errors.last_name = [{ message: "please enter your first name." }];
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
  if (!values.password_confirmation) {
    errors.password_confirmation = [
      { message: "please confirm your password." },
    ];
  }
  if (values.password && values.password !== values.password_confirmation) {
    errors.password_confirmation = [
      { message: "your passwords are not identical" },
    ];
  }
  return {
    errors,
  };
};
const onFormSubmit = async (event: any) => {
  if (event.valid) {
    isLoading.value = true;
    const res = await auth.register({
      first_name: event.states.first_name.value,
      last_name: event.states.last_name.value,
      email: event.states.email.value,
      phone_code: event.states.phone_code.value,
      phone: event.states.phone.value,
      address: event.states.address.value,
      password: event.states.password.value,
      password_confirmation: event.states.password_confirmation.value,
    });
    if (res.status == "fail") {
      $toast.error(res.message);
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
                name="first_name"
                type="text"
                placeholder="Enter Your first name"
                fluid
              />
              <Message
                v-if="$form.first_name?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.first_name.error.message }}</Message
              >
            </div>
            <div class="flex flex-col gap-1">
              <label>Last Name*</label>
              <InputText
                name="last_name"
                type="text"
                placeholder="Enter Your last name"
                fluid
              />
              <Message
                v-if="$form.last_name?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.last_name.error.message }}</Message
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
            <label>Phone number*</label>
            <InputGroup>
              <InputGroupAddon
                :class="{ 'p-invalid': $form.phone?.invalid }"
                class="p-0 border-r-0 rounded-xl border-border-color"
              >
                <Select
                  name="phone_code"
                  :options="countries"
                  optionLabel="phone_code"
                  optionValue="phone_code"
                  class="border-none pr-0"
                  pt:label:class="p-0"
                  pt:dropdownicon:class="text-black"
                />
                <Divider
                  layout="vertical"
                  class="before:border-black ml-0"
                  style="min-height: 50%"
                />
              </InputGroupAddon>
              <InputText
                name="phone"
                type="text"
                v-keyfilter.num
                placeholder="Enter Your phone"
                class="border-l-0 rounded-xl"
                fluid
              />
            </InputGroup>
            <Message
              v-if="$form.phone?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.phone.error.message }}</Message
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
              name="password_confirmation"
              placeholder="Confirm your password"
              :feedback="false"
              toggleMask
              fluid
              pt:root:class="password-container"
            />
            <Message
              v-if="$form.password_confirmation?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.password_confirmation.error.message }}</Message
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
          <NuxtLink class="text-second-color" to="/auth/sign-in">
            Sign in</NuxtLink
          >
        </p>
      </template>
    </AuthCardForm>
  </div>
</template>
<style lang="scss" src="@/assets/scss/components/auth/auth.scss" scoped />

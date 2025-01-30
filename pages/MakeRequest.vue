<script setup></script>
<template>
  <Card
    class="px-10 mx-auto"
    style="width: 590px"
    pt:root:class="shadow-none border-none"
    pt:header:class="flex flex-col items-start gap-2"
    pt:body:class="pt-6 px-0"
    pt:footer:class="mt-6"
  >
    <template #header>
      <h3 class="text-4xl font-bold text-main-color">
        Seeking an unavailable product?
      </h3>
      <p class="text-main-color text-base font-medium">
        "Let us know, and we'll work on getting it for you soon!"
      </p>
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
          <label>Product category*</label>
          <Select
            v-model="selectedCategory"
            :options="categories"
            optionLabel="name"
            class="w-full"
            name="productCategory"
            placeholder="Select category"
          />
          <Message
            v-if="$form.productCategory?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.productCategory.error.message }}</Message
          >
        </div>
        <div class="flex flex-col gap-1">
          <label>Product name*</label>
          <InputText
            name="productName"
            type="text"
            placeholder="Enter product name"
            fluid
          />
          <Message
            v-if="$form.productName?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.productName.error.message }}</Message
          >
        </div>
        <div class="flex flex-col gap-1">
          <label>Message*</label>
          <Textarea
            name="message"
            type="text"
            placeholder="Enter Subject"
            style="resize: none"
            rows="7"
            fluid
          />
          <Message
            v-if="$form.message?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.message.error.message }}</Message
          >
        </div>
      </Form>
    </template>
    <template #footer>
      <UiButtonComponent
        class=" py-3 w-full rounded-lg"
        content="Make a request"
      />
    </template>
  </Card>
</template>
<style src="@/assets/scss/components/auth/auth.scss" scoped></style>

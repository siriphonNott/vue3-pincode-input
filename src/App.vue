<script setup>
import VuePincodeInput from "./plugin/PincodeInput.vue";
import { reactive } from "vue";

const pincode = reactive({
  default: "",
  custom: "",
});
</script>

<template>
  <main class="main-wrapper">
    <h1>Vue3 Pincode Input</h1>
    <div class="default shadow">
      <h2>Default</h2>
      <hr />
      <VuePincodeInput v-model="pincode.default" :digits="4" autofocus />
      <div class="preview">pincode: {{ pincode.default }}</div>
      <div class="code-preview">
        {{ `<VuePincodeInput v-model="pincode" />` }}
      </div>
    </div>
    <div class="custom shadow">
      <h2>Custom</h2>
      <hr />
      <VuePincodeInput
        v-model="pincode.custom"
        input-class="rounded-full w-18 h-18 text-3xl text-gray-500 border-2 border-gray-200 shadow"
        success-class="border-2 border-green-400"
        spacing-class="mr-2"
      />
      <div class="preview">pincode: {{ pincode.custom }}</div>
      <div class="code-preview">
        {{ `<VuePincodeInput
          v-model="pincode"
          input-class="rounded-full w-18 h-18 text-3xl text-gray-500 border-2 border-gray-200 shadow"
          success-class="border-2 border-green-400"
          spacing-class="mr-2"
          autofocus
        />` }}
      </div>
      <div class="default shadow">
        <h2>Preview secure</h2>
        <hr />
        <VuePincodeInput
          v-model="pincode.default"
          :digits="4"
          :preview="200"
          secure
        />
        <div class="preview">pincode: {{ pincode.default }}</div>
        <div class="code-preview">
          {{ `<VuePincodeInput v-model="pincode" :preview="200" secure />` }}
        </div>
      </div>
    </div>
  </main>
  <footer>
    Make with ❤️ by &nbsp;
    <a href="https://www.npmjs.com/~siriphonnot" target="_blank">NottDev</a>
  </footer>
</template>

<style scoped>
.main-wrapper {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
@media screen and (max-width: 480px) {
  .main-wrapper {
    padding: 15px;
  }
}

.main-wrapper .default,
.main-wrapper .custom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 1px gray dotted;
  border-radius: 0.5rem;
}
.main-wrapper hr {
  width: 100%;
  border-bottom: none;
  border-top: 1px solid #cdcdcd;
  margin-bottom: 1rem;
}

.preview {
  background-color: #f0f0f0;
  min-width: 8rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
.code-preview {
  background: #1b1d22;
  border-radius: 5px;
  padding: 2rem;
  color: #ccc;
  max-width: 800px;
  width: 100%;
  white-space: pre-wrap;
}
footer {
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

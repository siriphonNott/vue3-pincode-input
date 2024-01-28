<template>
  <div class="vue-pincode-input-wrapper">
    <input
      v-for="(_, index) in inputs"
      :key="index"
      :ref="`${baseRefName}${index}`"
      v-model.trim="inputs[index]"
      :type="secure ? 'password' : 'tel'"
      :placeholder="placeholder"
      maxlength="1"
      class="vue-pincode-input"
      :class="[inputClasses, spacingClass]"
      @focus="focusedInputIndex = index"
      @keydown.delete="hadleDelete(index, $event)"
      @keydown="hadleKeyDown($event, index)"
    />
  </div>
</template>

<script>
export default {
  name: "PincodeInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    digits: {
      type: Number,
      default: 4,
    },
    placeholder: {
      type: String,
      default: "",
    },
    secure: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: "",
    },
    successClass: {
      type: String,
      default: "",
    },
    spacingClass: {
      type: String,
      default: "",
    },
    preview: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      baseRefName: "vue-pincode-input",
      focusedInputIndex: 0,
      watchers: {},
      inputs: this.initialInputs(),
    };
  },
  computed: {
    inputClasses() {
      return [
        this.inputClass || "default",
        this.isValid ? this.successClass : "",
      ].join(" ");
    },
    isValid() {
      return this.inputs.join("").length === this.digits;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      if (this.autofocus) {
        this.$refs["vue-pincode-input0"] &&
          this.$refs["vue-pincode-input0"][0].focus();
      }
    });
  },
  beforeDestroy() {
    this.unwatchInputs();
  },
  methods: {
    init() {
      this.inputs = this.initialInputs();
      for (let index in this.inputs) {
        this.setInputWatcher(index);
      }
    },
    focusPreviousInput() {
      if (!this.focusedInputIndex) return;
      this.focusInputByIndex(this.focusedInputIndex - 1);
    },
    focusNextInput() {
      if (this.focusedInputIndex === this.digits - 1) return;
      this.focusInputByIndex(this.focusedInputIndex + 1);
    },
    focusInputByIndex(index) {
      const ref = `${this.baseRefName}${index}`;
      const el = this.$refs[ref];
      if (el) {
        el[0].focus();
        el[0].select();
      }
      this.focusedInputIndex = index;
    },
    hadleKeyDown(e) {
      switch (e.keyCode) {
        /* left arrow key */
        case 37:
          return this.focusPreviousInput();
        /* right arrow key */
        case 39:
          return this.focusNextInput();
        default:
          break;
      }
      const currVal = this.inputs[this.focusedInputIndex];
      if (currVal) return (this.inputs[this.focusedInputIndex] = "");
      if (this.preview && this.secure) {
        e.target.type = "tel";
        setTimeout(() => {
          e.target.type = "password";
        }, this.preview);
      }
    },
    setInputWatcher(index) {
      const watchingProperty = `inputs.${index}`;
      this.watchers[watchingProperty] = this.$watch(
        watchingProperty,
        (newVal, oldVal) => this.hadleInputChange(index, newVal, oldVal)
      );
    },
    isInputValid(str, allowEmpty = true) {
      if (!str) {
        return allowEmpty ? str === "" : false;
      }
      return !!str.match("^\\d{1}$");
    },
    hadleInputChange(index, newVal, oldVal) {
      this.$emit("update:modelValue", this.inputs.join(""));
      if (!this.isInputValid(newVal, false)) {
        this.inputs[index] = "";
        return;
      }
      // Check all input filled
      if (+index === this.digits - 1) {
        const inputNotFillIndex = this.inputs.findIndex((v) => !v);
        inputNotFillIndex !== -1 && this.focusInputByIndex(inputNotFillIndex);
        return;
      }
      this.focusNextInput();
    },
    handleFocus(ref) {
      this.$refs[ref][0].setSelectionRange(1, 1);
    },
    pinfocus(ref) {
      this.$refs[ref][0].focus();
    },
    hadleDelete(index, e) {
      const isThisCellFilled = this.inputs[index].length;
      if (!isThisCellFilled) {
        this.focusPreviousInput();
        e.preventDefault();
      }
    },
    initialInputs() {
      return this.modelValue
        ? this.modelValue.length <= this.digits
          ? [
              ...this.modelValue,
              ...[...Array(this.digits - this.modelValue.length)].map(() => ""),
            ]
          : [...this.modelValue.slice(0, this.digits)]
        : [...Array(this.digits)].map(() => "");
    },
    reset() {
      this.unwatchInputs();
      this.init();
    },
    unwatchInputs() {
      const watchers = Object.keys(this.watchers);
      watchers.forEach((name) => this.watchers[name]());
    },
  },
};
</script>

<style>
.vue-pincode-input-wrapper {
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
}
.vue-pincode-input-wrapper.is-success .vue-pincode-input {
  border: 1px solid #62c633;
}

.vue-pincode-input-wrapper.is-error .vue-pincode-input {
  border: 1px solid #da3945;
}

.vue-pincode-input-wrapper .vue-pincode-input {
  text-align: center;
  vertical-align: middle;
}

.vue-pincode-input-wrapper .vue-pincode-input.default {
  width: 65px;
  height: 65px;
  border: 1px solid #c4c4c4;
  font-size: 1.8rem;
  transition: all 0.3s;
}

.vue-pincode-input-wrapper .vue-pincode-input.default:focus {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.vue-pincode-input-wrapper .vue-pincode-input.default:not(:last-child) {
  margin-right: 0.5rem;
}

.vue-pincode-input-wrapper .vue-pincode-input:focus {
  outline-style: none;
}
</style>

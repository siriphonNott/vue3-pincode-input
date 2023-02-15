# vue3-pincode-input

> Pincode input component for Vue 3 [Live demo](https://siriphonnott.github.io/vue-pincode-input/)

![vue3-pincode-input](https://siriphonnott.github.io/vue-pincode-input/banner.png)


## Table of Contents

* [___Demo___](#demo)
* [___Features___](#features)
* [___Usage___](#usage)
* [___Props___](#props)
* [___Authors && Contributors___](#authors-&&-Contributors)
* [___License___](#license)

## Demo

Demo on [GitHub Pages](https://siriphonnott.github.io/vue-pincode-input/)

## Features

- Be lightweight, powerful and easy to use
- Support for add your custom class
- Override-friendly styles
- Configurable length (pincode length)
- Auto moving focus when filling
- Auto moving focus when deleting
- Call for native numeric keyboard on mobile
- Optional secure mode (password input type)
- Can add class for pincode input
- Can add success class of pincode input
- Support Vue 3 only

## Usage

```
  npm i vue3-pincode-input
```

or with yarn

```
  yarn add vue3-pincode-input
```

Import for use component:

```
import VuePincodeInput from 'vue3-pincode-input';
```

```
<VuePincodeInput v-model="pincode" />
```

Also can use your class for custom component [See more props](#props)

```
<VuePincodeInput
  v-model="pincode"
  input-class="rounded-full w-18 h-18 text-3xl text-gray-500 border-2 border-gray-200 shadow"
  success-class="border-2 border-green-400"
  spacing-class="mr-2"
  autofocus
/>
```

**Attention**: you should use _'input.vue-pincode-input'_ instead _'.vue-pincode-input'_ in order to rule specificity was higher

```
<style>
div.vue-pincode-input-wrapper {
  // any styles you want for wrapper
}

input.vue-pincode-input {
  // any styles you want for each input
}
<style>
```

## Props

<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th style="width: 100px;">Name</th>
            <th style="width: 50px;">Type</th>
            <th style="width: 50px;">Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>digits</td>
            <td>Number</td>
            <td>4</td>
            <td>length of pincode</td>
        </tr>
        <tr>
            <td>autofocus</td>
            <td>Boolean</td>
            <td>true</td>
            <td>auto focus first input</td>
        </tr>
       <tr>
            <td>placeholder</td>
            <td>String</td>
            <td></td>
            <td>placeholder pincode input</td>
        </tr>
         <tr>
            <td>secure</td>
            <td>Boolean</td>
            <td>false</td>
            <td>password input type</td>
        </tr>
         <tr>
            <td>inputClass</td>
            <td>String</td>
            <td></td>
            <td>class for pincode input</td>
        </tr>
        <tr>
            <td>successClass</td>
            <td>String</td>
            <td></td>
             <td>class for pincode input success</td>
        </tr>
         <tr>
            <td>spacingClass</td>
            <td>String</td>
            <td></td>
             <td>class for spacing  between input</td>
        </tr>
    </tbody>
</table>

## Authors && Contributors

- [siriphonnot](https://github.com/siriphonnott)

## License

[The MIT License](http://opensource.org/licenses/MIT)

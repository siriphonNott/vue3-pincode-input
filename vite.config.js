import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3400,
    host: "localhost",
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/plugin/main.js"),
      name: "VuePincodeInput",
      // the proper extensions will be added
      fileName: "vue-pincode-input",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
        // Rename
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css')
            return 'main.css';
          return assetInfo.name;
        },
      },
    },
  },
});

import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  //配置代理，解决跨域问题
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", //后台服务所在源
        changeOrigin: true, //是否修改源
        rewrite: (path) => path.replace(/^\/api/, ""), //替换路径
      },
    },
  },
});

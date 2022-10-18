import { ConfigEnv, defineConfig, loadEnv, UserConfigExport } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            ...env,
          },
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 此处也可设置直角、边框色、字体大小等
            // 'primary-color': '#645AFF',
            "primary-color": "#3377FF",
            "menu-bg": "transparent",
            "menu-inline-submenu-bg": "transparent",
            "menu-item-color": "rgba(255,255,255,0.5)",
            "menu-item-active-border-width": "0",
            "menu-item-active-bg":
              "linear-gradient(270deg, rgba(51,119,255,0.3) 0%, rgba(51,119,255,0.8) 100%)",
            "menu-item-active-danger-bg":
              "linear-gradient(270deg, rgba(51,119,255,0.3) 0%, rgba(51,119,255,0.8) 100%)",
            "menu-item-selected": "red",
            "table-header-bg": "#FAFAFA",
            "table-header-color": "#000",
            // "layout-sider-background": "#F3F3FF",
          },
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"), //  __dirname 和 path 显示红色的波浪线需要安装插件npm i @types/node -S
      },
    },
    server: {
      port: 3000,
      open: false,
      host: true,
      https: false,
      proxy: {
        "/main": {
          target: "http://192.168.5.133:8080/",
          rewrite: (path) => path.replace(/^\/main/, ""),
          changeOrigin: true,
        },
      },
    },
  });
};

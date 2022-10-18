import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "ant-design-vue/dist/antd.css";
import Antd, { ConfigProvider } from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import "./assets/css/common.less";

// start();
const root = createApp(App);
window.XE.ready().then(function startup() {
  root.use(store).use(router).use(Antd).use(ConfigProvider).mount("#App");
});

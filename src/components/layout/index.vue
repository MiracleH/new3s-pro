<template>
  <a-layout-header style="background: #fff; padding: 0" v-if="!systemIndex">
    <Headers></Headers>
  </a-layout-header>
  <a-layout class="layout-body" style="height: 100%">
    <a-layout-sider v-if="systemType === '0'">
      <Menu></Menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content v-if="systemType === '0'">
        <a-breadcrumb
          separator=""
          style="margin-top: -10px; margin-bottom: 10px"
        >
          <a-breadcrumb-item>系统配置</a-breadcrumb-item>
          <a-breadcrumb-separator />
          <span v-for="item in breadcrumbData" :key="item.path">
            <a-breadcrumb-item href="">{{ item.name }}</a-breadcrumb-item>
          </span>
        </a-breadcrumb>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import Menu from "./menu/index.vue";
import Headers from "./header/index.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
const store = useStore();
const route = useRoute();
const systemType = computed(() => store.getters["layout/getSysType"]);
const menulist = computed(() => store.getters["menu/getmenulist"]);

let systemIndex = ref(false);
watch(
  () => route.path,
  () => {
    checkRouter();
  }
);

interface menuDataType {
  children?: menuDataType[];
  hidden?: string;
  name: string;
  path: string;
  oldPath?: string;
}
// 递归改造菜单列表
const getAllMenu = (list: menuDataType[], path: string) => {
  let data: menuDataType[] = [];
  list.map((res: menuDataType) => {
    data.push({
      name: res.name,
      path: path + res.path,
      oldPath: res.path,
    });
    if (res.children) {
      data.push(...getAllMenu(res.children, path + res.path + "/"));
    }
  });
  return data;
};

let breadcrumbData = ref<menuDataType[]>([]);

const checkRouter = () => {
  const allMenu = getAllMenu(menulist.value, "");
  const routePathArray = route.path.split("/").filter(Boolean);
  breadcrumbData.value = [];
  routePathArray.map((res: string) => {
    let data = allMenu.find((e) => {
      return e.oldPath == res;
    });

    if (data) {
      breadcrumbData.value.push(data!);
    }
  });

  switch (route.path) {
    case "/portal/":
      systemIndex.value = true;
      break;
    default:
      systemIndex.value = false;
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

/* meau背景色 */
.ant-layout-sider {
  background: #242e44;
}

.layout-body {
  min-height: calc(100vh - 48px) !important;
}

.ant-layout-content {
  margin: 24px 16px;
  min-height: 280px;
}

.full {
  height: 100vh;
}

#photoelectric {
  height: calc(100vh - 48px);
}
</style>

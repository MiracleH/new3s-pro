<template>
  <a-menu
    class="system-menu"
    v-model:selectedKeys="selectedKeys"
    @openChange="onOpenChange"
    :open-keys="openKeys"
    theme="dark"
    mode="inline"
  >
    <div v-for="item in menulist[0].children" :key="item.path">
      <MenuItem :menuInfo="item"></MenuItem>
    </div>
  </a-menu>
</template>
<script lang="ts" setup>
import { defineComponent, ref, watch, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import MenuItem from "./menu-item.vue";
defineComponent({
  name: "Menu",
});

const route = useRoute();
const store = useStore();

let selectedKeys = ref<any[]>([route.path]);

let openKeys = ref<string[]>([]);

const menulist = computed(() => store.getters["menu/getmenulist"]);
const routerlist = computed(() => {
  let arr: string[] = [];
  menulist.value.map((res: any) => {
    if (res.children.length > 1) {
      arr.push(res.path);
    }
  });
  return arr;
});

const onOpenChange = (arr: string[]) => {
  const latestOpenKey = arr.find((key) => openKeys.value.indexOf(key) === -1);

  if (routerlist.value.indexOf(latestOpenKey!) === -1) {
    openKeys.value = arr;
  } else {
    openKeys.value = latestOpenKey ? [latestOpenKey] : [];
  }
};
onMounted(() => {
  selectedKeys.value = [route.name];
}),
  // 监听路由变化改变选中key
  watch(
    () => route.name,
    (newVal) => {
      selectedKeys.value = [newVal];
    }
  );
</script>

<template>
  <div>
    <template v-if="props.menuInfo?.children?.length === 0">
      <a-menu-item @click="linkurl(props.menuInfo?.name || '')" :key="props.menuInfo?.name"
        v-if="props.menuInfo?.hidden === '0'">
        <iconShow :iconName="props.menuInfo.icon"></iconShow>
        {{  props.menuInfo?.name  }}
      </a-menu-item>
    </template>
    <template v-else>
      <a-sub-menu :key="props.menuInfo?.name" :title="title">
        <template #title>
          <iconShow :iconName="props.menuInfo.icon"></iconShow>
          {{  props.menuInfo?.name  }}
        </template>
        <template v-for="item in props.menuInfo?.children">
          <!-- 递归生成菜单 -->
          <MenuItem :menuInfo="item">
          </MenuItem>
        </template>
      </a-sub-menu>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, PropType } from "vue";
import { RouteRecordName, RouteRecordRaw, useRouter } from "vue-router";
import iconShow from "@/components/iconShow.vue"
defineComponent({
  name: "MenuItem",
});
const router = useRouter();
const props = defineProps({
  menuInfo: {
    type: Object,
  },
});
const linkurl = (name: RouteRecordName) => {
  router.push({
    name,
  });
};
</script>

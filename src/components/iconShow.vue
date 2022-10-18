<template>
  <icon
    v-if="iconName.slice(0, 4) == 'our-'"
    :style="{ color: '#000', verticalAlign: 'text-top', marginTop: '3px' }"
  >
    <template #component>
      <img style="width: 14px" :src="getAssetsImages(iconName + '.svg')" />
    </template>
  </icon>
  <component style="width: 14px" :is="antIconsData[iconName]" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import icons from "../utils/icons.json";
import * as antIcons from "@ant-design/icons-vue";
import Icon, { HomeOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "IconShow",
  components: {
    Icon,
    HomeOutlined,
  },
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const iconArr = ref<string[]>(icons);
    const visible = ref<boolean>(false);
    const searchValue = ref("");
    const antIconsData = <any>antIcons;

    const iconList = ref([
      {
        src: "our-index.svg",
        name: "our-index",
      },
      {
        src: "our-defent.svg",
        name: "our-defent",
      },
      {
        src: "our-fault.svg",
        name: "our-fault",
      },
      {
        src: "our-record.svg",
        name: "our-record",
      },
      {
        src: "our-route.svg",
        name: "our-route",
      },
      {
        src: "our-log.svg",
        name: "our-log",
      },
      {
        src: "our-log.svg",
        name: "our-log",
      },
      {
        src: "our-statistics.svg",
        name: "our-statistics",
      },
      {
        src: "our-inspection.svg",
        name: "our-inspection",
      },
    ]);

    const getAssetsImages = (name: string) => {
      return new URL(`/src/assets/svg/${name}`, import.meta.url).href; //本地文件路径
    };

    return {
      visible,
      iconArr,
      searchValue,
      antIconsData,
      iconList,
      getAssetsImages,
    };
  },
});
</script>

<style scoped>
.icon-box {
  overflow: auto;
  font-size: 20px;
  width: 250px;
  height: 230px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
  justify-content: center;
}

.icon-content {
  width: 45px;
  height: 40px;
  margin: 5px;
  cursor: pointer;
  text-align: center;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.icon-content:hover {
  background: #1890ff;
}
</style>

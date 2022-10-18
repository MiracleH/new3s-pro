<template>
  <a-popover :trigger="trigger" v-model:visible="visible">
    <template #title>
      <a-input-search
        v-model:value="searchValue"
        placeholder="输入英文关键词进行搜索"
        @change="filterIcon"
      />
    </template>

    <template #content>
      <div class="icon-box">
        <div
          v-for="item in iconList"
          :key="item.name"
          @click="handleClick(item.name)"
          class="icon-content"
          :style="{ background: icon === item.name ? '#268961' : '#666' }"
        >
          <icon :style="{ color: '#000' }">
            <template #component>
              <img :src="getAssetsImages(item.src)" />
            </template>
          </icon>
        </div>

        <div
          v-for="(item, index) in iconArr"
          :key="index"
          @click="handleClick(item)"
          class="icon-content"
          :style="{ background: icon === item ? '#268961' : '' }"
        >
          <component :is="antIconsData[item]" />
        </div>
      </div>
    </template>
    <slot name="iconSelect"></slot>
  </a-popover>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import icons from "../utils/icons.json";
import * as antIcons from "@ant-design/icons-vue";
import Icon, { HomeOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "IconPicker",
  components: {
    Icon,
    HomeOutlined,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    //自定义触发方式
    trigger: {
      type: String,
      default: "click",
      validator: function (value: string) {
        return ["click", "hover", "focus"].indexOf(value) !== -1;
      },
    },
  },

  setup(props, context) {
    const iconArr = ref<string[]>(icons);
    const visible = ref<boolean>(false);
    const searchValue = ref("");
    const antIconsData = <any>antIcons;

    const handleClick = (icon: any): void => {
      context.emit("update:icon", icon);
      visible.value = false;
    };

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
    /**
     * 进行搜索过滤
     */
    const filterIcon = () => {
      if (searchValue.value) {
        iconArr.value = icons.filter((item) =>
          item.toLowerCase().includes(searchValue.value.toLowerCase())
        );
      } else {
        iconArr.value = icons;
      }
    };

    watch(visible, () => {
      searchValue.value = "";
      iconArr.value = icons;
    });

    return {
      visible,
      iconArr,
      handleClick,
      searchValue,
      filterIcon,
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

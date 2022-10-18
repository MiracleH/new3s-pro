<template>
  <div class="header-card">
    <a-row :gutter="16">
      <a-col
        class="gutter-row"
        :span="item.col! || 5"
        v-for="item in props.inputList"
      >
        <a-form-item
          class="queryItem"
          :label="item.name"
          :name="item.key"
          v-if="item.type == headerType[0]"
          :rules="item.rules"
        >
          <a-input v-model:value="queryData[item.key]" />
        </a-form-item>
        <a-form-item
          class="queryItem"
          :label="item.name"
          :name="item.key"
          v-else-if="item.type == headerType[1]"
          :rules="item.rules"
        >
          <a-select
            v-model:value="queryData[item.key]"
            :options="item.selectOption"
            @change="handleChange(item.key)"
          >
          </a-select>
        </a-form-item>
        <a-form-item
          class="queryItem"
          :label="item.name"
          :name="item.key"
          v-else-if="item.type == headerType[3]"
          :rules="item.rules"
        >
          <a-switch v-model:checked="queryData[item.key]" />
        </a-form-item>
        <a-form-item
          class="queryItem"
          :label="item.name"
          :name="item.key"
          v-else-if="item.type == headerType[888]"
          :rules="item.rules"
        >
          <slot :name="item.slotName" :title="item.name" :key="item.key"></slot>
        </a-form-item>
      </a-col>

      <a-col :span="4">
        <a-button type="primary" @click="search">搜索</a-button>
        &nbsp;
        <a-button @click="reloadForm">重置</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import { headerType } from "@/components/template/enumType";
import { queryInputType } from "@/types";
const emit = defineEmits(["selectChange", "search", "reloadData"]);
const props = defineProps<{ inputList: queryInputType[] }>();

const formVal = computed(() => {
  let arr: any = {};
  props.inputList.map((res: queryInputType) => {
    arr[res.key] = null;
  });
  return arr;
});

let queryData = ref({
  ...formVal.value,
});

const reloadForm = () => {
  queryData.value = { ...formVal.value };
  emit("reloadData", {});
  emit("search", {});
};

const handleChange = (data: string) => {
  emit("selectChange", data);
};

const search = () => {
  emit("search", queryData.value);
};
</script>

<style scoped lang="less">
.header-card {
  background: #fff;
  width: 100%;
  // height: 60px;
  padding: 20px;
}

.queryItem {
  margin-bottom: 0px !important;
}
</style>

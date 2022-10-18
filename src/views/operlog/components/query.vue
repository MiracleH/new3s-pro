<template>
  <a-form ref="queryFormRef" :model="props.query" @finish="onFinish">
    <a-row :gutter="24">
      <a-col :span="6">
        <a-form-item label="操作模块" name="title">
          <a-input
            v-model:value="props.query.title"
            placeholder="输入操作模块"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="操作人员" name="operName">
          <a-input
            v-model:value="props.query.operName"
            placeholder="输入操作人员"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="业务类型" name="businessType">
          <a-select
            v-model:value="props.query.businessType"
            placeholder="选择业务类型"
          >
            <a-select-option
              v-for="(item, index) in businessTypeList"
              :key="index"
              :value="item.value"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="4" offset="2">
        <a-button type="primary" html-type="submit">搜索</a-button>
        <a-button style="margin: 0 8px" html-type="submit" @click="resetForm"
          >重置</a-button
        >
        <a style="font-size: 14px" @click="expand = !expand">
          更多
          <template v-if="expand">
            <CaretUpOutlined />
          </template>
          <template v-else>
            <CaretDownOutlined />
          </template>
        </a>
      </a-col>
    </a-row>
    <a-row :gutter="24" v-if="expand">
      <a-col :span="6" :style="{ marginTop: '10px' }">
        <a-form-item label="操作状态" name="status">
          <a-select
            v-model:value="props.query.status"
            placeholder="选择操作状态"
          >
            <a-select-option value="0">正常</a-select-option>
            <a-select-option value="1">异常</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="6" :style="{ marginTop: '10px' }">
        <a-form-item label="操作时间" name="operTime">
          <a-range-picker
            :style="{ width: '100%' }"
            v-model:value="props.query.operTime"
            valueFormat="YYYY-MM-DD"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { IQueryFormData } from "@/types/operlog";
import { ref } from "vue";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons-vue";
import { businessTypeList } from "@/constants";
const props = defineProps<{ query: Partial<IQueryFormData> }>();
const emit = defineEmits(["search"]);
const queryFormRef = ref();
const expand = ref<boolean>(false);
const onFinish = () => {
  emit("search");
};
const resetForm = () => {
  queryFormRef.value.resetFields();
};
</script>

<style scoped lang="less"></style>

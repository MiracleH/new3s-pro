<template>
  <a-form ref="queryFormRef" :model="props.query" @finish="onFinish">
    <a-row :gutter="24">
      <a-col :span="6">
        <a-form-item label="用户名称" name="userName">
          <a-input
            v-model:value="props.query.userName"
            placeholder="输入用户名称"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="登录IP" name="ipaddr">
          <a-input
            v-model:value="props.query.ipaddr"
            placeholder="输入登录IP"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="登录状态" name="status">
          <a-select
            v-model:value="props.query.status"
            placeholder="选择登录状态"
          >
            <a-select-option value="0">正常</a-select-option>
            <a-select-option value="1">异常</a-select-option>
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
        <a-form-item label="登录时间" name="loginTime">
          <a-range-picker
            :style="{ width: '100%' }"
            v-model:value="props.query.loginTime"
            valueFormat="YYYY-MM-DD"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { IQueryFormData } from "@/types/logininfor";
import { ref } from "vue";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons-vue";
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

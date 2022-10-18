<template>
  <a-form ref="queryFormRef" :model="props.query" @finish="onFinish">
    <a-row :gutter="24">
      <a-col :span="6">
        <a-form-item label="角色名称" name="roleName">
          <a-input
            v-model:value="props.query.roleName"
            placeholder="输入角色名称"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="角色状态" name="status">
          <a-select
            v-model:value="props.query.status"
            placeholder="选择角色状态"
          >
            <a-select-option value="0">正常</a-select-option>
            <a-select-option value="1">停用</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="5" offset="7">
        <a-button type="primary" html-type="submit">搜索</a-button>
        <a-button style="margin: 0 8px" html-type="submit" @click="resetForm"
          >重置</a-button
        >
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { IQueryFormData } from "@/types/role";
import { ref } from "vue";
const props = defineProps<{ query: Partial<IQueryFormData> }>();
const emit = defineEmits(["search"]);
const queryFormRef = ref();
const onFinish = () => {
  emit("search");
};
const resetForm = () => {
  queryFormRef.value.resetFields();
};
</script>

<style scoped lang="less"></style>

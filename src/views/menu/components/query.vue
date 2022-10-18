<template>
  <a-form ref="queryFormRef" :model="props.query" @finish="onFinish">
    <a-row :gutter="24">
      <a-col :span="6">
        <a-form-item label="菜单名称" name="menuName">
          <a-input
            v-model:value="props.query.menuName"
            placeholder="输入菜单名称"
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="4" offset="14">
        <a-button type="primary" html-type="submit">搜索</a-button>
        <a-button style="margin: 0 8px" html-type="submit" @click="resetForm"
          >重置</a-button
        >
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { IQueryFormData } from "@/types/menu";
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

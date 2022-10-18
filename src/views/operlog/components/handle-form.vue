<template>
  <a-form
    :model="props.formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 16 }"
    ref="formRef"
  >
    <a-form-item label="请求方法" name="method">
      {{ props.formData.method }}
    </a-form-item>
    <a-form-item label="请求方式" name="requestMethod">
      {{ props.formData.requestMethod }}
    </a-form-item>
    <a-form-item label="请求url" name="operUrl">
      {{ props.formData.operUrl }}
    </a-form-item>
    <a-form-item label="请求参数" name="operParam">
      {{ props.formData.operParam }}
    </a-form-item>
    <a-form-item label="返回参数" name="jsonResult">
      {{ props.formData.jsonResult }}
    </a-form-item>
    <a-form-item label="错误消息" name="errorMsg">
      {{ props.formData.errorMsg }}
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { IHandleFormData } from "@/types/operlog";
import { ref } from "vue";
const formRef = ref();
const props = defineProps<{
  formData: Partial<IHandleFormData>;
}>();
const emit = defineEmits(["rform"]);
emit("rform", formRef);
</script>

<style scoped lang="less"></style>

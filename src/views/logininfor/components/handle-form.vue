<template>
  <a-form
    :model="props.formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 16 }"
    ref="formRef"
  >
    <a-form-item
      label=""
      name=""
      :rules="[{ required: true, message: '' }]"
    >
      <a-input v-model:value="props.formData" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { IHandleFormData } from "@/types/logininfor";
import { ref } from "vue";
const formRef = ref();
const props = defineProps<{
  formData: Partial<IHandleFormData>;
}>();
const emit = defineEmits(["rform"]);
emit("rform", formRef);
</script>

<style scoped lang="less"></style>

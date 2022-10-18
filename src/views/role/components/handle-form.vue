<template>
  <a-form
    :model="props.formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 16 }"
    ref="formRef"
  >
    <a-form-item
      label="角色权限"
      name="roleKey"
      :rules="[{ required: true, message: '请输入角色权限' }]"
    >
      <a-input v-model:value="props.formData.roleKey" />
    </a-form-item>
    <a-form-item
      label="角色名称"
      name="roleName"
      :rules="[{ required: true, message: '请输入角色名称' }]"
    >
      <a-input v-model:value="props.formData.roleName" />
    </a-form-item>
    <!-- <a-form-item
      label="权限菜单"
      name="menuIds"
      :rules="[{ required: true, message: '请选择权限菜单' }]"
    >
      <a-tree-select
        v-model:value="props.formData.menuIds"
        style="width: 100%"
        placeholder="请选择权限菜单"
        tree-checkable
        allow-clear
        :tree-data="getTreeData(props.menuList)"
      >
      </a-tree-select>
    </a-form-item> -->
    <!-- <a-form-item
      label="角色排序"
      name="roleSort"
      :rules="[{ required: true, message: '请输入角色排序' }]"
    >
      <a-input-number
        style="width: 100%"
        v-model:value="props.formData.roleSort"
      />
    </a-form-item> -->
    <a-form-item
      label="状态"
      name="status"
      :rules="[{ required: true, message: '选择' }]"
    >
      <a-switch
        v-model:checked="props.formData.status"
        checkedValue="0"
        unCheckedValue="1"
      />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { IListData } from "@/types/menu";
import { IHandleFormData } from "@/types/role";
import { TreeSelectProps } from "ant-design-vue";
import { onMounted, ref } from "vue";
const formRef = ref();
const props = defineProps<{
  formData: Partial<IHandleFormData>;
  menuList: Array<IListData>;
}>();
const emit = defineEmits(["rform"]);
emit("rform", formRef);
onMounted(() => {});
</script>

<style scoped lang="less"></style>

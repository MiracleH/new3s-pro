<template>
  <a-form
    :model="props.formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 16 }"
    ref="formRef"
  >
    <a-form-item
      label="类型"
      name="menuType"
      :rules="[{ required: true, message: '请选择类型' }]"
    >
      <a-radio-group v-model:value="props.formData.menuType" name="menuType">
        <a-radio value="M">目录</a-radio>
        <a-radio value="C">菜单</a-radio>
        <a-radio value="F">权限</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="名称"
      name="menuName"
      :rules="[{ required: true, message: '请输入名称' }]"
    >
      <a-input v-model:value="props.formData.menuName" />
    </a-form-item>
    <a-form-item
      label="上级节点"
      name="parentId"
      :rules="[{ required: true, message: '请选择上级节点' }]"
    >
      <a-tree-select
        v-model:value="props.formData.parentId"
        style="width: 100%"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        placeholder="请选择上级节点"
        allow-clear
        tree-default-expand-all
        :tree-data="addFirstData(getTreeData(props.listData))"
      >
      </a-tree-select>
    </a-form-item>
    <a-form-item
      v-if="props.formData.menuType === 'M' && props.formData.parentId === 0"
      label="系统类型"
      name="sysType"
      :rules="[{ required: true, message: '请选择系统类型' }]"
    >
      <a-select v-model:value="props.formData.sysType">
        <a-select-option value="0">系统设置</a-select-option>
        <a-select-option value="1">光伏巡检</a-select-option>
        <a-select-option value="2">风机叶片</a-select-option>
        <a-select-option value="3">输电线路</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      v-if="props.formData.menuType !== 'F'"
      label="节点路由"
      name="path"
      :rules="[{ required: true, message: '请输入节点路由' }]"
    >
      <a-input v-model:value="props.formData.path" />
    </a-form-item>
    <!-- <a-form-item v-if="props.formData.menuType === 'C'" label="文件路径" name="component"
      :rules="[{ required: true, message: '请输入权限' }]">
      <a-input v-model:value="props.formData.component" />
    </a-form-item> -->
    <a-form-item
      v-if="props.formData.menuType === 'F'"
      label="权限"
      name="perms"
      :rules="[{ required: true, message: '请输入权限' }]"
    >
      <a-input v-model:value="props.formData.perms" />
    </a-form-item>
    <a-form-item
      label="排序"
      name="orderNum"
      :rules="[{ required: true, message: '请输入排序' }]"
    >
      <a-input-number v-model:value="props.formData.orderNum" />
    </a-form-item>
    <a-form-item
      label="小图标"
      name="icon"
      v-if="props.formData.menuType != 'F'"
    >
      <icon-picker v-model:icon="props.formData.icon">
        <template #iconSelect>
          <a-input v-model:value="props.formData.icon" />
        </template>
      </icon-picker>
    </a-form-item>
    <a-form-item
      label="状态"
      name="visible"
      :rules="[{ required: true, message: '选择' }]"
    >
      <a-switch
        v-model:checked="props.formData.visible"
        checkedValue="0"
        unCheckedValue="1"
      />
    </a-form-item>
    <a-form-item
      label="是否显示"
      name="status"
      v-if="props.formData.menuType === 'C'"
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
import { IHandleFormData, IListData } from "@/types/menu";
import { TreeSelectProps } from "ant-design-vue";
import { ref } from "vue";
import IconPicker from "@/components/icon.vue";
const formRef = ref();
const props = defineProps<{
  formData: Partial<IHandleFormData>;
  listData: Array<IListData>;
}>();
const emit = defineEmits(["rform"]);
emit("rform", formRef);
const getTreeData = (list: Array<IListData>): TreeSelectProps["treeData"] => {
  const tree = list.map((item) => {
    return {
      title: item.menuName,
      value: item.menuId,
      children: getTreeData(item.children),
    };
  });

  return tree;
};
const addFirstData = (
  tree: TreeSelectProps["treeData"]
): TreeSelectProps["treeData"] => {
  return [{ title: "一级菜单", value: 0, children: tree }];
};
</script>

<style scoped lang="less"></style>

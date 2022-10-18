<template>
  <a-tree
    v-model:checkedKeys="props.roleData.menuIds"
    v-model:expandedKeys="expandedKeys"
    checkable
    :tree-data="treedata"
  >
  </a-tree>
  <div v-if="!props.roleData.isDisabled">
    <a-button
      @click="okHandle"
      type="primary"
      :style="{ marginLeft: '50px', marginTop: '30px' }"
      >确定</a-button
    >
    <a-button
      @click="cancalHandle"
      :style="{ marginLeft: '10px', marginTop: '30px' }"
      >取消</a-button
    >
  </div>
</template>

<script setup lang="ts">
import { IListData } from "@/types/menu";
import { TreeProps } from "ant-design-vue";
import { computed, onMounted, ref, watch } from "vue";
const checkedKeys = ref<number[]>([]);
const expandedKeys = ref<number[]>([]);
const props = defineProps<{
  menuList: Array<IListData>;
  roleData: any;
}>();
const treedata = computed(() => {
  return getTreeData(props.menuList);
});
const getTreeData = (list: Array<IListData>): TreeProps["treeData"] => {
  const tree = list.map((item) => {
    return {
      title: item.menuName,
      key: item.menuId,
      children: getTreeData(item.children),
      disabled: props.roleData.isDisabled,
    };
  });
  return tree;
};
watch(
  () => props.menuList,
  () => {
    props.menuList.forEach((item) => {
      expandedKeys.value?.push(item.menuId);
    });
  }
);
const emit = defineEmits(["ok", "cancel"]);
const okHandle = () => {
  emit("ok");
};
const cancalHandle = () => {
  emit("cancel");
};
</script>

<style scoped lang="less"></style>

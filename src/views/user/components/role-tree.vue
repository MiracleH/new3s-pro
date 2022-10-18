<template>
  <a-tree
    v-model:checkedKeys="props.roleData.ownAssocIds"
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
import { TreeProps } from "ant-design-vue";
import { computed, onMounted, ref, watch } from "vue";
const checkedKeys = ref<number[]>([]);
const expandedKeys = ref<number[]>([]);
const props = defineProps<{
  associateList: { label: string; id: number; value: number; children: [] }[];
  roleData: any;
}>();
const treedata = computed(() => {
  return getTreeData(props.associateList);
});
const getTreeData = (
  list: { label: string; id: number; value: number; children: [] }[]
): TreeProps["treeData"] => {
  const tree = list.map((item) => {
    return {
      title: item.label,
      key: item.id,
      children: getTreeData(item.children),
      disabled: props.roleData.isDisabled,
    };
  });
  return tree;
};
watch(
  () => props.associateList,
  () => {
    props.associateList.forEach((item) => {
      expandedKeys.value?.push(item.id);
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

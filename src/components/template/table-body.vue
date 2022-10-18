<template>
  <div class="tableBody">
    <a-table
      :dataSource="props.dataSource"
      :pagination="{ pageSizeOptions: 10, total: props.total }"
      :row-selection="props.rowSelection"
      @change="pageChange"
      :columns="props.tableColumns"
    >
      <template
        v-for="item in columnsSlot"
        v-slot:[item.slots.customRender]="{ record }"
      >
        <slot :name="item.slots.customRender" :lineData="record"></slot>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref } from "vue";
import type { TableColumnsType } from "ant-design-vue";
const props = defineProps<{
  tableColumns: TableColumnsType;
  dataSource: any[];
  total: number;
  rowSelection: string[];
}>();

const columnsSlot = computed(() => {
  return props.tableColumns.filter((res) => {
    return res.slots;
  });
});

const pageChange = (e: {
  current: number;
  pageSize: number;
  pageSizeOptions: number;
  total: number;
}) => {
  emit("pageList", e);
};

const emit = defineEmits(["pageList"]);
</script>

<style lang="less" scoped>
.tableBody {
  // background: #fff;
  // margin-top: 20px;
}
</style>

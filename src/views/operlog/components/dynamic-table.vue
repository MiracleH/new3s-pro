<template>
  <a-table
    :columns="columns"
    :data-source="props.listData.list"
    :pagination="pagination"
    @change="handleTableChange"
    ><template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'key'">
        {{
          index +
          1 +
          (Number(props.paginationData.pageNum) - 1) *
            Number(props.paginationData.pageSize)
        }}
      </template>
      <template v-if="column.key === 'status'">
        <a-badge v-if="record.status === '0'" status="success" text="正常" />
        <a-badge v-if="record.status === '1'" status="error" text="异常" />
      </template>
      <template v-if="column.key === 'businessType'">
        <span>{{ businessType(record.businessType) }}</span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a
            v-if="isPermissions(props.permissionsList, 'auth:operlog:detail')"
            @click="editHandle(record)"
            >详情</a
          >
          <a-divider type="vertical" />
          <a
            v-if="isPermissions(props.permissionsList, 'auth:operlog:remove')"
            @click="deleteHandle(record)"
            >删除</a
          >
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { IListData, IQueryFormData } from "@/types/operlog";
import { computed } from "vue";
import { isPermissions } from "@/utils";
import { businessTypeList } from "@/constants";
const props = defineProps<{
  listData: { list: Array<IListData>; total: number };
  paginationData: Partial<IQueryFormData>;
  permissionsList: [];
}>();
const businessType = computed(() => (value: number) => {
  let text = "";
  businessTypeList.forEach((item) => {
    if (item.value === value) {
      text = item.name;
    }
  });
  return text;
});
const emit = defineEmits(["search", "edit", "delete"]);
const columns = [
  {
    title: "序号",
    key: "key",
  },
  {
    title: "操作模块",
    dataIndex: "title",
    key: "operId",
  },
  {
    title: "操作人员",
    dataIndex: "operName",
    key: "operName",
  },
  {
    title: "业务类型",
    dataIndex: "businessType",
    key: "businessType",
  },
  {
    title: "IP地址",
    dataIndex: "operIp",
    key: "operIp",
  },
  {
    title: "操作时间",
    dataIndex: "operTime",
    key: "operTime",
  },
  {
    title: "操作",
    key: "action",
  },
];
const pagination = computed(() => ({
  total: props.listData.total,
  current: Number(props.paginationData.pageNum),
  pageSize: Number(props.paginationData.pageSize),
  showTotal: (total: number) => `共${total}条`,
}));

const handleTableChange = (page: { pageSize: string; current: number }) => {
  props.paginationData.pageSize = page.pageSize;
  props.paginationData.pageNum = page.current.toString();
  emit("search");
};

const deleteHandle = (record: IListData) => {
  emit("delete", record);
};

const editHandle = (record: IListData) => {
  emit("edit", record);
};
</script>

<style scoped lang="less"></style>

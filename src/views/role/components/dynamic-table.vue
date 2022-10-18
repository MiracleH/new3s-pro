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
        <a-badge v-if="record.status === '1'" status="error" text="停用" />
      </template>
      <template v-else-if="column.key === 'action' && record.roleId !== 1">
        <span>
          <a
            v-if="isPermissions(props.permissionsList, 'auth:role:edit')"
            @click="editHandle(record)"
            >编辑</a
          >
          <a-divider type="vertical" />
          <a
            v-if="isPermissions(props.permissionsList, 'auth:role:edit')"
            @click="roleHandle(record)"
            >菜单权限</a
          >
          <a-divider type="vertical" />
          <a
            v-if="isPermissions(props.permissionsList, 'auth:role:remove')"
            @click="deleteHandle(record)"
            >删除</a
          >
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { IListData, IQueryFormData } from "@/types/role";
import { computed } from "vue";
import { isPermissions } from "@/utils";
const props = defineProps<{
  listData: { list: Array<IListData>; total: number };
  paginationData: Partial<IQueryFormData>;
  permissionsList: [];
}>();
const emit = defineEmits(["search", "edit", "delete", "editRole"]);
const columns = [
  {
    title: "序号",
    key: "key",
  },
  {
    title: "角色名",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
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
const roleHandle = (record: IListData) => {
  emit("editRole", record);
};
</script>

<style scoped lang="less"></style>

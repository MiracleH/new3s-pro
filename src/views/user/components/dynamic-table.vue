<template>
  <a-table
    :columns="columns"
    :data-source="props.listData.list"
    :pagination="pagination"
    @change="handleTableChange"
    ><template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <a-badge v-if="record.status === '0'" status="success" text="正常" />
        <a-badge v-if="record.status === '1'" status="error" text="停用" />
      </template>
      <template v-if="column.key === 'sex'">
        {{ record.sex === "0" ? "男" : "女" }}
      </template>
      <template
        v-else-if="
          column.key === 'action' && record.userId !== 1 && record.userId !== 0
        "
      >
        <a
          v-if="isPermissions(props.permissionsList, 'auth:user:edit')"
          @click="editHandle(record)"
          >编辑</a
        >
        <a-divider type="vertical" />
        <a
          v-if="isPermissions(props.permissionsList, 'auth:user:edit')"
          @click="roleHandle(record)"
          >数据权限</a
        >
        <a-divider type="vertical" />
        <a
          v-if="isPermissions(props.permissionsList, 'auth:user:remove')"
          @click="deleteHandle(record)"
          >删除</a
        >
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { IListData, IQueryFormData } from "@/types/user";
import { computed } from "vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { isPermissions } from "@/utils";
const props = defineProps<{
  listData: { list: Array<IListData>; total: number };
  paginationData: Partial<IQueryFormData>;
  permissionsList: [];
}>();
const emit = defineEmits(["search", "edit", "delete", "editRole"]);
const columns = [
  // {
  //   title: "ID",
  //   dataIndex: "userId",
  //   key: "userId",
  // },
  {
    title: "用户账号",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "用户昵称",
    dataIndex: "nickName",
    key: "nickName",
  },
  {
    title: "账号状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "用户邮箱",
    dataIndex: "email",
    key: "email",
    ellipsis: true,
  },
  {
    title: "用户手机",
    dataIndex: "phonenumber",
    key: "phonenumber",
    ellipsis: true,
  },
  // {
  //   title: "用户性别",
  //   dataIndex: "sex",
  //   key: "sex",
  // },
  // {
  //   title: "备注",
  //   dataIndex: "remark",
  //   key: "remark",
  //   ellipsis: true,
  // },
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

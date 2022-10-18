<template>
  <a-table
    :columns="columns"
    :data-source="props.listData.list"
    :pagination="false"
    ><template #bodyCell="{ column, record }">
      <template v-if="column.key === 'menuType'">
        <span v-if="record.menuType === 'M'">目录</span>
        <span v-else-if="record.menuType === 'C'">菜单</span>
        <span v-else-if="record.menuType === 'F'">权限</span>
      </template>
      <template v-if="column.key === 'visible'">
        <a-badge v-if="record.visible === '0'" status="success" text="正常" />
        <a-badge v-if="record.visible === '1'" status="error" text="停用" />
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a
            v-if="isPermissions(props.permissionsList, 'auth:menu:edit')"
            @click="editHandle(record)"
            >编辑</a
          >
          <a-divider type="vertical" />
          <a
            v-if="isPermissions(props.permissionsList, 'auth:menu:remove')"
            @click="deleteHandle(record)"
            >删除</a
          >
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { IListData, IQueryFormData } from "@/types/menu";
import { computed } from "vue";
import { isPermissions } from "@/utils";
const props = defineProps<{
  listData: { list: Array<IListData>; total: number };
  paginationData: Partial<IQueryFormData>;
  permissionsList: [];
}>();
const emit = defineEmits(["search", "edit", "delete"]);
const columns = [
  {
    title: "ID",
    dataIndex: "menuId",
    key: "menuId",
  },
  {
    title: "名称",
    dataIndex: "menuName",
    key: "menuName",
  },
  {
    title: "类型",
    dataIndex: "menuType",
    key: "menuType",
  },
  {
    title: "状态",
    dataIndex: "visible",
    key: "visible",
  },
  {
    title: "节点路由",
    dataIndex: "path",
    key: "path",
  },
  // {
  //   title: "文件路径",
  //   dataIndex: "component",
  //   key: "component",
  // },
  {
    title: "权限",
    dataIndex: "perms",
    key: "perms",
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

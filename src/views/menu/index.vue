<template>
  <div class="menu">
    <a-card
      class="query-contant"
      v-if="isPermissions(permissionsList, 'auth:menu:query')"
    >
      <QueryForm @search="searchForm" :query="queryFormData"></QueryForm>
    </a-card>
    <a-card title="菜单管理" class="table-contant">
      <template #extra>
        <a-space>
          <a-button
            v-if="isPermissions(permissionsList, 'auth:menu:add')"
            type="primary"
            @click="addHandle"
            >添加</a-button
          >
        </a-space>
      </template>
      <DynamicTable
        v-if="isPermissions(permissionsList, 'auth:menu:list')"
        :listData="listData"
        :paginationData="tableFormData"
        :permissionsList="permissionsList"
        @search="searchTable"
        @edit="editHandle"
        @delete="deleteHandle"
      ></DynamicTable
    ></a-card>
    <a-modal
      v-model:visible="modalData.visible"
      :title="modalData.title"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <AddForm
        v-if="modalData.handleStatus === 0"
        :formData="addFormData"
        @rform="getFormRef"
        :listData="listData.list"
      ></AddForm>
      <EditForm
        v-if="modalData.handleStatus === 1"
        :formData="editFormData"
        @rform="getFormRef"
        :listData="listData.list"
      ></EditForm>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { IQueryFormData } from "@/types/menu";
import { computed, createVNode, onMounted, reactive, Ref } from "vue";
import { useStore } from "vuex";
import QueryForm from "./components/query.vue";
import DynamicTable from "./components/dynamic-table.vue";
import { IListData, IHandleFormData } from "@/types/menu";
import AddForm from "./components/handle-form.vue";
import EditForm from "./components/handle-form.vue";
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { isPermissions } from "@/utils";
const store = useStore();
const queryFormData = reactive<Partial<IQueryFormData>>({});
const tableFormData = reactive<Partial<IQueryFormData>>({
  pageNum: "1",
  pageSize: "10",
});
const listData = reactive<{ list: Array<IListData>; total: number }>({
  list: [],
  total: 0,
});
const permissionsList = computed(() => store.state.login.permissions);
const modalData = reactive<{
  visible: boolean;
  title: string;
  handleStatus: number;
  formRef: Ref | undefined;
}>({
  visible: false,
  title: "",
  handleStatus: 0,
  formRef: undefined,
});
enum HandleStatue {
  ADD,
  EDIT,
  DELETE,
}
const addFormData = reactive<Partial<IHandleFormData>>({
  menuName: "",
  menuType: "M",
  path: "",
  perms: "",
  component: "",
  visible: "0",
  parentId: undefined,
  sysType: undefined,
  status: "0",
  orderNum: 1,
});
const editFormData = reactive<IHandleFormData>({
  menuId: 0,
  menuName: "",
  menuType: "M",
  path: "",
  perms: "",
  component: "",
  visible: "0",
  parentId: undefined,
  sysType: undefined,
  status: "0",
  orderNum: 1,
});
const searchForm = () => {
  getList({
    ...queryFormData,
    ...tableFormData,
  });
};

const searchTable = () => {
  getList({
    ...queryFormData,
    ...tableFormData,
  });
};

const getList = (data: Partial<IQueryFormData>) => {
  store.dispatch("menu/list", data).then(() => {
    listData.list = store.state.menu.list;
  });
};

const addHandle = () => {
  modalData.visible = true;
  modalData.title = "新增";
  modalData.handleStatus = HandleStatue.ADD;
};
const editHandle = (record: IListData) => {
  modalData.visible = true;
  modalData.title = "编辑";
  modalData.handleStatus = HandleStatue.EDIT;
  Object.assign(editFormData, record);
};
const deleteHandle = (record: IListData) => {
  Modal.confirm({
    title: "删除",
    icon: createVNode(ExclamationCircleOutlined),
    content: `是否删除${record.menuName}`,
    okText: "确认",
    cancelText: "取消",
    onOk() {
      deleteConfirm(record.menuId);
    },
  });
};
const getFormRef = (ref: Ref) => {
  modalData.formRef = ref;
};
const addConfirm = () => {
  modalData.formRef.validateFields().then(() => {
    store.dispatch("menu/add", addFormData).then((data) => {
      if (!data) return;
      message.success("添加成功");
      handleCancel();
      getList({
        ...queryFormData,
        ...tableFormData,
      });
    });
  });
};
const editConfirm = () => {
  modalData.formRef.validateFields().then(() => {
    store.dispatch("menu/edit", editFormData).then((data) => {
      if (!data) return;
      message.success("编辑成功");
      handleCancel();
      getList({
        ...queryFormData,
        ...tableFormData,
      });
    });
  });
};
const deleteConfirm = (id: number) => {
  store.dispatch("menu/deletes", [id]).then((data) => {
    if (!data) return;
    message.success("删除成功");
    getList({
      ...queryFormData,
      ...tableFormData,
    });
  });
};
const handleOk = () => {
  switch (modalData.handleStatus) {
    case 0:
      addConfirm();
      break;
    case 1:
      editConfirm();
      break;
    default:
      break;
  }
};
const handleCancel = () => {
  modalData.visible = false;
  modalData.formRef.resetFields();
};
onMounted(() => {
  getList({
    ...queryFormData,
    ...tableFormData,
  });
});
</script>

<style scoped lang="less">
.menu {
  .table-contant {
    margin-top: 20px;
  }
}
</style>

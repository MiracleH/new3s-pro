<template>
  <div class="role">
    <a-row gutter="20">
      <a-col span="14">
        <a-card
          class="query-contant"
          v-if="isPermissions(permissionsList, 'auth:role:query')"
        >
          <QueryForm @search="searchForm" :query="queryFormData"></QueryForm>
        </a-card>
        <a-card title="角色管理" class="table-contant">
          <template #extra>
            <a-space>
              <a-button
                v-if="isPermissions(permissionsList, 'auth:role:add')"
                type="primary"
                @click="addHandle"
                >添加</a-button
              >
            </a-space>
          </template>
          <DynamicTable
            v-if="isPermissions(permissionsList, 'auth:role:list')"
            :listData="listData"
            :paginationData="tableFormData"
            :permissionsList="permissionsList"
            @search="searchTable"
            @edit="editHandle"
            @delete="deleteHandle"
            @editRole="roleHandle"
          ></DynamicTable
        ></a-card>
      </a-col>
      <a-col span="10">
        <a-card class="tree-contant">
          <RoleTree
            :roleData="roleData"
            :menuList="menuList"
            @ok="editRole"
            @cancel="cancelRole"
          ></RoleTree> </a-card
      ></a-col>
    </a-row>
    <a-modal
      v-model:visible="modalData.visible"
      :title="modalData.title"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <AddForm
        v-if="modalData.handleStatus === 0"
        :formData="addFormData"
        :menuList="menuList"
        @rform="getFormRef"
      ></AddForm>
      <EditForm
        v-if="modalData.handleStatus === 1"
        :formData="editFormData"
        :menuList="menuList"
        @rform="getFormRef"
      ></EditForm>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { IQueryFormData } from "@/types/role";
import { computed, createVNode, onMounted, reactive, ref, Ref } from "vue";
import { useStore } from "vuex";
import QueryForm from "./components/query.vue";
import DynamicTable from "./components/dynamic-table.vue";
import RoleTree from "./components/role-tree.vue";
import { IListData, IHandleFormData } from "@/types/role";
import AddForm from "./components/handle-form.vue";
import EditForm from "./components/handle-form.vue";
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { isPermissions } from "@/utils";
const store = useStore();
const queryFormData = reactive<Partial<IQueryFormData>>({
  roleName: "",
  status: undefined,
});
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
  menuIds: [],
  roleKey: "",
  roleName: "",
  status: "0",
});
const editFormData = reactive<IHandleFormData>({
  menuIds: [],
  roleKey: "",
  roleName: "",
  roleSort: 0,
  status: "0",
  roleId: 0,
});
const roleData = reactive({
  menuIds: [],
  isDisabled: true,
  roleId: 0,
});
const menuList = ref([]);
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
  store.dispatch("role/list", data).then(() => {
    listData.list = store.state.role.list;
    listData.total = store.state.role.total;
  });
};

const getMenuList = () => {
  store.dispatch("menu/list").then(() => {
    menuList.value = store.state.menu.list;
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
    content: `是否删除角色${record.roleName}`,
    okText: "确认",
    cancelText: "取消",
    onOk() {
      deleteConfirm(record.roleId);
    },
  });
};
const roleHandle = (record: IListData) => {
  roleData.menuIds = record.menuIds;
  roleData.isDisabled = false;
  roleData.roleId = record.roleId;
};
const getFormRef = (ref: Ref) => {
  modalData.formRef = ref;
};
const addConfirm = () => {
  modalData.formRef.validateFields().then(() => {
    store.dispatch("role/add", addFormData).then((data) => {
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
    store.dispatch("role/edit", editFormData).then((data) => {
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
  store.dispatch("role/deletes", [id]).then((data) => {
    if (!data) return;
    message.success("删除成功");
    getList({
      ...queryFormData,
      ...tableFormData,
    });
  });
};

const editRole = () => {
  store.dispatch("role/edit", roleData).then((data) => {
    if (!data) return;
    message.success("权限修改成功");
    cancelRole();
    getList({
      ...queryFormData,
      ...tableFormData,
    });
  });
};

const cancelRole = () => {
  roleData.roleId = 0;
  roleData.menuIds = [];
  roleData.isDisabled = true;
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
  getMenuList();
});
</script>

<style scoped lang="less">
.role {
  .table-contant {
    margin-top: 20px;
    height: calc(100vh - 48px - 80px - 22px - 100px);
  }
  .tree-contant {
    height: calc(100vh - 48px - 80px - 20px);
    overflow-y: auto;
  }
}
</style>

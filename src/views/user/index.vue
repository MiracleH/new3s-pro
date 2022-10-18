<template>
  <div class="user">
    <a-row gutter="20">
      <a-col span="17"
        ><a-card
          class="query-contant"
          v-if="isPermissions(permissionsList, 'auth:user:query')"
        >
          <QueryForm @search="searchForm" :query="queryFormData"></QueryForm>
        </a-card>
        <a-card title="用户管理" class="table-contant">
          <template #extra>
            <a-space>
              <a-button
                v-if="isPermissions(permissionsList, 'auth:user:add')"
                type="primary"
                @click="addHandle"
                >添加</a-button
              >
            </a-space>
          </template>
          <DynamicTable
            v-if="isPermissions(permissionsList, 'auth:user:list')"
            :listData="listData"
            :paginationData="tableFormData"
            :permissionsList="permissionsList"
            @search="searchTable"
            @edit="editHandle"
            @delete="deleteHandle"
            @editRole="roleHandle"
          ></DynamicTable></a-card
      ></a-col>
      <a-col span="7">
        <a-card class="tree-contant">
          <RoleTree
            :roleData="roleData"
            :associateList="associateList"
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
        :roleList="roleList"
        :associateList="associateList"
        @rform="getFormRef"
      ></AddForm>
      <EditForm
        v-if="modalData.handleStatus === 1"
        :formData="editFormData"
        :roleList="roleList"
        :associateList="associateList"
        @rform="getFormRef"
      ></EditForm>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { IQueryFormData } from "@/types/user";
import { computed, createVNode, onMounted, reactive, ref, Ref } from "vue";
import { useStore } from "vuex";
import QueryForm from "./components/query.vue";
import DynamicTable from "./components/dynamic-table.vue";
import { IListData, IHandleFormData } from "@/types/user";
import AddForm from "./components/handle-form.vue";
import EditForm from "./components/handle-form.vue";
import RoleTree from "./components/role-tree.vue";
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
const roleList = ref([]);
const associateList = ref([]);
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
  email: "",
  phonenumber: "",
  sex: "0",
  userName: "",
  status: "0",
  password: "",
  remark: "",
  roleIds: [],
  roleId: undefined,
  nickName: "",
  ownAssocIds: [],
});
const editFormData = reactive<IHandleFormData>({
  email: "",
  phonenumber: "",
  sex: "0",
  userName: "",
  status: "0",
  password: "",
  remark: "",
  roleIds: [],
  roleId: 0,
  userId: 0,
  nickName: "",
  ownAssocIds: [],
});
const roleData = reactive({
  ownAssocIds: [],
  isDisabled: true,
  userId: 0,
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
  store.dispatch("user/list", data).then(() => {
    listData.list = store.state.user.list;
    listData.total = store.state.user.total;
  });
};

const getRolesList = () => {
  store
    .dispatch("role/list", { pageSize: Number.MAX_SAFE_INTEGER })
    .then(() => {
      roleList.value = store.state.role.list;
    });
};

const getAssociateAll = () => {
  store.dispatch("user/authAssociateAll").then((data) => {
    associateList.value = data;
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
  editFormData.roleId = editFormData.roleIds[0];
};
const deleteHandle = (record: IListData) => {
  Modal.confirm({
    title: "删除",
    icon: createVNode(ExclamationCircleOutlined),
    content: `是否删除`,
    okText: "确认",
    cancelText: "取消",
    onOk() {
      deleteConfirm(record.userId);
    },
  });
};
const roleHandle = (record: IListData) => {
  roleData.userId = record.userId;
  roleData.isDisabled = false;
  roleData.ownAssocIds = record.ownAssocIds;
};
const getFormRef = (ref: Ref) => {
  modalData.formRef = ref;
};
const addConfirm = () => {
  modalData.formRef.validateFields().then(() => {
    addFormData.roleIds = [addFormData.roleId as number];
    store.dispatch("user/add", addFormData).then((data) => {
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
    editFormData.roleIds = [editFormData.roleId as number];
    store.dispatch("user/edit", editFormData).then((data) => {
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
  store.dispatch("user/deletes", [id]).then((data) => {
    if (!data) return;
    message.success("删除成功");
    getList({
      ...queryFormData,
      ...tableFormData,
    });
  });
};
const editRole = () => {
  store.dispatch("user/edit", roleData).then((data) => {
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
  roleData.userId = 0;
  roleData.ownAssocIds = [];
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
  getRolesList();
  getAssociateAll();
});
</script>

<style scoped lang="less">
.user {
  .table-contant {
    margin-top: 20px;
    height: calc(100vh - 48px - 80px - 22px - 90px);
  }
  .tree-contant {
    height: calc(100vh - 48px - 80px - 10px);
    overflow-y: auto;
  }
}
</style>

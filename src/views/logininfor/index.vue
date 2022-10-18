<template>
  <div class="logininfor">
    <a-card
      class="query-contant"
      v-if="isPermissions(permissionsList, 'auth:logininfor:query')"
    >
      <QueryForm @search="searchForm" :query="queryFormData"></QueryForm>
    </a-card>
    <a-card title="" class="table-contant">
      <template #extra>
        <a-space>
          <a-button
            v-if="isPermissions(permissionsList, 'auth:logininfor:clean')"
            type="primary"
            @click="addHandle"
            >清除日志</a-button
          >
        </a-space>
      </template>
      <DynamicTable
        v-if="isPermissions(permissionsList, 'auth:logininfor:list')"
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
      ></AddForm>
      <EditForm
        v-if="modalData.handleStatus === 1"
        :formData="editFormData"
        @rform="getFormRef"
      ></EditForm>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { IQueryFormData } from "@/types/logininfor";
import { computed, createVNode, onMounted, reactive, Ref } from "vue";
import { useStore } from "vuex";
import QueryForm from "./components/query.vue";
import DynamicTable from "./components/dynamic-table.vue";
import { IListData, IHandleFormData } from "@/types/logininfor";
import AddForm from "./components/handle-form.vue";
import EditForm from "./components/handle-form.vue";
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { isPermissions } from "@/utils";
const store = useStore();
const permissionsList = computed(() => store.state.login.permissions);
const queryFormData = reactive<Partial<IQueryFormData>>({});
const tableFormData = reactive<Partial<IQueryFormData>>({
  pageNum: "1",
  pageSize: "10",
});
const listData = reactive<{ list: Array<IListData>; total: number }>({
  list: [],
  total: 0,
});
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
const addFormData = reactive<Partial<IHandleFormData>>({});
const editFormData = reactive<IHandleFormData>({});
const searchForm = () => {
  if (queryFormData.loginTime) {
    queryFormData.beginTime = queryFormData.loginTime[0];
    queryFormData.endTime = queryFormData.loginTime[1];
  } else {
    queryFormData.beginTime = undefined;
    queryFormData.endTime = undefined;
  }
  const searchObject = {
    ...queryFormData,
    ...tableFormData,
  };
  delete searchObject.loginTime;
  getList(searchObject);
};

const searchTable = () => {
  searchForm();
};

const getList = (data: Partial<IQueryFormData>) => {
  store.dispatch("logininfor/list", data).then(() => {
    listData.list = store.state.logininfor.list;
    listData.total = store.state.logininfor.total;
  });
};

const addHandle = () => {
  // modalData.visible = true;
  // modalData.title = "新增";
  // modalData.handleStatus = HandleStatue.ADD;
  Modal.confirm({
    title: "清除日志",
    icon: createVNode(ExclamationCircleOutlined),
    content: `是否清除日志`,
    okText: "确认",
    cancelText: "取消",
    onOk() {
      addConfirm();
    },
  });
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
    content: `是否删除`,
    okText: "确认",
    cancelText: "取消",
    onOk() {
      deleteConfirm(record.infoId);
    },
  });
};
const getFormRef = (ref: Ref) => {
  modalData.formRef = ref;
};
const addConfirm = () => {
  store.dispatch("logininfor/clean").then((data) => {
    if (!data) return;
    message.success("清除成功");
    searchForm();
  });
};
const editConfirm = () => {
  modalData.formRef.validateFields().then(() => {
    store.dispatch("logininfor/edit", editFormData).then((data) => {
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
  store.dispatch("logininfor/deletes", [id]).then((data) => {
    if (!data) return;
    message.success("删除成功");
    searchForm();
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
  searchForm();
});
</script>

<style scoped lang="less">
.logininfor {
  .table-contant {
    margin-top: 20px;
  }
}
</style>

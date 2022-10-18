<template>
  <a-form
    :model="props.formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 16 }"
    ref="formRef"
  >
    <a-form-item
      label="用户账号"
      name="userName"
      :rules="[{ required: true, message: '请输入用户账号' }]"
    >
      <a-input
        :disabled="props.formData.userId || props.formData.userId === 0"
        v-model:value="props.formData.userName"
      />
    </a-form-item>
    <a-form-item
      label="用户密码"
      name="password"
      :rules="[{ required: true, message: '请输入用户账号' }]"
      v-if="!props.formData.userId"
    >
      <a-input-password v-model:value="props.formData.password" />
    </a-form-item>
    <a-form-item
      label="用户昵称"
      name="nickName"
      :rules="[{ required: true, message: '请输入用户昵称' }]"
    >
      <a-input v-model:value="props.formData.nickName" />
    </a-form-item>
    <a-form-item
      label="用户性别"
      name="sex"
      :rules="[{ required: true, message: '请输入用户性别' }]"
    >
      <a-radio-group v-model:value="props.formData.sex" name="sex">
        <a-radio value="0">男</a-radio>
        <a-radio value="1">女</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="用户手机"
      name="phonenumber"
      :rules="[
        { required: true, message: '请输入用户手机' },
        {
          pattern:
            /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
          message: '请输入正确的手机号',
        },
      ]"
    >
      <a-input v-model:value="props.formData.phonenumber" />
    </a-form-item>
    <a-form-item
      label="用户邮箱"
      name="email"
      :rules="[
        { required: true, message: '请输入用户邮箱' },
        {
          pattern:
            /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          message: '请输入正确的邮箱',
        },
      ]"
    >
      <a-input v-model:value="props.formData.email" />
    </a-form-item>
    <!-- <a-form-item
      label="数据权限"
      name="ownAssocIds"
      :rules="[{ required: true, message: '请选择数据权限' }]"
    >
      <a-tree-select
        v-model:value="props.formData.ownAssocIds"
        style="width: 100%"
        placeholder="请选择数据权限"
        tree-checkable
        allow-clear
        :tree-data="getTreeData(props.associateList)"
      >
      </a-tree-select>
    </a-form-item> -->
    <a-form-item
      label="所属角色"
      name="roleId"
      :rules="[{ required: true, message: '请选择所属角色' }]"
    >
      <a-select
        v-model:value="props.formData.roleId"
        style="width: 100%"
        placeholder="请选择所属角色"
        :options="
          roleList.map((item) => ({ label: item.roleName, value: item.roleId }))
        "
      ></a-select>
    </a-form-item>
    <a-form-item
      label="状态"
      name="status"
      :rules="[{ required: true, message: '选择' }]"
    >
      <a-switch
        v-model:checked="props.formData.status"
        checkedValue="0"
        unCheckedValue="1"
      />
    </a-form-item>
    <a-form-item
      label="备注"
      name="remark"
      :rules="[{ required: false, message: '请输入备注' }]"
    >
      <a-input v-model:value="props.formData.remark" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { IListData } from "@/types/role";
import { IHandleFormData } from "@/types/user";
import { TreeSelectProps } from "ant-design-vue";
import { ref } from "vue";
const formRef = ref();
const props = defineProps<{
  formData: Partial<IHandleFormData>;
  roleList: Array<IListData>;
  associateList: { label: string; id: string; value: number; children: [] }[];
}>();
const getTreeData = (
  list: { label: string; id: string; value: number; children: [] }[]
): TreeSelectProps["treeData"] => {
  const tree = list?.map((item) => {
    return {
      title: item.label,
      value: item.id,
      children: getTreeData(item.children),
    };
  });
  return tree;
};
const emit = defineEmits(["rform"]);
emit("rform", formRef);
</script>

<style scoped lang="less"></style>

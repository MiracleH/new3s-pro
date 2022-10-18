<template>
  <a-modal v-model:visible="showModel" :title="props.title" @ok="handleOk">
    <a-form
      :model="formState"
      ref="formRef"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      autocomplete="off"
    >
      <div v-for="item in props.formInput">
        <!-- 普通input -->
        <a-form-item
          class="queryItem"
          :label="item.name"
          :name="item.key"
          v-if="item.type == headerType[0]"
          :rules="item.rules"
        >
          <a-input
            v-model:value="formState[item.key]"
            :placeholder="item.placeholder"
          />
        </a-form-item>
        <!-- 下拉选 -->
        <a-form-item
          class="queryItem"
          :label="item.name"
          :name="item.key"
          v-else-if="item.type == headerType[1]"
          :rules="item.rules"
        >
          <a-select
            v-model:value="formState[item.key]"
            :options="item.selectOption"
            @change="handleChange(item.key)"
            :placeholder="item.placeholder"
          >
          </a-select>
        </a-form-item>
        <!-- 密码输入框 -->
        <a-form-item
          class="queryItem"
          :label="item.name"
          :name="item.key"
          v-else-if="item.type == headerType[2]"
          :rules="item.rules"
        >
          <a-input
            type="password"
            v-model:value="formState[item.key]"
            :placeholder="item.placeholder"
          />
        </a-form-item>
        <a-form-item
          class="queryItem"
          :label="item.name"
          :name="item.key"
          v-else-if="item.type == headerType[888]"
          :rules="item.rules"
        >
          <slot :name="item.slotName" :title="item.name" :key="item.key"></slot>
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { queryInputType } from "@/types/index";
import { headerType } from "@/components/template/enumType";

const emit = defineEmits(["selectChange", "setOutData"]);
const props = defineProps<{ title: string; formInput: queryInputType[] }>();
const showModel = ref<boolean>();

const title = ref<string>();

watch(
  () => props.formInput,
  () => {
    let arr: any = {};
    props.formInput.map((res: queryInputType) => {
      arr[res.key] = res.defentVal || null;
    });

    formState.value = arr;
  },
  { deep: true }
);

let formState = ref<any>();

const handleChange = (key: string) => {
  emit("selectChange", { key, formState: formState.value });
};

const formRef = ref();

watch(
  () => showModel.value,
  (newData) => {
    if (!newData) {
      formRef.value.resetFields();
    }
  }
);

const handleOk = () => {
  formRef.value
    .validateFields()
    .then((res: any) => {
      emit("setOutData", formState.value);
    })
    .catch((err: any) => {
      // setTimeout(() => {
      //     formRef.value.resetFields()
      // }, 2000)
    });
};
defineExpose({
  showModel,
  title,
});
</script>

<style scoped></style>

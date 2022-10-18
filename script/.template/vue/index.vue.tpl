<template>
    <div>
        <headerQuery @search="search"></headerQuery>
        <tableList :tableList="{{moduleName}}List" @addBtn="addBtn" @delById="delById" @pageChange="pageChange" :total="total" @edit="edit"></tableList>
        <formModel title="添加" @addOrEditFrom="addFrom" ref="addModel"></formModel>
        <editModel title="修改" @addOrEditFrom="editModelClick" ref="editFormModel"></editModel>
    </div>
</template>

<script lang='ts' setup>
import { computed, defineComponent, onMounted, ref } from 'vue';
import { tableList, formModel, headerQuery, editModel } from "./components"
import { useStore } from 'vuex';
import { IListData, IHandleFormData } from "@/types/{{moduleName}}"
import { message } from 'ant-design-vue';
const store = useStore();
const {{moduleName}}List = computed<Array<IListData>>(() => store.state.{{moduleName}}.list);
const total = computed<number>(() => store.state.{{moduleName}}.total);

const queryForm = ref()
const search = (data: any) => {
    queryForm.value = data;
    getList()
}

onMounted(async () => {
    getList()
})

const pagenum = ref(1)

const getList = async (query: any = queryForm.value) => {
    await store.dispatch("{{moduleName}}/list", {
        "pageNum": pagenum.value,
        "pageSize": 10,
        "query": {
            ...query
        }
    })
}

const pageChange = (e: any) => {
    pagenum.value = e.current;
    getList();
}

const addModel = ref()

const addBtn = () => {
    addModel.value.modelShowOrHide(true)
}
const addFrom = (data: IHandleFormData) => {
    store.dispatch("{{moduleName}}/add", data).then((res: any) => {
        if (res) {
            message.success("添加盒子成功。")
            getList()
            addModel.value.modelShowOrHide(false)
        }
    })
}

const delById = (data: IListData) => {
    store.dispatch("{{moduleName}}/deletes", [data.id]).then((res: any) => {
        if (res) {
            message.success("删除盒子成功。")
            getList()
        }
    })
}
const editFormModel = ref()
const edit = (data: IListData) => {
    editFormModel.value.modelShowOrHide(true)
    editFormModel.value.editFromInit(data)
}
const editModelClick = (data: IListData) => {
    store.dispatch("{{moduleName}}/edit", data).then((res: any) => {
        if (res) {
            message.success("修改盒子成功。")
            getList()
            editFormModel.value.modelShowOrHide(false)
        }
    })
}
</script>

<style scoped>

</style>
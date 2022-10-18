<template>
    <div class="bodyCard">
        <div class="btnList">
            <a-button @click="addBtnClick" type="primary">
                添加
            </a-button>
        </div>
        <tableBody :dataSource="tables" @pageList="pageList" :tableColumns="tableColumns">
            <template #seting="{lineData}">
                <a-button size="small" type="primary" @click="editBtn(lineData)">编辑</a-button>
                &nbsp;
                <a-popconfirm title="您确定要删除吗?" ok-text="确定" cancel-text="取消" @confirm="del(lineData)">
                    <a-button size="small" danger>删除</a-button>
                </a-popconfirm>
                
            </template>
        </tableBody>
    </div>
</template>

<script lang='ts' setup>
import { computed, defineComponent, ref } from 'vue';
import tableBody from "@/components/template/table-body.vue"
import type { TableColumnsType } from 'ant-design-vue';
import { IListData } from "@/types/{{moduleName}}"

const props = defineProps<{ tableList: Array<IListData> }>()
const tables = computed(() => {
    return props.tableList
})
const tableColumns = ref<TableColumnsType>([
    
])


const emit = defineEmits(["addBtn", "delById","edit","pageChange"])
const pageList = (e:any)=>{
    emit("pageChange", e)
}

const addBtnClick = () => {
    emit("addBtn")
}

const del = ((data: IListData) => {
    emit("delById", data)
})

const editBtn = (data:IListData)=>{
    emit("edit",data)
}
</script>

<style scoped>
.bodyCard {
    padding: 10px;
    background: #fff;
    margin-top: 20px;
}

.btnList {
    text-align: right;
    margin-bottom: 10px;
}
</style>
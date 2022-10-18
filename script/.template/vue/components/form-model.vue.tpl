<template>
    <model :title="title" :formInput="formInput" ref="modelRef" @selectChange="selectChange" @setOutData="setOutData">
    </model>
</template>

<script lang='ts' setup>
import { defineComponent, ref } from 'vue';
import model from "@/components/template/model.vue"
import { queryInputType } from "@/types/index"
import { headerType } from "@/components/template/enumType"
import { IHandleFormData } from "@/types/{{moduleName}}"

const props = defineProps<{ title: string }>()
const modelRef = ref()
const formInput = ref<queryInputType[]>(
    [
        
    ]
)
const editInfo = ref({})
const modelShowOrHide = (type: boolean) => {
    modelRef.value.showModel = type
}

const selectChange = (data: { key: string, formState: any }) => {

}
const emit = defineEmits(["addOrEditFrom"])

const setOutData = (info: IHandleFormData) => {
    emit("addOrEditFrom", { ...editInfo.value, ...info })
}

const editFromInit = (info: any) => {
    editInfo.value = info
    formInput.value.map(res => {
        res.defentVal = info[res.key]
    })
}

defineExpose({
    modelShowOrHide,
    editFromInit
})
</script>

<style scoped>

</style>
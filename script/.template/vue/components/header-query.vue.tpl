<template>
    <headerCard :inputList="inputList" @search="searchClick">
        <!-- <template #test="{title,key}">
            12541124
        </template> -->
    </headerCard>
</template>

<script setup lang='ts' >
import { defineComponent, ref } from 'vue';
import headerCard from "@/components/template/header-card.vue"
import { queryInputType } from "@/types/index"
import { headerType } from "@/components/template/enumType"
const emit = defineEmits(["search"])

const inputList = ref<queryInputType[]>([
    // {
    //     type: headerType[888],
    //     key: "username",
    //     name: "test",
    //     slotName:'test'
    // }
])

const searchClick = (data: any) => {
    emit("search", data)
}
</script>

<style scoped>

</style>
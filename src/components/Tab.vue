<template>
    <div>
        <TabItens 
        :tabNames="tabDataList.tabNameList"
        :tabTexts="tabDataList.tabTextList" 
        :selection="currentTab" 
        @on-selection="select"
        />
    </div>

</template>


<script setup lang="ts">
import TabItens from './TabItens.vue'
import {ref,reactive} from 'vue'
import { tabDataList } from '@/store/tab.store';


const currentTab = ref<number>(0) 

function select(optionIndex: number){
    currentTab.value = optionIndex
    console.log('botao ', currentTab.value)
}

</script>

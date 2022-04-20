
<template>
    <div>
        <TabItens 
        :tabNames="tabNamesL"
        :tabTexts="tabTextL" 
        :selection="currentTab" 
        @on-selection="select"
        />
    </div>

</template>


<script setup lang="ts">
import TabItens from './TabItens.vue'
import {ref,reactive} from 'vue'

const tabsJSON = [{
    tabName: 'tab 1',
    tabText: 'Texto do primeiro tab'
},
{
    tabName: 'tab 2',
    tabText: 'Texto do segundo tab'
},
{
    tabName: 'tab 3',
    tabText: 'Texto do terceiro tab'
},
{
    tabName: 'tab 4',
    tabText: 'Texto do quarto tab'
},
]
    const tabNamesL = tabsJSON.map((tab) => tab.tabName)
    const tabTextL = tabsJSON.map((tab) => tab.tabText)

const currentTab = ref<number>(0) 

function select(optionIndex: number){
    currentTab.value = optionIndex
    console.log('botao ', currentTab.value)
}

</script>

<template>
    <div className = 'tabs'>
        <div className = 'tab'>
             <button v-for="(tab, index) in tabNames" :key="tab" 
            :class="{ selected: index === selection }"
            @click="$emit('onSelection', index)">
            {{ tab }}
        </button>
        </div>
        <div className = 'text'>
            <h2>{{ tabTexts[selection] }}</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import './TabItens.css'
export interface TabProps {
    tabNames: string[]
    tabTexts: string[]
    selection?: number
}

export interface TabEvents {
    (e: 'onSelection', val: number): void
}

defineProps<TabProps>()
defineEmits<TabEvents>()

</script>
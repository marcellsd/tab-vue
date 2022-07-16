import {reactive} from "vue"

export interface TabDataList {
    tabNameList:string[] 
    tabTextList:string[]
}

export const tabDataList = reactive<TabDataList>({tabNameList:[''], tabTextList:['']})
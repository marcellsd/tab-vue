<template>
    <form class="qst-form" @submit.prevent="submit">
        <div>
            <label>Número de Tabs </label>
            <input type="number" :value="tabName.length" @change="changeNumTabs(($event.target as HTMLInputElement).value)" />
            <div className="error">{{ errors.numTabs }}</div>
        </div>
        <div v-for="(tb,i) in tabName" :key="`tabAll_${i}`">
            <div :key="`tabName_${i}`">
                <label>Título </label>
                <input type="text" v-model="tabName[i]"
                @blur="e => touched[`tabName_${i}`] && check((e.target as HTMLInputElement).value, required, `tabName_${i}`)"
                />
                <div className="error">{{ errors[`tabName_${i}`] }}</div>
            </div>
            <div :key="`tabtext_${i}`">
                <label>Conteúdo </label>
                <input type="text" v-model = "tabText[i]"
                @blur="e => touched[`tabText_${i}`] && check((e.target as HTMLInputElement).value, required, `tabText_${i}`)"/>
                <div className="error">{{ errors[`tabText_${i}`] }}</div>
            </div>
        </div>
        <div>
            <div className="buttons">
                <input type="submit" value="Enviar" />
            </div>
        </div>
  </form>
</template>

<script setup lang="ts">
    import {reactive} from 'vue'
    import { tabDataList, type TabDataList } from '../store/tab.store'


    export interface TabEvents{
        (e: 'onSubmit', tabs: TabDataList ): void
    }

    const tabName = reactive<string[]>([''])
    const tabText = reactive<string[]>([''])
    const errors = reactive<{[name: string]:string}>({})
    const touched = reactive<{[name: string]:boolean}>({})

    const emit = defineEmits<TabEvents>()
    
    function touch(name: string, value: boolean = true){
        touched[name] = value
    }

    function setError(name: string, error: string) {
        errors[name] = error
      }

      function changeTabName(index: number, value: string) {
        tabName[index] = value
        touch(`tabName_${index}`)
      }

      function changeTabText(index: number, value: string) {
        tabText[index] = value
        touch(`tabText_${index}`)
      }

    function changeNumTabs(value: string) {
        // cria uma função de validação cujo valor deve estar entre 1 e 10
        const range = inRange(1, 10)
    
        // função de validação combina outras funções de validação
        // o erro atribuído será o da primeira que retornar algum erro, devido ao "ou" (||)
        const validateFunc = (value: string) => required(value) || isInt(value) || range(value)
    
        // se passar no teste de validação, altera o tamanho do array `tabText`
        if (check(value, validateFunc, 'numTabs')) {
          const num = parseInt(value)
          if (num <= tabText.length && num <=tabName.length) { // ou reduz o tamanho do array
            for (let i = num; i < tabText.length; i++) {
              touch(`tabText_${i}`, false) // limpa os indicadores de alteraçao das opções removidas
              setError(`tabText_${i}`, '') // limpa as mensagens de erro das opções removidas
              touch(`tabName_${i}`, false) // limpa os indicadores de alteraçao das opções removidas
              setError(`tabName_${i}`, '') // limpa as mensagens de erro das opções removidas
            }
            tabText.splice(num, tabText.length- num)
            tabName.splice(num, tabName.length - num)
            
          }
          else {  // ou aumenta o tamanho do array com strings vazias nos novos elementos
            const tailName = Array(num - tabName.length).fill('')
            tailName.forEach(n => tabName.push(n))
            const tailText = Array(num - tabText.length).fill('')
            tailText.forEach(t => tabText.push(t))
          }
        }
      }

      function submit() {
         const tabNameOk = tabName
          .map((opt, i) => check(opt, required, `tabName_${i}`))
          .every(o => o)
        const tabTextOk = tabText
          .map((opt, i) => check(opt, required, `tabText_${i}`))
          .every(o => o)
          if (tabNameOk && tabTextOk) {
            emit('onSubmit',{tabNameList: tabName, tabTextList:tabText})
            tabDataList.tabNameList = [...tabName], 
            tabDataList.tabTextList = [...tabText]
          }
        }  

    function required(value:string){
        if(value === undefined || value.trim().length === 0){
            return 'Este é um campo obrigatório'
        }
        return null
    }

    function check(value: string, validateFunc: Function, name:string) {
        const error = validateFunc(value)
        setError(name, error)
        return error === null
    }

    function isInt(value: string) {
        if (value && isNaN(parseInt(value, 10))) {
          return 'Este campo requer um número inteiro'
        }
        return null
      }
    function inRange(min: number, max: number) {
        return (value: string) => {
          const num = parseInt(value, 10)
          const [vmin, vmax] = min > max ? [max, min] : [min, max]
          if (value && (isNaN(num) || num < vmin || num > vmax)) {
            return `Este campo requer um número inteiro entre ${vmin} e ${vmax}`
          }
          return null
        }
    }


</script>

<style>
  .qst-form {
    --label-size: 150px;
    --label-margin: 10px;
    --label-width: calc(var(--label-size) + var(--label-margin));
    --border-size: 1px;
    --border-color: #ccc;
    --border-radius: 5px;
    --input-padding: 5px;
    --input-number-size: 30pt;
    padding: 20px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  .qst-form label {
    width: var(--label-size);
    display: inline-block;
    text-align: right;
    font-weight: bold;
    margin-right: var(--label-margin);
    vertical-align: top;
  }
  .qst-form .error {
    font-style: italic;
    font-size: 10pt;
    color: red;
    margin-left: var(--label-width);
    height: 20pt;
  }
  .qst-form .buttons {
    margin-top: 10px;
    padding-top: 10px;
    border-top: var(--border-size) solid var(--border-color);
    display: flex;
    justify-content: flex-end;
  }
  .qst-form textarea {
    height: 100px;
    margin-bottom: -5pt;
  }
  .qst-form input[type="submit"] {
    padding: 4pt 8pt;
  }
  .qst-form input[type="radio"]:not(:first-child) {
    margin-left: 20px;
  }
  .qst-form input[type="text"],
  .qst-form input[type="number"],
  .qst-form textarea {
    border-radius: var(--border-radius);
    border: var(--border-size) solid var(--border-color);
    padding: var(--input-padding);
  }
  .qst-form input[type="text"],
  .qst-form textarea {
    width: calc(50%);
  }
  .qst-form input[type="number"] {
    width: var(--input-number-size);
  }
</style>
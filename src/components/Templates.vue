<template>
  <div class="templates wrapper">
    <div class="templates-header">
        <h2>Шаблоны</h2>
        <input type="button" value="Создать шаблон" class="yellow-button" @click="modal = true">
        <small :class="{'good' : store.state.message.type === 'good', 'danger': store.state.message.type === 'danger'}" v-if="store.state.message">{{store.state.message.value}}</small>
    </div>
    <section class="templates-search">
      <input type="text" v-model="inputValue" placeholder="Поиск совпадений" class="search">
      <select v-model="status" class="search">
        <option v-for="(value, index) in textMap" :value="index" :key="index">{{value}}</option>
      </select>
    </section>
    <spinner v-if="loading"></spinner>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Текст шаблона</th>
          <th>Категория</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(template, index) in templates" :key="template.id">
          <td>{{index + 1}}</td>
          <td>{{template.templateValue}}</td>
          <td>{{textMap[template.selectValue]}}</td>
          <td class="tdButton" @click="delTemplate(template.id)">Удалить</td>
        </tr>
      </tbody>
    </table>
    <h1 v-if="templates.length === 0">Список пуст</h1>
    <teleport to="body">
      <template-modal v-if="modal" @close="modal = false" @created="modal = false"></template-modal>
    </teleport>
  </div>
</template>

<script>
import TemplateModal from "@/components/TemplateModal";
import {ref, computed, onMounted} from 'vue'
import {useStore} from "vuex";
import Spinner from "@/components/spinner";
export default {
  setup() {
    const textMap = {
      all: 'Все категории',
      abort: 'Отмена обращений',
      close: 'Закрытие обращений',
      update: 'Уточнение информации',
      firewall: 'Межсетевой экран',
      pkzi: 'ПКЗИ'
    }
    const store = useStore()
    const loading = ref(false)
    const modal = ref(false)
    const status = ref('all')
    const inputValue = ref('')
    const templates = computed(() => store.getters['templates'].filter(templates => {
      if (status.value === 'abort' || status.value === 'close' || status.value === 'update' || status.value === 'firewall' || status.value === 'pkzi') {
        return templates.selectValue.includes(status.value)
      } return  templates
    }).filter(templates => {
      if (inputValue.value) {
        return templates.templateValue.toLowerCase().includes(inputValue.value.toLowerCase())
      }
      return  templates
    }))
    const delTemplate = async (id) => {
      await store.dispatch('delTemplate', id)
    }
    onMounted(async () => {
      loading.value = true
      await store.dispatch('loadTemplates')
      loading.value = false
    })
    return {
      modal, store,
      templates, inputValue,
      textMap,
      status, loading, delTemplate
    }
  },
  components: {Spinner, TemplateModal}
}
</script>

<style lang="scss">
@import "../styles/variable";
.templates.wrapper {
  flex-direction: column;
  h2 {
    font-size: $headers;
  }
  .templates-header {
    h2 {
      margin-bottom: 10px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 45px;
    small {
      margin-top: 5px;
    }
  }
  .templates-search {
    display: flex;
    margin: 35px 0 20px 0;
    justify-content: center;
  }
  .table {
    width: 100%;
    margin-bottom: 20px;
    border: 5px solid #fff;
    border-bottom-width: 3px;
    border-collapse: collapse;
    outline: 3px solid #ffd300;
    font-size: 15px;
    background-color: #fff !important;
  }
  .table th {
    font-weight: bold;
    padding: 7px;
    background: $yellowButton;
    border: none;
    text-align: left;
    font-size: 15px;
    border-top: 3px solid #fff;
    border-bottom: 3px solid #ffd300;
  }
  .table td {
    padding: 7px;
    border: none;
    border-top: 3px solid #fff;
    border-bottom: 3px solid #fff;
    font-size: 14px;
    &:last-child {
      cursor: pointer;
      &:hover {
        background-color: $yellowButton;
      }
    }
  }
  .table tbody tr:nth-child(even){
    background: $darkGrey!important;
  }
}
@media (max-width: 768px) {
  .templates-search {
    .search {
      width: 100%;
      &:active, &:hover {
        
      }
    }
  }
}
</style>
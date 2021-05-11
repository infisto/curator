<template>
  <div class="requests wrapper">
    <spinner v-if="loading"></spinner>
    <div class="requests-container">
      <div class="requests-header">
        <h2>Заявки</h2>
        <input type="button" class="yellow-button" value="Создать" @click="modal = true">
        <small :class="{'good' : store.state.message.type === 'good', 'danger' : store.state.message.type === 'error'}" v-if="store.state.message">{{store.state.message.value}}</small>
        <label>
          <select v-model="status" class="search">
            <option value="all">{{textMap.all}}</option>
            <option value="vacation">{{textMap.vacation}}</option>
            <option value="sick">{{textMap.sick}}</option>
            <option value="waiting">{{textMap.waiting}}</option>
            <option value="watchLater">{{textMap.watchLater}}</option>
            <option value="tomorrow">{{textMap.tomorrow}}</option>
          </select>
        </label>
      </div>
      <main>
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Номер заявки</th>
              <th>Дата</th>
              <th>Статус</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(request, index) in requests" :key="request.id">
              <td>{{index + 1}}</td>
              <td>{{request.RequestNumber}}</td>
              <td>{{request.RequestDate}}</td>
              <td>{{textMap[request.RequestStatus]}}</td>
              <td class="tdButton" @click="deleteRequest(request.id)">Удалить</td>
            </tr>
          </tbody>
        </table>
      </main>
      <p v-if="requests.length === 0">Заявок нет</p>
    </div>
    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false" @created="modal = false"></app-modal>
    </teleport>
  </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import AppModal from "@/components/AppModal";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import Spinner from "@/components/spinner";

export default {
  setup() {
    const textMap = {
      all: 'Все заявки',
      vacation: 'В отпуске',
      sick: 'Больничный',
      waiting: 'Ожидается информация',
      watchLater: 'Проверить сегодня',
      tomorrow: 'Посмотреть завтра'
    }
    const router = useRouter()
    const status = ref('all')
    const modal = ref(false)
    const loading = ref(false)
    const requests = computed(() => store.getters['requests'].filter(request => {
      if (status.value === 'vacation' || status.value === 'sick' || status.value === 'waiting' || status.value === 'watchLater' || status.value === 'tomorrow') {
        return request.RequestStatus.includes(status.value)
      }
        return request
    }).sort((a,b) => {
      return new Date(a.RequestDate) - new Date(b.RequestDate)
    }))
    const deleteRequest = async (id) => {
      await store.dispatch('deleteRequest', id)
    }
    const store = useStore()
    onMounted(async () => {
      loading.value = true
      await store.dispatch('loadRequests')
      loading.value = false
    })
    return {
      requests, status, router,
      modal, deleteRequest,
      store, loading, textMap
    }
  },
  components: {
    Spinner,
    AppModal
  },

}
</script>

<style lang="scss">
@import "../styles/variable";
.requests.wrapper {
  display: flex;
  flex-direction: column;
  h2 {
    font-size: $headers;
  }
  p {
    text-align: center;
  }
  .yellow-button {
    margin-bottom: 15px;
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
  .requests-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 45px;
    margin-bottom: 25px;
    h2 {
      margin-bottom: 10px;
    }
    small {
      margin-bottom: 5px;
    }
  }
}
</style>
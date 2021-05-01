<template>
  <div @click="$emit('close')" class="modal-backdrop"></div>
  <div class="requests-modal">
    <h2 v-if="title">{{title}}</h2>
    <form @submit.prevent="onSubmit">
        <input type="text" id="RequestNumber" v-model.trim="RequestNumber" @blur="numberBlur" placeholder="Введите номер заявки" class="fields-data">
        <small class="danger" v-if="numberError">{{numberError}}</small>
        <input type="date" id="RequestDate" v-model="RequestDate" @blur="dateBlur" class="fields-data">
        <small class="danger" v-if="dateError">{{dateError}}</small>
        <select name="" id="RequestStatus" v-model="RequestStatus" @blur="statusBlur" class="fields-data">
          <option value="vacation">В отпуске</option>
          <option value="sick">Больничный</option>
          <option value="waiting">Ожидание информации</option>
          <option value="watchLater">Посмотреть позже</option>
          <option value="tomorrow">Посмотреть завтра</option>
        </select>
      <input type="submit" value="Создать" class="yellow-button" :disabled="isSubmitting || isTooManyAttempts">
      <small v-if="isTooManyAttempts" class="joke">Не спамьте &#128578;</small>
    </form>
  </div>
</template>

<script>
import {useField,useForm} from 'vee-validate'
import * as yup from 'yup'
import {computed, watch} from "vue";
import {useStore} from "vuex";
import Spinner from "@/components/spinner";
export default {
  components: {Spinner},
  props: ['title'],
  emits: ['close', 'created'],
  setup(_, {emit}) {
    const store = useStore()
    const {isSubmitting, handleSubmit, submitCount} = useForm({
      initialValues: {
        RequestStatus: 'waiting'
      }
    })
    const {value: RequestNumber, errorMessage: numberError, handleBlur: numberBlur} = useField(
        'RequestNumber',
        yup.string().trim().required('Поле обязательно для заполнения').min(7, 'Не корректный номер заявки')
    )
    const {value: RequestDate, errorMessage: dateError, handleBlur: dateBlur} = useField('RequestDate', yup.date().required('Поле обязательно для заполнения'))
    const {value: RequestStatus, errorMessage: statusError, handleBlur: statusBlur} = useField('RequestStatus')
    const onSubmit = handleSubmit(async (values) => {
      await store.dispatch('createRequests', values)
      emit('created')
    })
    const isTooManyAttempts = computed(() => submitCount.value >= 3)
    watch(isTooManyAttempts, value => {
      if (value) {
        setTimeout(() => submitCount.value = 0, 3000)
      }
    })
    return {
      RequestStatus, RequestNumber, RequestDate, numberError, numberBlur, dateError, dateBlur, statusError, statusBlur,
      isSubmitting,
      onSubmit, submitCount, isTooManyAttempts
    }
  }
}
</script>

<style lang="scss">
@import "../styles/variable";
.requests-modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 80px;
  left: 35%;
  width: 400px;
  background-color: white;
  box-shadow: 2px 2px 2px black;
  border-radius: 5px;
  h2 {
    margin-top: 15px;
  }
  form {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    .yellow-button {
      margin: 10px 0;
    }
    .fields-data {
      padding: 15px;
      border: none;
      flex: 1;
      background-color: $darkGrey;
      outline: none;
      &:active, &:hover {
        background-color: white;
        border: 1px solid $darkGrey;
        margin: -1px;
      }
    }
  }
}
@media (max-width: 768px) {
  .requests-modal {
    top:25%;
    left:50%;
    transform:translate(-50%, -50%);
    max-width: 300px;
  }
}
</style>
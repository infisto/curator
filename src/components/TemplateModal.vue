<template>
  <div @click="$emit('close')" class="modal-backdrop"></div>
  <div class="modal">
    <h2>Создать шаблон</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-control">
        <textarea placeholder="Введите текст шаблона" id="template" cols="20" rows="3" v-model.trim="templateValue" @blur="templateBlur" class="fields-data"></textarea>
        <small v-if="templateError">{{templateError}}</small>
      </div>
      <div class="form-control">
        <label for="template-type">Тип шаблона</label>
        <select id="template-type" v-model="selectValue" @blur="selectBlur" class="fields-data">
          <option value="abort">Отмена обращений</option>
          <option value="close">Закрытие обращений</option>
          <option value="update">Уточнение информации</option>
        </select>
      </div>
      <input type="submit" value="Создать" class="yellow-button">
    </form>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useField,useForm} from 'vee-validate'
import * as yup from 'yup'

export default {
  emits: ['created', 'close'],
  setup(_, {emit}) {
    const store = useStore()
    const {isSubmitting, handleSubmit} = useForm({
      initialValues: {
        selectValue: 'abort'
      }
    })
    const {value: templateValue, errorMessage: templateError, handleBlur: templateBlur} = useField('templateValue',
      yup.string().trim().required('Поле обязательно для заполнения').min(7)
    )
    const {value: selectValue, errorMessage: selectError, handleBlur: selectBlur} = useField('selectValue')
    const onSubmit = handleSubmit(async (values) => {
      await store.dispatch('createTemplate', values)
      emit('created')
    })
    return {
      templateValue, templateError, templateBlur, onSubmit,
      selectValue, selectError, selectBlur ,store, isSubmitting, handleSubmit
    }
  },

}
</script>

<style lang="scss" scoped>
@import "../styles/variable";
.modal {
  position: absolute;
  top: 80px;
  left: 35%;
  width: 500px;
  background-color: white;
  box-shadow: 2px 2px 2px black;
  border-radius: 5px;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
    .yellow-button {
      margin: 5px 26% 15px;
    }
  }
  h2 {
    margin-top: 10px;
  }
  .form-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    label {
      margin-bottom: 5px;
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
.modal h3 {
  margin-top: 25px;
  text-align: center;
  font-size: 25px;
  text-transform: uppercase;
}
textarea {
  font-size: 18px;
}

.app-button {
  margin: 15px 200px 25px;
}
select {
  font-size: 18px;
}
small {
  color: red;
}
@media (max-width: 768px) {
  .modal {
    max-width: 300px;
    top:25%;
    left:50%;
    transform:translate(-50%, -50%);
  }
}
</style>
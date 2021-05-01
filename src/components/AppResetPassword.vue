<template>
  <div class="auth-wrapper">
    <form class="form" @submit.prevent="resetPassword">
      <h2 class="caption">Восстановление пароля</h2>
      <h3 class="inform-text">Чтобы восстановить доступ к сервису, введите адрес Вашего почтового ящика</h3>
      <div class="fields-wrapper-auth">
        <input type="email" class="fields-data" v-model.trim="emailValue" placeholder="Введите email@gmail.com" @blur="emailBlur">
        <input type="submit" value="Продолжить" class="yellow-button">
      </div>
      <small v-if="emailError" class="fields-data-error">{{emailError}}</small>
      <small v-if="current" class="success">Запрос успешно отправлен!</small>
      <div class="registration-form">
        <div class="register-forgot">
          <p @click="$router.push('/auth')">Отмена</p>
          <p @click="$router.push('/registration')">Зарегистрироваться</p>
        </div>
      </div>
      <p class="inform-text">Не сообщайте логин, пароль и код подтверждения, чтобы этим не воспользовались мошенники.</p>
    </form>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import * as yup from 'yup'
import {useForm, useField} from 'vee-validate'
import {useStore} from 'vuex'
import {ref, computed} from "vue";
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const current = ref(false)
    const message = computed(() => store.state.message)
    const {handleSubmit} = useForm()
    const {value: emailValue, errorMessage: emailError, handleBlur: emailBlur} = useField('email',
        yup.string().trim().required('Введите свой email').email('Введите корректный email')
    )
    const resetPassword = handleSubmit(async values => {
      try {
        await store.dispatch('resetPassword', {...values, requestType:"PASSWORD_RESET"})
        if (!message.value) {
          current.value = true
          setTimeout(() => {
            current.value = false
            router.push('/auth')
          }, 3000)
        }
      } catch (e) {
      }
    })
    return {
      router, store, resetPassword, current, message,
      emailValue, emailError, emailBlur
    }
  },
}
</script>

<style lang="scss">
.yellow-button {
  text-align: center;
}
.success {
  color: forestgreen;
  margin-top: 10px;
  text-align: start;
}
</style>
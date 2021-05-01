<template>
  <div class="auth-wrapper">
    <form class="form" @submit.prevent="registerNewUser">
      <h2 class="caption">Регистрация</h2>
      <h3 class="inform-text">Чтобы получить доступ к сервису, введите адрес Вашего почтового ящика и пароль.</h3>
      <div class="fields-wrapper-auth">
        <input type="email" class="fields-data" v-model.trim="email" placeholder="Введите email@gmail.com" @blur="emailBlur">
        <input type="password" class="fields-data" v-model.trim="password" v-if="email && !emailError" placeholder="Введите пароль" @blur="passwordBlur">
        <input type="password" class="fields-data" v-model.trim="repeatPassword" v-if="password && !passwordError" placeholder="Повторите пароль" @blur="passwordBlur">
        <input type="submit" value="Регистрация" class="yellow-button" :disabled="isSubmitting">
      </div>
      <small v-if="emailError || passwordError" class="fields-data-error">{{emailError || passwordError}}</small>
      <small v-if="passwordMismatch || repeatError" class="fields-data-error">{{repeatError ? repeatError : 'Пароли не совпадают'}}</small>
      <div class="registration-form">
        <div class="register-forgot">
          <p @click="$router.push('/auth')">Отмена</p>
          <p @click="$router.push('/resetPassword')">Забыли пароль?</p>
        </div>
      </div>
      <p class="inform-text">Не сообщайте логин, пароль и код подтверждения, чтобы этим не воспользовались мошенники.</p>
    </form>
  </div>
</template>

<script>
import {useForm, useField} from 'vee-validate'
import * as yup from "yup";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ref} from "vue";

export default {
setup() {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting, submitCount} = useForm()
  const passwordMismatch = ref(false)
  const {value: email, errorMessage: emailError, handleBlur: emailBlur} = useField(
      'email',
      yup.string().trim().required('Пожалуйста введите email').email('Необходимо ввести корректный email')
  )
  const {value: password, errorMessage: passwordError, handleBlur: passwordBlur} = useField(
      'password',
      yup.string().trim().required('Введите пароль').min(6, 'Длина не может быть меньше 6 символов')
  )
  const {value: repeatPassword, errorMessage: repeatError, handleBlur: repeatBlur} = useField(
      'repeatPassword',
      yup.string().trim().required('Повторите пароль').min(6, 'Длина не может быть меньше 6 символов')
  )
  const registerNewUser = handleSubmit(async values => {
    try {
      if (values.password === values.repeatPassword) {
        await store.dispatch('signupNewUser', values)
        await router.push('/auth')
      } else {
        passwordMismatch.value = true
        setTimeout(() => passwordMismatch.value = false, 3000)
      }
    } catch (e) {
      console.log(e)
    }
  })
  return {
    handleSubmit, isSubmitting, submitCount, repeatPassword, repeatError, repeatBlur, passwordMismatch,
    email, emailBlur, emailError,
    password, passwordBlur, passwordError,
    registerNewUser
  }
}
}
</script>

<style lang="scss">
@import "../styles/variable";
.fields-wrapper-auth {
  text-align: center;
}
.yellow-button {
  text-align: center;
}
</style>
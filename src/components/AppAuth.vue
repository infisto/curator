<template>
  <div class="auth-wrapper">
    <form class="form" @submit.prevent="onSubmit">
      <h2 class="caption">Вход в систему</h2>
      <h3>Введите логин</h3>
      <div :class="{'error': store.state.message.type ==='error'}" v-if="store.state.message">
        <p>{{message.value}}</p>
      </div>
      <div class="fields-wrapper-auth">
        <input type="email" class="fields-data" v-model.trim="email" placeholder="Введите email@gmail.com" @blur="emailBlur">
        <input type="password" class="fields-data" v-model.trim="password" v-if="email && !emailError" placeholder="Введите пароль" @blur="passwordBlur">
        <input type="submit" value="Войти" class="yellow-button" :disabled="isSubmitting || isTooManyAttempts">
      </div>
      <small v-if="emailError || passwordError" class="fields-data-error">{{emailError || passwordError}}</small>
      <small v-if="isTooManyAttempts" class="fields-data-error">Вы слишком часто пытаетесь войти в систему. Попробуйте позже</small>
      <div class="registration-form">
        <div class="register-forgot">
          <router-link to="/registration">Зарегистрироваться</router-link>
          <p @click="router.push('/resetPassword')">Забыли пароль?</p>
        </div>
      </div>
      <p class="inform-text">Не сообщайте логин, пароль и код подтверждения, чтобы этим не воспользовались мошенники.</p>
    </form>
  </div>
</template>

<script>
import {computed, watch} from 'vue'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import * as yup from 'yup'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const message = computed(() => store.state.message)
    const {handleSubmit, isSubmitting, submitCount} = useForm()
    const {value: email, errorMessage: emailError, handleBlur: emailBlur} = useField(
        'email',
        yup.string().trim().required('Пожалуйста введите email').email('Необходимо ввести корректный email')
    )
    const {value: password, errorMessage: passwordError, handleBlur: passwordBlur} = useField(
        'password',
        yup.string().trim().required('Введите пароль').min(6, 'Длина не может быть меньше 6 символов')
    )
    const onSubmit = handleSubmit(async values => {
      try {
        await store.dispatch('login', values)
        await router.push('/templates')
      } catch (e) {}
    })
    const isTooManyAttempts = computed(() => submitCount.value >= 3)
    watch(isTooManyAttempts, value => {
      if (value) {
        setTimeout(() => submitCount.value = 0, 3000)
      }
    })
    return {
      email, emailError, emailBlur, store, message,
      password, passwordError, passwordBlur, router,
      onSubmit, isSubmitting, submitCount, isTooManyAttempts
    }
  }
}
</script>

<style lang="scss">
@import "../styles/variable";
.auth-wrapper {
  height: 100%;
  background: linear-gradient(white, $navBackgroundColor);
  text-align: center;
}
.form {
  display: flex;
  flex-direction: column;
  max-width: 608px;
  margin: 75px auto;
  h2 {
    font-size: $headers;
    margin: 25px 0;
  }
  h3, p {
    color: $navLiColor;
  }
  h3 {
    margin-bottom: 25px;
  }
}
.fields-wrapper-auth {
  display: flex;
  border-radius: 10px;
  background-color: $darkGrey;
  input {
    padding: 20px;
  }
  .fields-data {
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
  .yellow-button {
    width: 100px;
    border-radius: 0 5px 5px 0;
  }
}
.fields-data-error {
  margin: 10px 0 10px 0;
  color: $errorColor;
  text-align: start;
}
.register-forgot {
  display: flex;
  justify-content: space-around;
  margin: 35px auto;
  width: 80%;
  a, p {
    color: $navLogout;
    text-transform: uppercase;
    font-size: 14px;
    &:hover {
      color: black;
      cursor: pointer;
    }
  }
}
@media (max-width: 768px) {
  .auth-wrapper {

  }
  .form {
    .inform-text {
      margin: 0 35px 15px 35px;
      font-size: 14px;
    }
    .caption {
      font-size: 25px;
    }
  }
  .fields-wrapper-auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px 35px;
    border-radius: 0;
    input {
      padding: 10px;
    }
    .fields-data {

      &:active, &:hover {

      }
    }
    .yellow-button {
      align-self: center;
      width: 100%;
      border-radius: 0;
    }
  }
  .register-forgot {
    a, p {
      font-size: 12px;
    }
  }
  .fields-data-error {
    margin: 0 35px;
  }
  .error {
    p {
      color: $errorColor;
    }
  }
}
</style>
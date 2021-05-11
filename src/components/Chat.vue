<template>
  <div class="chat-box">
    <div class="chat wrapper" v-if="store.getters.userName">
      <div class="chat-header">{{store.getters.userName}}</div>
      <div class="chat-content">
        <div v-for="message in store.getters.chatMessages" :key="message.id" :class="(message.username === store.getters.userName ? 'chat-message current-user' : 'chat-message')">
          <small>{{message.username}} {{message.date}} {{message.minutes}}</small>
          <p>{{message.text}}</p>
        </div>
        <div class="scrolling" ref="scrolling"></div>
        <spinner v-if="loading"></spinner>
      </div>
      <div class="chat-input">
        <input type="text" placeholder="Написать сообщение..." v-model.trim="messageText" @keydown.enter="sendMessage">
        <svg @click="sendMessage" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve"><g id="telegram"><g><path d="M12.408,28.188c-0.865,0-0.717-0.327-1.016-1.148l-2.54-8.362L28.408,7.076L12.408,28.188z" fill="#ECEFF1"/><path d="M12.408,28.188c0.667,0,0.962-0.305,1.333-0.667l3.556-3.458l-4.436-2.674L12.408,28.188z" fill="#CFD8DC"/><path d="M12.861,21.391l10.747,7.94c1.228,0.676,2.111,0.326,2.417-1.139L30.4,7.577    c0.448-1.796-0.684-2.61-1.858-2.078L2.854,15.405c-1.754,0.703-1.742,1.682-0.32,2.117l6.592,2.058l15.261-9.628    c0.721-0.437,1.382-0.202,0.84,0.28L12.861,21.391z" fill="#FFFFFF"/><path d="M24.687,30.163c-0.402,0-0.843-0.132-1.32-0.395l-10.803-7.976c-0.121-0.089-0.195-0.228-0.203-0.378    c-0.007-0.15,0.053-0.295,0.165-0.396L25.322,9.503c0.205-0.185,0.521-0.169,0.706,0.037c0.185,0.205,0.168,0.521-0.037,0.706    l-12.34,11.106l10.254,7.576c0.271,0.145,0.729,0.329,1.055,0.178c0.332-0.152,0.496-0.637,0.576-1.017l4.375-20.617    c0.17-0.681,0.088-1.229-0.215-1.481c-0.231-0.192-0.575-0.206-0.947-0.038L3.033,15.871C2.244,16.188,1.996,16.514,2,16.622    c0.003,0.071,0.173,0.267,0.68,0.422l6.375,1.99l6.999-4.416c0.234-0.146,0.542-0.077,0.689,0.156    c0.147,0.233,0.078,0.542-0.156,0.689l-7.194,4.539C9.269,20.08,9.116,20.1,8.977,20.057l-6.592-2.058    c-1.17-0.358-1.37-0.99-1.384-1.335c-0.02-0.473,0.253-1.157,1.667-1.723l25.695-9.908c0.697-0.318,1.445-0.25,1.974,0.191    c0.613,0.511,0.813,1.413,0.549,2.474l-4.371,20.598c-0.184,0.878-0.566,1.457-1.137,1.719    C25.163,30.114,24.933,30.163,24.687,30.163z" fill="#455A64"/></g><path d="M24.687,30.163c-0.402,0-0.843-0.132-1.32-0.395l-6.72-4.959c-0.222-0.164-0.27-0.478-0.105-0.699   c0.164-0.222,0.478-0.27,0.699-0.105l6.664,4.923c0.271,0.145,0.729,0.329,1.055,0.178c0.332-0.152,0.496-0.637,0.576-1.017   l4.375-20.617c0.17-0.681,0.088-1.229-0.215-1.481c-0.231-0.192-0.575-0.206-0.947-0.038L3.033,15.871   C2.244,16.188,1.996,16.514,2,16.622c0.003,0.071,0.173,0.267,0.68,0.422l6.594,2.058c0.158,0.049,0.281,0.174,0.33,0.332   l2.267,7.461c0.061,0.167,0.108,0.333,0.149,0.477c0.032,0.114,0.072,0.256,0.099,0.298c-0.004-0.005,0.076,0.019,0.289,0.02   c0.447,0,0.617-0.167,0.957-0.498l1.66-1.614c0.198-0.194,0.514-0.188,0.707,0.01c0.192,0.198,0.188,0.515-0.01,0.707L14.09,27.88   c-0.402,0.393-0.828,0.809-1.682,0.809c-0.98,0-1.178-0.434-1.351-1.046c-0.035-0.124-0.075-0.267-0.135-0.432l-2.198-7.233   l-6.339-1.979c-1.17-0.358-1.37-0.99-1.384-1.335c-0.02-0.473,0.253-1.157,1.667-1.723l25.695-9.908   c0.697-0.318,1.445-0.25,1.974,0.191c0.613,0.511,0.813,1.413,0.549,2.474l-4.371,20.598c-0.184,0.878-0.566,1.457-1.137,1.719   C25.163,30.114,24.933,30.163,24.687,30.163z" fill="#455A64"/><g><g><g><g><g><g><path d="M18.5,14c0,0.275-0.225,0.5-0.5,0.5l0,0c-0.275,0-0.5-0.225-0.5-0.5l0,0c0-0.275,0.225-0.5,0.5-0.5         l0,0C18.275,13.5,18.5,13.725,18.5,14L18.5,14z" fill="#455A64"/></g></g></g></g></g></g></g></svg>
      </div>
    </div>
    <div class="chat wrapper" v-else>
      <input type="text" v-model.trim="usernameText" @blur="createUsername" @keydown.enter="createUsername" placeholder="Введите свое имя и нажмите Enter">
    </div>
  </div>
</template>

<script>
import {ref, onMounted, onUpdated} from 'vue'
import {useStore} from 'vuex'
import spinner from "./spinner";
export default {
  setup() {
    onMounted(async () => {
      console.log('onMounted')
      loading.value = true
      await store.dispatch('loadChatMessages')
      loading.value = false
    })
    onUpdated(() => {
      if (scrolling.value) {
        scrolling.value.scrollIntoView({behavior: "smooth"})
      }
    })
    const scrolling = ref(null)
    const store = useStore()
    const loading = ref(false)
    const messageText = ref('')
    const usernameText = ref('')
    const createUsername = () => {
      store.commit('setUserName', usernameText.value)
    }
    const sendMessage = async () => {
      await store.dispatch('createChatMessage', messageText.value)
      messageText.value = ''
      scrolling.value.scrollIntoView({behavior: "smooth"})
    }
    return {
      store, messageText, sendMessage, usernameText, createUsername, loading, scrolling
    }
  },
  components: {
    spinner
  }
}
</script>

<style lang="scss">
@import "../styles/variable";
.chat-box {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%234FE'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
  .chat.wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: $darkGrey url("https://images.pexels.com/photos/1172849/pexels-photo-1172849.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    background-size: cover;
    input {
      width: 100%;
      padding: 5px;
      font-size: 16px;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid black;
      outline: none;
    }
      .chat-header {
        background-color: $navBackgroundColor;
        padding: 15px;
        border-top: 1px solid black;
        text-align: end;
      }
      .chat-content {
        flex: 1 0 auto;
        overflow-y: scroll;
        height: 449px;
        display: flex;
        flex-direction: column;
        .chat-message {
          margin: 10px 25px;
          background-color: $messageAnotherUser;
          border-radius: 5px;
          p {
            padding: 5px 10px;
          }
          &.current-user {
            text-align: end;
            background-color: $message;
          }
        }
        &::-webkit-scrollbar {
          width: 10px;
        }
        &::-webkit-scrollbar-track {
          box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
          background-color: $navBackgroundColor;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: $yellowButton;
        }
      }
      .chat-input {
        display: flex;
        justify-content: space-between;
        flex: 0 0 auto;
        width: 100%;
        background-color: $navBackgroundColor;
        border: 1px solid $darkGrey;
        padding: 10px 15px;
        border-bottom: 1px solid black;
        input {
          border: none;
          outline: none;
          width: 100%;
          padding: 5px;
          font-size: 16px;
          background-color: transparent;
        }
        svg {
          &:hover {
            cursor: pointer;
          }
        }
      }
  }
  .scrolling {
    transform: scale(0);
  }
@media (max-width: 768px) {
  .chat.wrapper {
    width: 100%;
  }
}
}
</style>
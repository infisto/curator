import { createStore } from 'vuex'
import axios from "axios";
import {error} from '@/errors/error'
import myAxios from "@/axios/myAxios";
import firebase from "firebase";
import db from '../main'

export default createStore({
  state() {
    return {
      token: localStorage.getItem('jwt-token') ? localStorage.getItem('jwt-token') : null,
      message: null,
      localId: localStorage.getItem('localId') ? localStorage.getItem('localId') : null,
      requests: [],
      templates: [],
      todoList: [],
      userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
      chatMessages: []
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(state, getter) {
      return !!getter.token
    },
    requests(state) {
      return state.requests
    },
    templates(state) {
      return state.templates
    },
    todoList(state) {
      return state.todoList
    },
    localId(state) {
      return state.localId
    },
    userName(state) {
      return state.userName
    },
    chatMessages(state) {
      return state.chatMessages.sort((a,b) => {
        return a.createdAt - b.createdAt
      })
    }
  },
  mutations: {
    setToken(state, token) {   // setToken
      state.token = token
      localStorage.setItem('jwt-token', token)
    },
    logout(state) {
      state.token = null
      state.localId = null
      localStorage.removeItem('jwt-token')
      localStorage.removeItem('userName')
    },
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    },
    setRequests(state, requests) {
      state.requests = requests
    },
    addRequests(state, requests) {
      state.requests.push(requests)
    },
    setTemplates(state, templates) {
      state.templates = templates
    },
    addTemplate(state, templates) {
      state.templates.push(templates)
    },
    setTodoList(state, todoList) {
      state.todoList = todoList
    },
    addTodoList(state, todoList) {
      state.todoList.push(todoList)
    },
    setLocalId(state, localId) {
      state.localId = localId
      localStorage.setItem('localId', localId)
    },
    setUserName(state, userName) {
      state.userName = userName
      localStorage.setItem('userName', userName)
    },
    setChatMessages(state, chatMessages) {
      state.chatMessages = chatMessages
    },
    addChatMessages(state, chatMessages) {
      state.chatMessages.push(chatMessages)
    }
  },
  actions: {
    async login({commit, dispatch}, payload) {
      try {
        const {data} = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`, {...payload, returnSecureToken: true})
        commit('setToken', data.idToken)
        commit('setLocalId', data.localId)
      } catch (e) {
        dispatch('setMessage', {
          value: error([e.response.data.error.message]),
          type: 'error'
        })
        throw new Error()
      }
    },
    async signupNewUser({commit, dispatch}, payload) {
      try {
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`, {...payload, returnSecureToken: true})
        dispatch('setMessage', {
          value: `Адрес ${payload.email} зарегистрирован!`,
          type: 'good'
        })
      } catch (e) {
        dispatch('setMessage', {
          value: 'Ошибка',
          type: 'danger'
        })
      }
    },
    async resetPassword({commit, dispatch}, payload) {
      try {
         await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.VUE_APP_FB_KEY}`, {...payload, returnSecureToken: true})
      } catch (e) {
        dispatch('setMessage', {
          value: error([e.response.data.error.message])
        })
      }
    },
    setMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout(()=> {
        commit('clearMessage')
      }, 3000)
    },
    async createRequests({commit, dispatch}, payload) {
      try {
        const token = this.getters.token
        const localId = this.getters.localId
        const {data} = await myAxios.post(`/${localId}/requests.json?auth=${token}`, payload)
        commit('addRequests', {...payload, id: data.name})
        dispatch('setMessage', {
          value: 'Заявка успешна создана',
          type: 'good'
        })
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'error'
        })
      }
    },
    async deleteRequest({commit, dispatch}, id) {
      try {
        const token = this.getters.token
        const localId = this.getters.localId
        await myAxios.delete(`${localId}/requests/${id}.json?auth=${token}`)
        const {data} = await myAxios.get(`${localId}/requests.json?auth=${token}`)
        if (data) {
          const requests = Object.keys(data).map(id => ({...data[id], id}))
          commit('setRequests', requests)
        } else {
          const requests = []
          commit('setRequests', requests)
        }
        dispatch('setMessage', {
          value: 'Заявка удалена',
          type: 'error'
        })
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        })
      }
    },
    async loadRequests({commit, dispatch}) {
      try {
        const token = this.getters.token
        const localId = this.getters.localId
        const {data} = await myAxios.get(`${localId}/requests.json?auth=${token}`)
        if (data) {
          const requests = Object.keys(data).map(id => ({...data[id], id}))
          commit('setRequests', requests)
        }

      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        })
      }
    },
    async createTemplate({commit, dispatch}, payload) {
      try {
        const token = this.getters.token
        const localId = this.getters.localId
        const {data} = await myAxios.post(`/${localId}/templates.json?auth=${token}`, payload)
        commit('addTemplate', {...payload, id: data.name})
        dispatch('setMessage', {
          value: 'Шаблон создан',
          type: 'good'
        })
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        })
      }
    },
    async loadTemplates({commit, dispatch}) {
      try {
        const token = this.getters.token
        const localId = this.getters.localId
        const {data} = await myAxios.get(`${localId}/templates.json?auth=${token}`)
        if (data) {
          const templates = Object.keys(data).map(id => ({...data[id], id}))
          commit('setTemplates', templates)
        }
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        })
      }
    },
    async delTemplate({commit, dispatch}, id) {
      try {
        const token = this.getters.token
        const localId = this.getters.localId
        await myAxios.delete(`${localId}/templates/${id}.json?auth=${token}`)
        const {data} = await myAxios.get(`${localId}/templates.json?auth=${token}`)
        if (data) {
          const templates = Object.keys(data).map(id => ({...data[id], id}))
          commit('setTemplates', templates)
        } else {
          const templates = []
          commit('setTemplates', templates)
        }
        dispatch('setMessage', {
          value: 'Шаблон удален',
          type: 'danger'
        })
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        })
      }
    },
    async loadTodoList({commit, dispatch}) {
      try {
        const token = this.getters.token
        const localId = this.getters.localId
        const {data} = await myAxios.get(`${localId}/todoList.json?auth=${token}`)
        if (data) {
          const todoList = Object.keys(data).map(id => ({...data[id], id}))
          commit('setTodoList', todoList)
        }
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        })
      }
    },
    async createTodoList({commit, dispatch}, payload) {
      try {
        const token = this.getters.token
        const localId = this.getters.localId
        const {data} = await myAxios.post(`/${localId}/todoList.json?auth=${token}`, payload)
        commit('addTodoList', {...payload, id: data.name})
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        })
      }
    },
    async deleteTodoList({commit, dispatch}, id) {
      try {
        const token = this.getters.token
        const localId = this.getters.localId
        await myAxios.delete(`${localId}/todoList/${id}.json?auth=${token}`)
        const {data} = await myAxios.get(`${localId}/todoList.json?auth=${token}`)
        if (data) {
          const todoList = Object.keys(data).map(id => ({...data[id], id}))
          commit('setTodoList', todoList)
        } else {
          const todoList = []
          commit('setTodoList', todoList)
        }
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        })
      }
    },
    async createChatMessage({commit, dispatch}, payload) {
      try {
        const addZero = (value) => {
          if (value < 10) {
            value = `0${value}`
          }
          return value
        }
        const username = this.getters.userName
        const date = `${addZero(new Date().getDate())}.${addZero(new Date().getMonth() + 1)}.${new Date().getFullYear()}`
        const minutes = `${new Date().getHours()}:${new Date().getMinutes()}`
        await db.collection('messages').add({
          text: payload,
          date,
          minutes,
          username,
          createdAt: new Date().getTime()
        }).then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        }).catch(e => console.log(e))
      } catch (e) {
        console.log(e)
      }
    },
    async loadChatMessages({commit}) {
      try {
        db.collection("messages")
            .onSnapshot((querySnapshot) => {
              let messages = [];
              querySnapshot.forEach((doc) => {
                messages.push(doc.data());
              });
              commit('setChatMessages', messages)
            });
      } catch (e) {
        console.log(e)
      }
    }
  },
})

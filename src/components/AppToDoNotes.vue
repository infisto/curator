<template>
  <div class="todo wrapper">
    <spinner v-if="loading"></spinner>
    <div class="todo-header">
      <input type="text" class="fields-data" v-model="inputValue" placeholder="Введите текст заметки">
      <input type="button" class="yellow-button" value="Добавить" @click="createTodoList">
    </div>
    <div class="todo-main">
      <Note v-for="item in readTodoListData" :key="readTodoListData.id" :items="readTodoListData" :inputValue="item.inputValue" class="todo-note" :id="item.id"></Note>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";
import Spinner from "@/components/spinner";
import Note from "@/components/Note";

export default {
  components: {Note, Spinner},
  async mounted() {
    this.loading = true
    await store.dispatch('loadTodoList')
    this.loading = false
  },
  data() {
    return {
      inputValue: '',
      todoList: [],
      loading: false,
    }
  },
  methods: {
    async createTodoList() {
      let inputValue = this.inputValue
      if (inputValue) {
        await store.dispatch('createTodoList', {inputValue})
        this.inputValue = ''
      }
    },
    async deleteTodoList(id) {
      await store.dispatch('deleteTodoList', id)
    },
    async loadTodoList() {
      await store.dispatch('loadTodoList')
    },

  },
  watch: {

  },
  computed: {
    readTodoListData() {
      return store.getters.todoList
    }
  }
}
</script>

<style lang="scss">
@import "../styles/variable";
.todo.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .todo-header {
    display: flex;
    margin-top: 15px;
    width: 100%;
  }
  .todo-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 15px;
    .todo-note {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover {
        cursor: pointer;
      }
      p {
        padding-left: 15px;
        width: 100%;
      }
      button {
        border: none;
        outline: none;
        background: transparent;
        padding: 10px;
        &:hover {
          cursor: pointer;
        }
        &:hover {
          background-color: $yellowButton;
        }

      }
      &:nth-child(odd) {
        background-color: $navBackgroundColor;
      }
      &:hover {
        background-color: #cccccc;
      }
    }
  }
  .fields-data {
    border: none;
    flex: 1;
    background-color: $darkGrey;
    outline: none;
    padding: 20px;
    &:active, &:hover {
      background-color: white;
      border: 1px solid $darkGrey;
      margin: -1px;
    }
  }
  .yellow-button {
    border-radius: 0;
  }
}

</style>
<template>
  <div>
    <p @click="this.read = !this.read" :class="{'read': read}">{{read ? ' &#10004; ' : null}}{{inputValue}}</p>
    <button @click="deleteTodoList(id)">&#10006;</button>
  </div>
</template>

<script>
import store from "@/store/store";
export default {
  props: ['inputValue', 'id'],
  data() {
    return {
      read: false,
    }
  },
  methods: {
    async deleteTodoList(id) {
      await store.dispatch('deleteTodoList', id)
    },
    completed() {
      this.read = !this.read
    },
  },
}
</script>

<style lang="scss">
@import "../styles/variable";
  p.read {
    text-decoration: line-through;
  }
</style>
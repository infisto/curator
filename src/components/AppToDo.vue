<template>
  <div class="organizer">
    <AppToDoNotes></AppToDoNotes>
    <button class="accordion" @click="toggleClass">Калькулятор</button>
    <div class="panel">
      <Calculator class="calculator"></Calculator>
    </div>
    <button class="accordion" @click="toggleClass">Section 2</button>
    <div class="panel">
      В разработке...
    </div>
    <button class="accordion" @click="toggleClass">Section 3</button>
    <div class="panel">
      В разработке...
    </div>

  </div>
</template>

<script>
import AppToDoNotes from "@/components/AppToDoNotes";
import Calculator from "@/components/Calculator";
export default {
  components: {AppToDoNotes, Calculator},
  data() {
    return {

    }
  },
  methods: {
    toggleClass(event) {
      event.target.classList.toggle('active')
      let panel = event.target.nextElementSibling
      panel.style.maxHeight ? panel.style.maxHeight = null : panel.style.maxHeight = panel.scrollHeight + 'px'
    }
  },
  computed: {

  },
  watch: {

  }
}
</script>

<style lang="scss">
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}
.accordion:hover {
  background-color: #ccc;
}
.panel {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  .calculator {
    margin: 15px auto;
  }
}
</style>
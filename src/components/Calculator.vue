<template>
  <div class="calculator wrapper">
    <input type="text" placeholder="0" disabled :value="result" class="input-result">
    <div class="calculator-panel">
      <input type="button" value="sin" @click="result = Math.sin(result)">
      <input type="button" value="cos" @click="result = Math.cos(result)">
      <input type="button" value="tan" @click="result = Math.tan(result)">
      <input type="button" value="&#8730;" @click="squareRoot">
      <input type="button" value="Del" @click="delValue" class="main-operation">
      <input type="button" @click="reset" value="C" class="main-operation">
      <input type="button" value="+/-" @click="switcherAdd" class="main-operation">
      <input type="button" value="%" @click="countPercent" class="main-operation">
      <input type="button" value="asin" @click="result = Math.asin(result)">
      <input type="button" value="acos" @click="result = Math.acos(result)">
      <input type="button" value="atan" @click="result = Math.atan(result)">
      <input type="button" value="&#8731;" @click="cubicRoot">
      <input type="button" value="7" @click="addValue('7')">
      <input type="button" value="8" @click="addValue('8')">
      <input type="button" value="9" @click="addValue('9')">
      <input type="button" value="/" @click="divide" :disabled="operationActive" class="main-operation">
      <input type="button" value="sinH" @click="result = Math.sinh(result)">
      <input type="button" value="cosH" @click="result = Math.cosh(result)">
      <input type="button" value="tanH" @click="result = Math.tanh(result)">
      <input type="button" @click="toDegree2" value="x2">
      <input type="button" value="4" @click="addValue('4')">
      <input type="button" value="5" @click="addValue('5')">
      <input type="button" value="6" @click="addValue('6')">
      <input type="button" value="*" @click="multi" :disabled="operationActive" class="main-operation">
      <input type="button" value="asinH" @click="result = Math.asinh(result)">
      <input type="button" value="acosH" @click="result = Math.acosh(result)">
      <input type="button" value="atanH" @click="result = Math.atanh(result)">
      <input type="button" @click="toDegree3" value="x3">
      <input type="button" value="1" @click="addValue('1')">
      <input type="button" value="2" @click="addValue('2')">
      <input type="button" value="3" @click="addValue('3')">
      <input type="button" value="-" @click="minus" :disabled="operationActive" class="main-operation">
      <input type="button" value="Rand" @click="result = Math.random()">
      <input type="button" value="&#960;" @click="result = 3.141592653589793">
      <input type="button" value="e" @click="result = 2.718281828459045">
      <input type="button" value="x!" @click="result = factorial(result)">
      <input type="button" value="0" @click="addValue('0')">
      <input type="button" value="." @click="addPoint" :disabled="point">
      <input type="button" @click="calc" value="=" class="main-operation">
      <input type="button" value="+" @click="plus" :disabled="operationActive" class="main-operation">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: '',
      prev: '',
      operation: '',
      operationActive: false,
      percentOperation: '',
      point: false
    }
  },
  methods: {
    addValue(value) {
      this.result += value
    },
    plus() {
      if(this.result) {
        this.prev = this.result
        this.operation = '+'
        this.operationActive = true
        this.point = false
        this.result = ''
      }
    },
    minus() {
      if(this.result) {
        this.prev = this.result
        this.operation = '-'
        this.operationActive = true
        this.point = false
        this.result = ''
      }
    },
    divide() {
      if(this.result) {
        this.prev = this.result
        this.operation = '/'
        this.operationActive = true
        this.point = false
        this.result = ''
      }
    },
    multi() {
      if(this.result) {
        this.prev = this.result;
        this.operation = '*';
        this.operationActive = true;
        this.point = false
        this.result = '';
      }
    },
    countPercent() {
      if (this.operation === '*') {
        this.percentOperation = '*'
      } else if (this.operation === '/') {
        this.percentOperation = '/'
      } else {
        this.result = (+this.prev * +this.result) / 100
      }
    },
    switcherAdd() {
      this.result *= -1
    },
    delValue() {
      if (typeof this.result === 'string') {
        this.result = this.result.slice(0, -1)
      }
    },
    squareRoot() {
      this.result = Math.sqrt(this.result)
    },
    cubicRoot() {
      this.result = Math.cbrt(this.result)
    },
    toDegree2() {
      this.result = this.result ** 2
    },
    toDegree3() {
      this.result = this.result ** 3
    },
    addPoint() {
      this.result += '.'
      this.point = true
    },
    factorial(n) {
      return (n !== 1) ? n * this.factorial(n - 1) : 1;
    },
    calc() {
      switch(this.operation) {
        case '+':
          this.result = +this.result + +this.prev;
          this.operationActive = false;
          this.point = false
          break;
        case '-':
          this.result = +this.prev - +this.result;
          this.operationActive = false;
          this.point = false
          break;
        case '*':
          if (this.percentOperation === '*') {
            this.result = this.prev * this.result / 100
            this.point = false
          } else {
            this.result = +this.result * +this.prev;
            this.operationActive = false;
            this.point = false
          }
          break;
        case '/':
          if (this.percentOperation === '/') {
            this.result = this.prev / (this.result / 100)
            this.point = false
          } else {
            this.result = +this.prev / +this.result;
            this.operationActive = false;
            this.point = false
          }
          break;
      }
    },
    reset() {
      this.result = '';
      this.prev = '';
      this.operation = '';
      this.operationActive = false;
      this.percentOperation = ''
      this.point = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable";
.calculator.wrapper {
  width: 35%;
  display: flex;
  flex-direction: column;
  .input-result {
    padding: 5px;
    text-align: end;
    font-size: 18px;
  }
  .calculator-panel {
    display: flex;
    flex-wrap: wrap;
    .main-operation {
      color: tomato;
    }
    input {
      width: 12.5%;
      padding: 10px 0;
      outline: none;
      border: none;
      background-color: black;
      color: white;
      font-size: 16px;
      &:hover {
        cursor: pointer;
        background-color: #444444;
        color: $yellowButton;
      }
    }
  }
}
@media (max-width: 768px) {
  .calculator.wrapper {
    width: 90%;
    .calculator-panel {
      input {
        font-size: 12px;
      }
    }
  }
}
</style>
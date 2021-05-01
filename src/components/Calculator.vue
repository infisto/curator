<template>
  <div class="calculator-wrapper">
    <input type="text" placeholder="0" disabled :value="result" class="input-result">
    <div class="panel-wrapper">
      <div class="geometry-panel">
        <input type="button" value="sin" @click="result = countSin(result)">
        <input type="button" value="cos" @click="result = countCos(result)">
        <input type="button" value="tan" @click="result = countTan(result)">
        <input type="button" value="asin" @click="result = Math.asin(result)">
        <input type="button" value="acos" @click="result = Math.acos(result)">
        <input type="button" value="atan" @click="result = Math.atan(result)">
        <input type="button" value="sinH" @click="result = Math.sinh(result)">
        <input type="button" value="cosH" @click="result = Math.cosh(result)">
        <input type="button" value="tanH" @click="result = Math.tanh(result)">
        <input type="button" value="asinH" @click="result = Math.asinh(result)">
        <input type="button" value="acosH" @click="result = Math.acosh(result)">
        <input type="button" value="atanH" @click="result = Math.atanh(result)">
        <input type="button" value="Rand" @click="result = Math.random()">
        <input type="button" value="&#960;" @click="result = 3.141592653589793">
        <input type="button" value="e" @click="result = 2.718281828459045">
      </div>
      <div class="left-panel">
        <input type="button" value="&#8730;" @click="squareRoot">
        <input type="button" value="&#8731;" @click="cubicRoot">
        <input type="button" @click="toDegree2" value="x2">
        <input type="button" @click="toDegree3" value="x3">
        <input type="button" value="x!" @click="result = factorial(result)">
      </div>
      <div class="main-panel">
        <input type="button" value="Del" @click="delValue" class="main-operation">
        <input type="button" @click="reset" value="C" class="main-operation">
        <input type="button" value="+/-" @click="switcherAdd">
        <input type="button" v-for="num in numbers" :value="num" @click="addValue(num)">
        <input type="button" value="." @click="addPoint" :disabled="point">
        <input type="button" @click="calc" value="=" class="main-operation">
      </div>
      <div class="right-panel">
        <input type="button" value="%" @click="countPercent">
        <input type="button" value="/" @click="divide" :disabled="operationActive">
        <input type="button" value="*" @click="multi" :disabled="operationActive">
        <input type="button" value="-" @click="minus" :disabled="operationActive">
        <input type="button" value="+" @click="plus" :disabled="operationActive">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numbers: [7,8,9,4,5,6,1,2,3,0],
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
    countSin(n) {
      return Math.sin(n)
    },
    countCos(n) {
      return Math.cos(n)
    },
    countTan(n) {
      return Math.tan(n)
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
input {
  outline: none;
  border: 0;
  text-align: center;
  font-size: 18px;
  background-color: #222222;
  color: white;
  cursor: pointer;
  padding: 11px;
}
.input-result {
  width: 534px;
  text-align: end;
  font-size: 25px;
  background-color: #f0f0f0;
  color: black;
  cursor: auto;
}
.calculator-wrapper {
  width: 535px;
  margin: 0 auto;
}
input:hover {
  background-color: #454140;
}
.input-result:hover {
  background-color: #f0f0f0;
}
.panel-wrapper {
  display: flex;
}
.geometry-panel {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
}
.geometry-panel input {
  width: 33.33333%;
}
.top-panel input {
  width: 33.33333%;
}
.left-panel {
  display: flex;
  flex-direction: column;
}
.left-panel input {
  width: 67px;
}
.main-panel {
  width: 200px;
  display: flex;
  flex-wrap: wrap;
}
.main-panel input {
  width: 33.33333%;
}
.right-panel {
  display: flex;
  flex-direction: column;
}
.right-panel input {
  width: 67px;
  height: 42.50px;
  color: $yellowButton;
}
.main-operation {
  color: $yellowButton;
}
</style>
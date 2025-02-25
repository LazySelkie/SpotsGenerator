<template>
  <div class="spot-main">
    <canvas class="spot-canvas"></canvas>

    <div class="spot-sidebar">

    </div>
  </div>
</template>

<script setup lang="ts">
let v: String = "some string";

interface testType {
  id: String,
  something?: Number,
}

let obj: testType = {
  id: "Test string",
  something: 5
}


const testFunc = ():String => {
  return "blabla";
}

console.log(testFunc())

class TestClass {
  name: String | Number;
  constructor(name: String | Number) {
    this.name = name || "";
  }
}

let testClassObj: TestClass = new TestClass("bla1");
console.log(testClassObj)

function someFunc(): String {
  return "ts";
}

function someArrayFunc(): String[] {
  return ["test"];
}

</script>

<style lang="scss">
.spot-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #6b6b6b;
}

.spot-canvas {
  flex: 1 0;
  width: 100%;
  height: 100%;
  background-color: #c22424;
}

.spot-sidebar {
  flex: 1 0;
  background-color: #61b600;
}
</style>
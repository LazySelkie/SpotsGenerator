<template>
  <div class="spot-main">
    <SpotCanvas />

    <div class="spot-sidebar">
      <input type="text">

      <span> Настройки </span>
      <input type="color">
      <input type="range">
      <input type="color">
      <input type="color">

      <input type="range">
      <section></section>

      <button @click="generate">Сгенерировать</button>
      <button @click="save">Сохранить</button>
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


const generate = () => {
  console.log("generate");
}

const save = () => {
  console.log("save");
}

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
  width: 100vw;
  height: 100vh;
  background-color: #6b6b6b;
}

.spot-sidebar {
  flex: 1 0;
  width: 20vw;
  height: 90vh;
  background-color: #61b600;
}
</style>
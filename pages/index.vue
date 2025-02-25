<template>
  <div class="spot-main">
    <SpotCanvas />

    <div class="spot-sidebar">
      <input type="text">

      <h2> Настройки </h2>
      <div style="display: flex">
        <input type="color">
        <input type="range">
        <input type="color">
      </div>
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
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  // width: 100vw;
  // height: 100vh;
  // background-color: #6b6b6b;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #6b6b6b;

  background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
}
.spot-canvas-container {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
}
canvas {
  border: 1px solid rgba(253, 253, 253, 0.477);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.322);
  height: 99%;
}

.spot-sidebar {
  // flex: 1 0;
  width: 20vw;
  height: 90vh;
  // background-color: #61b600;

  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h2 {
  color: rgba(0, 0, 0, 0.721);
}
input[type="color"] {
  inline-size: 27px;
}
</style>
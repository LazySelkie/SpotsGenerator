<template>
  <div class="spot-main">
    <SpotCanvas />

    <div class="spot-sidebar">
      <input class="glass-text-input" type="text">

      <h2> Настройки </h2>

      <div>
        <s-input-color
          label="Цвет пятен"
          @input=""
        />
        <s-input-color
          label="Второй цвет"
          @input=""
        />
        <s-input-color
          label="Цвет фона"
          @input=""
        />
        <s-input-range
          label="Прозрачность"
          @input=""
        />
        <s-input-range
          label="Размер пятен"
          @input=""
        />
        
        <s-input-range
          label="Способ генерации пятен"
          @input=""
        />
      </div>

      <section></section>

      <button class="glass-button" style="margin-bottom: 8px;" @click="generate">Сгенерировать</button>
      <button class="glass-button" @click="save">Сохранить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Point {
  x: number;
  y: number;
};

interface Spot {
  color: string;
  countRay: number;
  circleRadius: number;
  center: Point;
};

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
  width: 20vw;
  height: 90vh;
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  align-self: center;
  color: rgba(245, 245, 245, 0.899);
}

.glass-button {
  display: inline-block;
  padding: 8px 16px;
  border: 0;
  text-decoration: none;
  border-radius: 8px;
  background-color: rgb(134 114 201 / 55%);
  border: 2px solid rgba(255, 255, 255, 0.211);
  backdrop-filter: blur(30px);
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  letter-spacing: 2px;
  cursor: pointer;
  text-transform: uppercase;
}
.glass-button:hover {
  background-color: rgba(255,255,255,0.2);
}
.glass-button:active {
  background-color: rgba(117, 135, 172, 0.107);
}

.glass-text-input {
  display: inline-block;
  padding: 8px 16px;
  border: 0;
  text-decoration: none;
  border-radius: 8px;
  background-color: rgba(255,255,255,0.1);
  border: 2px solid rgba(255, 255, 255, 0.474);
  backdrop-filter: blur(30px);
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  letter-spacing: 2px;
  cursor: pointer;
  text-transform: uppercase;
}
.glass-text-input:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.473);
}
</style>
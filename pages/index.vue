<template>
  <div>
   TEST TYPESCRIPT
   {{ obj.id }}
   {{ v }}
  </div>
</template>

<script setup lang="ts">
let v: String = "some string";

interface testType {
  id: String,
  something?: Number // этого property может не быть в этом интерфейсе
}

let obj: testType = {
  id: "Test string",
  something: 5
}

// const testFunc = <String> () => { // тут приведение результата к типу String происходит
//   return "blabla";
// }
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
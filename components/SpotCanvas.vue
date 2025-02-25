<template>
  <canvas 
    ref="canvas"
    class="spot-canvas"
  >
    reserv
  </canvas>
</template>


<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

onMounted(() => {
  ctx.value = canvas.value?.getContext('2d') || null;
  const width = <number>canvas.value?.width;

  console.log(<number>canvas.value?.width / 2)

  // ctx.value?.arc(canvas.value?.width / 2, canvas.value?.height / 2, 100, 0, 2 * Math.PI);
  // ctx.value?.fillStyle = '#ff0000';
  // ctx.value?.fill();

  // ctx.value?.font = '50px Arial';
  // ctx.value?.fillStyle = '#ffffff';
  // ctx.value?.textAlign = 'center';
  // ctx.value?.fillText('Hello, Vue!', canvas.value.width / 2, canvas.value.height / 2);

  render();
});

const render = () => {
  if (!ctx.value) {
      return;
  }

  ctx.value.fillText('jelledev.com', 50, 50);
};
</script>

<style lang="scss" scoped>
.spot-canvas {
  flex: 1 0;
  width: 80vw;
  height: 90vh;
  background-color: #c22424;
}
</style>
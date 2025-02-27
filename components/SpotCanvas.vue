<template>
  <div class="spot-canvas-container">
    <canvas 
      ref="canvas"
      class="spot-canvas"
      width="1000"
      height="500"
    >
      reserv
    </canvas>
  </div>
</template>


<script setup lang="ts">
const canvas = ref();
const ctx = ref();

onMounted(() => {
  ctx.value = <CanvasRenderingContext2D>canvas.value?.getContext('2d') || null;

  const width = canvas.value.clientWidth;
  const height = canvas.value.clientHeight;

  if (canvas.value?.width !== width || canvas.value?.height !== height) {
    canvas.value.width = width;
    canvas.value.height = height;
  }  
  
  render();
});

const render = () => {
  if (!ctx.value) {
      return;
  }

  const cotx = <CanvasRenderingContext2D>ctx.value;
  cotx.beginPath();
  cotx.arc(100, 100, 25, Math.PI * -0.1, Math.PI * 0.1 , true);
  cotx.lineTo(100, 100);
  cotx.closePath();
  cotx.fillStyle = 'red';
  cotx.fill();
};
</script>

<style lang="scss" scoped>
.spot-canvas {
  flex: 1 0;
  width: 75vw;
  height: 90vh;
}
</style>
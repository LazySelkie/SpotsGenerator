<template>
  <div class="spot-canvas-container">
    <canvas 
      ref="canvas"
      class="spot-canvas"
    >
      reserv
    </canvas>
  </div>
</template>


<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

onMounted(() => {
  ctx.value = canvas.value?.getContext('2d') || null;
  const width = <number>canvas.value?.width;


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
  width: 75vw;
  height: 90vh;
  // background-color: #c22424;
}
</style>
<template>
  <div class="spot-canvas-container">
    <canvas 
      class="spot-canvas"
      id="canvas"
    >
      reserv
    </canvas>
  </div>
</template>


<script setup lang="ts">
const canvas: Ref<HTMLCanvasElement> = ref({});
const ctx = ref(null);

onMounted(() => {
  canvas.value = document.getElementById('canvas');
  ctx.value = canvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
  ctx.fillStyle = '#ff0000';
  ctx.fill();

  ctx.font = '50px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.fillText('Hello, Vue!', canvas.width / 2, canvas.height / 2);
});
</script>

<style lang="scss" scoped>
.spot-canvas {
  flex: 1 0;
  width: 75vw;
  height: 90vh;
  // background-color: #c22424;
}
</style>
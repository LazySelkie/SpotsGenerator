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
interface Point {
  x: number;
  y: number;
};

interface Spot {
  color: string;
  countRay: number;
  circleRadius: number;
  center: Point;
}

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
  
  createSpot('yellow', { x: 200, y: 200 }, 100);

  createSpot('yellow', { x: 600, y: 200 }, 25);
};

const createBezierCurve = (start: Point, end: Point, point1: Point, point2: Point) => {
  ctx.value.beginPath();
  ctx.value.moveTo(start.x, start.y);
  ctx.value.bezierCurveTo(point1.x, point1.y, point2.x, point2.y, end.x, end.y);
  ctx.value.stroke();
};

const createCircle = (color: string, center: Point, radius: number) => {
  ctx.value.fillStyle = color;
  ctx.value.beginPath();
  ctx.value.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.value.fill();
};

const createSpot = (color: string, center: Point, radius: number) => {
  createCircle(color, center, radius);

  let dots: Point[] = [];
  let dotsBezier: Point[] = [];

  const countRay = 12;
  const angleRay = 360 / countRay * Math.PI / 180;

  for (let i = 0; i < countRay; i++) {
    ctx.value.strokeStyle = 'blue';
    if (i == 0) {
      ctx.value.strokeStyle = 'red';
    }
    const maxDelta = 50;
    const delta = Math.random() * maxDelta;
    const angle = i * angleRay;
    const x = center.x + (radius + delta) * Math.cos(angle);
    const y = center.y + (radius + delta) * Math.sin(angle);

    dots.push({ x, y });
    
    ctx.value.beginPath();
    ctx.value.moveTo(center.x, center.y);
    ctx.value.lineTo(x, y);
    ctx.value.stroke();

    let point1: Point = { x: 0, y: 0 };
    let point2: Point = { x: 0, y: 0 };

    const anglePoint = Math.random() * Math.PI + angle;
    const distance = Math.random() * (radius + delta) * Math.tan(angleRay / 2) + 5;

    point1.x = x + Math.cos(anglePoint) * distance;
    point1.y = y + Math.sin(anglePoint) * distance;
    // createCircle('red', point1, 5);

    point2.x = x - (point1.x - x);
    point2.y = y - (point1.y - y);
    // createCircle('blue', point2, 5);

    if (i == 0) {
      dotsBezier.push(point1);
      dotsBezier.push(point2);
    } else {
      dotsBezier.splice(dotsBezier.length - 1, 0, point2);
      dotsBezier.splice(dotsBezier.length - 1, 0, point1);
    }
  }
  ctx.value.strokeStyle = 'black';
  
  for (let i = 0; i < countRay - 1; i++) {
    createBezierCurve(dots[i], dots[i+1], dotsBezier[2*i], dotsBezier[2*i+1]);
    // ctx.value.fillStyle = 'blue';
    // ctx.value.fill();
  }
  createBezierCurve(dots[dots.length-1], dots[0], dotsBezier[dotsBezier.length-2], dotsBezier[dotsBezier.length-1]);
  // ctx.value.fillStyle = 'blue';
  // ctx.value.fill();
};
</script>

<style lang="scss" scoped>
.spot-canvas {
  flex: 1 0;
  width: 75vw;
  height: 90vh;
}
</style>
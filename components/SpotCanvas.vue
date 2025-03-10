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
import type { Point } from '../types/Point';
import type { Spot } from '../types/Spot';

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
  
  // createSpot1('yellow', { x: 200, y: 200 }, 100);

  // createSpot2('yellow', { x: 600, y: 200 }, 100);

  // createSpot3('yellow', { x: 200, y: 600 }, 100);
  
  let spot4: Spot = { 
    color: 'yellow', // примеры: 'yellow', 'rgba(255, 99, 71, 0.3)'
    countRay: 12,
    circleRadius: 100,
    center: {x: 600, y: 600},
  };
  createSpot4(spot4);
};

const createBezierCurve = (start: Point, end: Point, point1: Point, point2: Point) => {
  ctx.value.bezierCurveTo(point1.x, point1.y, point2.x, point2.y, end.x, end.y);
};

const createCircle = (color: string, center: Point, radius: number) => {
  ctx.value.fillStyle = color;
  ctx.value.beginPath();
  ctx.value.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.value.fill();
};

const createSpot1 = (color: string, center: Point, radius: number) => {
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

const createSpot2 = (color: string, center: Point, radius: number) => {
  createCircle(color, center, radius);

  const radiusBezier = 1.5 * radius;

  // ctx.value.strokeStyle = 'blue';
  // ctx.value.beginPath();
  // ctx.value.arc(center.x, center.y, radiusBezier, 0, 2 * Math.PI);
  // ctx.value.stroke();
  ctx.value.strokeStyle = 'black';

  const maxDeltaAngle = 10;
  let fullCircleAngle = 0;

  let pointStart: Point = { 
    x: center.x + radiusBezier * Math.cos(0),
    y: center.y + radiusBezier * Math.sin(0),
  };
  let pointEnd: Point = { x: 0, y: 0 };

  let dots = [];
  let dotsBezier = [];
  while ((fullCircleAngle * 180 / Math.PI) < (360 - maxDeltaAngle)) {
    let pointBezier: Point = { x: 0, y: 0 };
    let pointBezierReverse: Point = { x: 0, y: 0 };

    const randomDeltaAngle = Math.random() * maxDeltaAngle + 5; // 10 - 30
    const randomAngle = randomDeltaAngle * Math.PI / 180; // в радианах
    fullCircleAngle += randomAngle;
    
    ctx.value.beginPath();
    ctx.value.moveTo(center.x, center.y);
    ctx.value.lineTo(pointStart.x, pointStart.y);
    ctx.value.stroke();

    pointEnd.x = center.x + radiusBezier * Math.cos(fullCircleAngle);
    pointEnd.y = center.y + radiusBezier * Math.sin(fullCircleAngle);

    // createCircle('white', pointStart, 2);
    // createCircle('white', pointEnd, 2);
    
    let angle = Math.random() * Math.PI + fullCircleAngle;
    const distance = Math.random() * Math.sqrt((pointEnd.x - pointStart.x)**2 + (pointEnd.y - pointStart.y)**2);

    pointBezier.x = pointStart.x + distance * Math.cos(angle);
    pointBezier.y = pointStart.y + distance * Math.sin(angle);
    // createCircle('red', pointBezier, 2);

    // angle = Math.random() * Math.PI + randomAngle + Math.PI;
    // pointBezier2.x = pointEnd.x + Math.cos(angle) * distance;
    // pointBezier2.y = pointEnd.y + Math.sin(angle) * distance;
    pointBezierReverse.x = 2 * pointStart.x - pointBezier.x;
    pointBezierReverse.y = 2 * pointStart.y - pointBezier.y;
    // createCircle('blue', pointBezierReverse, 2);

    dots.push({ x: pointStart.x, y: pointStart.y });
    dotsBezier.push(pointBezierReverse);
    dotsBezier.push(pointBezier);
    
    pointStart.x = pointEnd.x;
    pointStart.y = pointEnd.y;
  }
  console.log(dots)
  console.log(dotsBezier)
  for (let i = 0; i < dots.length - 1; i++) {
    createBezierCurve(dots[i], dots[i+1], dotsBezier[2*i+1], dotsBezier[2*i+2]);
  }
  createBezierCurve(dots[dots.length - 1], dots[0], dotsBezier[dotsBezier.length - 1], dotsBezier[0]);
};

const createSpot3 = (color: string, center: Point, radius: number) => {
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
    const maxDelta = radius / 2;
    const delta = Math.random() * maxDelta;
    const angle = i * angleRay;
    const x = center.x + (radius + (-1)**i * delta) * Math.cos(angle);
    const y = center.y + (radius + (-1)**i * delta) * Math.sin(angle);

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

const createSpot4 = (spot: Spot) => {
  const center = spot.center;
  const radiusBezier = 1.5 * spot.circleRadius;
  const radiusBezierInner = 0.9 * spot.circleRadius;

  // Синяя окружность - максимальная длина генерируемых лучей
  // ctx.value.strokeStyle = 'blue';
  // ctx.value.beginPath();
  // ctx.value.arc(center.x, center.y, radiusBezier, 0, 2 * Math.PI);
  // ctx.value.stroke();

  ctx.value.strokeStyle = 'black';

  const maxDeltaAngle = 20;
  let fullCircleAngle = 0;

  let pointStart: Point = { 
    x: center.x + radiusBezier * Math.cos(0),
    y: center.y + radiusBezier * Math.sin(0),
  };
  let pointEnd: Point = { x: 0, y: 0 };

  let dots = [];
  let dotsBezier = [];
  while ((fullCircleAngle * 180 / Math.PI) < (360 - maxDeltaAngle)) {
    let pointBezier: Point = { x: 0, y: 0 };
    let pointBezierReverse: Point = { x: 0, y: 0 };

    const randomDeltaAngle = Math.random() * maxDeltaAngle + 5; // 10 - 30
    const randomAngle = randomDeltaAngle * Math.PI / 180; // в радианах
    fullCircleAngle += randomAngle;
    
    // Рисуем опорные лучи
    // ctx.value.beginPath();
    // ctx.value.moveTo(center.x, center.y);
    // ctx.value.lineTo(pointStart.x, pointStart.y);
    // ctx.value.stroke();

    if (dots.length % 2) {
      pointEnd.x = center.x + radiusBezier * Math.cos(fullCircleAngle);
      pointEnd.y = center.y + radiusBezier * Math.sin(fullCircleAngle);
    } else {
      pointEnd.x = center.x + radiusBezierInner * Math.cos(fullCircleAngle);
      pointEnd.y = center.y + radiusBezierInner * Math.sin(fullCircleAngle);
    }
    
    let angle = Math.random() * Math.PI + fullCircleAngle;
    const distance = 5 + Math.random() * Math.sqrt((pointEnd.x - pointStart.x)**2 + (pointEnd.y - pointStart.y)**2)/3;

    pointBezier.x = pointStart.x + distance * Math.cos(angle);
    pointBezier.y = pointStart.y + distance * Math.sin(angle);
    // Сгенерированная точка для кривой Безье (первая точка)
    // createCircle('red', pointBezier, 2);
    pointBezierReverse.x = 2 * pointStart.x - pointBezier.x;
    pointBezierReverse.y = 2 * pointStart.y - pointBezier.y;
    // Вторая точка для кривой Безье (это отраженная относительно конца опорного луча первая точка Безье)
    // createCircle('blue', pointBezierReverse, 2);

    dots.push({ x: pointStart.x, y: pointStart.y });
    dotsBezier.push(pointBezierReverse);
    dotsBezier.push(pointBezier);
    
    pointStart.x = pointEnd.x;
    pointStart.y = pointEnd.y;
  }

  // Начинаем контур непосредственно пятна
  ctx.value.beginPath();
  ctx.value.moveTo(dots[0].x, dots[0].y);
  for (let i = 0; i < dots.length - 1; i++) {
    createBezierCurve(dots[i], dots[i+1], dotsBezier[2*i+1], dotsBezier[2*i+2]);
  }
  createBezierCurve(dots[dots.length - 1], dots[0], dotsBezier[dotsBezier.length - 1], dotsBezier[0]);
  // Заканчиваем контур пятна и заполняем его
  ctx.value.closePath();
  ctx.value.fillStyle = spot.color;
  ctx.value.fill();
};
</script>

<style lang="scss" scoped>
.spot-canvas {
  flex: 1 0;
  width: 75vw;
  height: 90vh;
}
</style>
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

<script setup lang='ts'>
import type { Point } from '../types/Point';
import type { Spot } from '../types/Spot';
import type { Seed } from '../types/Seed';
import type { SpotsSettings } from '../types/SpotSettings.ts';

const emits = defineEmits(['seed']);
const props = defineProps({
	spotsSettings: {
		type: Object as PropType<SpotsSettings>,
    default:() => {},
	},
});

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
});

const render = () => {
  if (!ctx.value) {
    return;
  }

  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

  ctx.value.fillStyle = props.spotsSettings.backgroundColor;
  ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height);

  // let spot1: Spot = { 
  //   color: 'yellow',
  //   countRay: 12,
  //   circleRadius: 100,
  //   center: { x: 200, y: 200 },
  // };
  // createSpot1(spot1);

  // let spot2: Spot = { 
  //   color: 'yellow',
  //   countRay: 12,
  //   circleRadius: 100,
  //   center: { x: 600, y: 200 },
  // };
  // createSpot2(spot2);

  // let spot3: Spot = { 
  //   color: 'yellow',
  //   countRay: 12,
  //   circleRadius: 100,
  //   center: { x: 200, y: 600 },
  // };
  // createSpot3(spot3);

  let seed: Seed = Object.assign({}, props.spotsSettings.seed);

  if (!props.spotsSettings.seed.checked) {
    let seedNumber = Math.floor(1 + Math.random() * 999998);
    emits('seed', seedNumber);
    seed.number = seedNumber;
  }

  const spotAmount = Math.floor(props.spotsSettings.spotsAmountMin + randomSeed(seed) * (props.spotsSettings.spotsAmountMax - props.spotsSettings.spotsAmountMin));

  for (let i = 0; i < spotAmount; i++) {
    const x = randomSeed(seed, canvas.value.width) * canvas.value.width;
    const y = randomSeed(seed, 2*i) * canvas.value.height;

    let colorFactor = 1;
    if (spotAmount !== 1) {
      colorFactor = i / (spotAmount - 1);
    }
    const color = interpolateColor(
      props.spotsSettings.color,
      props.spotsSettings.secondColor,
      colorFactor
    );

    let spot: Spot = {
      color: color,
      center: { x, y },
    };

    createSpot4(spot, seed);
  }

  // let spot4: Spot = { 
  //   color: props.spotsSettings.color,
  //   countRay: 12,
  //   center: { x: 600, y: 600 },
  // };

  // createSpot4(spot4);
};

const generateImageFile = (): string => {
  if (!canvas.value) {
    return "";
  }
  const dataURL = canvas.value.toDataURL(); // именно canvas, не ctx
  return dataURL;
}

const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const clearCanvas = () => {
  // ctx.value.fillStyle = props.spotsSettings.backgroundColor;
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
};

// const createSpot1 = (spot: Spot) => {
//   const { center, circleRadius: radius, color } = spot;
//   // createCircle(color, center, radius);

//   let dots: Point[] = [];
//   let dotsBezier: Point[] = [];

//   const countRay = 12;
//   const angleRay = 360 / countRay * Math.PI / 180;

//   for (let i = 0; i < countRay; i++) {
//     ctx.value.strokeStyle = 'blue';
//     if (i == 0) {
//       ctx.value.strokeStyle = 'red';
//     }
//     const maxDelta = 50;
//     const delta = randomSeed(seed) * maxDelta;
//     const angle = i * angleRay;
//     const x = center.x + (radius + delta) * Math.cos(angle);
//     const y = center.y + (radius + delta) * Math.sin(angle);

//     dots.push({ x, y });
    
//     // Изображение опорных лучей
//     // ctx.value.beginPath();
//     // ctx.value.moveTo(center.x, center.y);
//     // ctx.value.lineTo(x, y);
//     // ctx.value.stroke();

//     let point1: Point = { x: 0, y: 0 };
//     let point2: Point = { x: 0, y: 0 };

//     const anglePoint = randomSeed(seed) * Math.PI + angle;
//     const distance = randomSeed(seed) * (radius + delta) * Math.tan(angleRay / 2) + 5;

//     point1.x = x + Math.cos(anglePoint) * distance;
//     point1.y = y + Math.sin(anglePoint) * distance;
//     // createCircle('red', point1, 5);

//     point2.x = x - (point1.x - x);
//     point2.y = y - (point1.y - y);
//     // createCircle('blue', point2, 5);

//     if (i == 0) {
//       dotsBezier.push(point1);
//       dotsBezier.push(point2);
//     } else {
//       dotsBezier.splice(dotsBezier.length - 1, 0, point2);
//       dotsBezier.splice(dotsBezier.length - 1, 0, point1);
//     }
//   }
//   ctx.value.strokeStyle = 'black';
//   // Начинаем контур непосредственно пятна
//   ctx.value.beginPath();
//   for (let i = 0; i < countRay - 1; i++) {
//     ctx.value.bezierCurveTo(dotsBezier[2*i].x, dotsBezier[2*i].y, dotsBezier[2*i+1].x, dotsBezier[2*i+1].y, dots[i+1].x, dots[i+1].y);
//   }
//   ctx.value.bezierCurveTo(dotsBezier[dotsBezier.length-2].x, dotsBezier[dotsBezier.length-2].y, dotsBezier[dotsBezier.length-1].x, dotsBezier[dotsBezier.length-1].y, dots[0].x, dots[0].y);
//   // Заканчиваем контур пятна и заполняем его
//   ctx.value.closePath();
//   ctx.value.fillStyle = color;
//   ctx.value.fill();
// };

// const createSpot2 = (spot: Spot) => {
//   const { center, circleRadius: radius, color } = spot;
//   // createCircle(color, center, radius);

//   const radiusBezier = 1.5 * radius;

//   // ctx.value.strokeStyle = 'blue';
//   // ctx.value.beginPath();
//   // ctx.value.arc(center.x, center.y, radiusBezier, 0, 2 * Math.PI);
//   // ctx.value.stroke();
//   ctx.value.strokeStyle = 'black';

//   const maxDeltaAngle = 10;
//   let fullCircleAngle = 0;

//   let pointStart: Point = { 
//     x: center.x + radiusBezier * Math.cos(0),
//     y: center.y + radiusBezier * Math.sin(0),
//   };
//   let pointEnd: Point = { x: 0, y: 0 };

//   let dots = [];
//   let dotsBezier = [];
//   while ((fullCircleAngle * 180 / Math.PI) < (360 - maxDeltaAngle)) {
//     let pointBezier: Point = { x: 0, y: 0 };
//     let pointBezierReverse: Point = { x: 0, y: 0 };

//     const randomDeltaAngle = randomSeed(seed) * maxDeltaAngle + 5; // 10 - 30
//     const randomAngle = randomDeltaAngle * Math.PI / 180; // в радианах
//     fullCircleAngle += randomAngle;
    
//     // Изображение опорных лучей
//     // ctx.value.beginPath();
//     // ctx.value.moveTo(center.x, center.y);
//     // ctx.value.lineTo(pointStart.x, pointStart.y);
//     // ctx.value.stroke();

//     pointEnd.x = center.x + radiusBezier * Math.cos(fullCircleAngle);
//     pointEnd.y = center.y + radiusBezier * Math.sin(fullCircleAngle);

//     // createCircle('white', pointStart, 2);
//     // createCircle('white', pointEnd, 2);
    
//     let angle = randomSeed(seed) * Math.PI + fullCircleAngle;
//     const distance = randomSeed(seed) * Math.sqrt((pointEnd.x - pointStart.x)**2 + (pointEnd.y - pointStart.y)**2);

//     pointBezier.x = pointStart.x + distance * Math.cos(angle);
//     pointBezier.y = pointStart.y + distance * Math.sin(angle);
//     // createCircle('red', pointBezier, 2);

//     // angle = randomSeed(seed) * Math.PI + randomAngle + Math.PI;
//     // pointBezier2.x = pointEnd.x + Math.cos(angle) * distance;
//     // pointBezier2.y = pointEnd.y + Math.sin(angle) * distance;
//     pointBezierReverse.x = 2 * pointStart.x - pointBezier.x;
//     pointBezierReverse.y = 2 * pointStart.y - pointBezier.y;
//     // createCircle('blue', pointBezierReverse, 2);

//     dots.push({ x: pointStart.x, y: pointStart.y });
//     dotsBezier.push(pointBezierReverse);
//     dotsBezier.push(pointBezier);
    
//     pointStart.x = pointEnd.x;
//     pointStart.y = pointEnd.y;
//   }
//   // Начинаем контур непосредственно пятна
//   ctx.value.beginPath();
//   for (let i = 0; i < dots.length - 1; i++) {
//     ctx.value.bezierCurveTo(dotsBezier[2*i+1].x, dotsBezier[2*i+1].y, dotsBezier[2*i+2].x, dotsBezier[2*i+2].y, dots[i+1].x, dots[i+1].y);
//   }
//   ctx.value.bezierCurveTo(dotsBezier[dotsBezier.length - 1].x, dotsBezier[dotsBezier.length - 1].y, dotsBezier[0].x, dotsBezier[0].y, dots[0].x, dots[0].y);
//   // Заканчиваем контур пятна и заполняем его
//   ctx.value.closePath();
//   ctx.value.fillStyle = color;
//   ctx.value.fill();
// };

// const createSpot3 = (spot: Spot) => {
//   const { center, circleRadius: radius, color } = spot;
//   // createCircle(spot.color, center, radius);
  
//   let dots: Point[] = [];
//   let dotsBezier: Point[] = [];

//   const countRay = spot.countRay;
//   const angleRay = 360 / countRay * Math.PI / 180;

//   for (let i = 0; i < countRay; i++) {
//     ctx.value.strokeStyle = 'blue';
//     if (i == 0) {
//       ctx.value.strokeStyle = 'red';
//     }
//     const maxDelta = radius / 2;
//     const delta = randomSeed(seed) * maxDelta;
//     const angle = i * angleRay;
//     const x = center.x + (radius + (-1)**i * delta) * Math.cos(angle);
//     const y = center.y + (radius + (-1)**i * delta) * Math.sin(angle);

//     dots.push({ x, y });
//     // Изображение опорных лучей
//     // ctx.value.beginPath();
//     // ctx.value.moveTo(center.x, center.y);
//     // ctx.value.lineTo(x, y);
//     // ctx.value.stroke();

//     let point1: Point = { x: 0, y: 0 };
//     let point2: Point = { x: 0, y: 0 };

//     const anglePoint = randomSeed(seed) * Math.PI + angle;
//     const distance = randomSeed(seed) * (radius + delta) * Math.tan(angleRay / 2) + 5;

//     point1.x = x + Math.cos(anglePoint) * distance;
//     point1.y = y + Math.sin(anglePoint) * distance;
//     // createCircle('red', point1, 5);

//     point2.x = x - (point1.x - x);
//     point2.y = y - (point1.y - y);
//     // createCircle('blue', point2, 5);

//     if (i == 0) {
//       dotsBezier.push(point1);
//       dotsBezier.push(point2);
//     } else {
//       dotsBezier.splice(dotsBezier.length - 1, 0, point2);
//       dotsBezier.splice(dotsBezier.length - 1, 0, point1);
//     }
//   }
//   ctx.value.strokeStyle = 'black';
  
//   // Начинаем контур непосредственно пятна
//   ctx.value.beginPath();
//   ctx.value.moveTo(dots[0].x, dots[0].y);
//   for (let i = 0; i < countRay - 1; i++) {
//     ctx.value.bezierCurveTo(dotsBezier[2*i].x, dotsBezier[2*i].y, dotsBezier[2*i+1].x, dotsBezier[2*i+1].y, dots[i+1].x, dots[i+1].y);
//   }
//   ctx.value.bezierCurveTo(dotsBezier[dotsBezier.length-2].x, dotsBezier[dotsBezier.length-2].y, dotsBezier[dotsBezier.length-1].x, dotsBezier[dotsBezier.length-1].y, dots[0].x, dots[0].y);
//   // Заканчиваем контур пятна и заполняем его
//   ctx.value.closePath();
//   ctx.value.fillStyle = color;
//   ctx.value.fill();
// };

const createSpot4 = (spot: Spot, seed: Seed) => {
  const { center } = spot;
  const color = hexToRgba(spot.color, props.spotsSettings.opacity);

  const radius = props.spotsSettings.radiusMin + randomSeed(seed, props.spotsSettings.radiusMin) * props.spotsSettings.radiusMax;

  const radiusBezier = 1.5 * radius;
  const radiusBezierInner = 0.9 * radius;

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

    const randomDeltaAngle = randomSeed(seed, maxDeltaAngle) * maxDeltaAngle + 5; // 10 - 30
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
    
    let angle = randomSeed(seed, fullCircleAngle) * Math.PI + fullCircleAngle;
    const distance = 5 + randomSeed(seed, pointStart.x + pointEnd.x) * Math.sqrt((pointEnd.x - pointStart.x)**2 + (pointEnd.y - pointStart.y)**2)/3;

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
    ctx.value.bezierCurveTo(dotsBezier[2*i+1].x, dotsBezier[2*i+1].y, dotsBezier[2*i+2].x, dotsBezier[2*i+2].y, dots[i+1].x, dots[i+1].y);
  }
  ctx.value.bezierCurveTo(dotsBezier[dotsBezier.length - 1].x, dotsBezier[dotsBezier.length - 1].y, dotsBezier[0].x, dotsBezier[0].y, dots[0].x, dots[0].y);
  // Заканчиваем контур пятна и заполняем его
  ctx.value.closePath();
  ctx.value.fillStyle = color;
  ctx.value.fill();
};

const randomSeed = (seed: Seed, addNumber: number = 0): number => {
  if (!props.spotsSettings.seed) {
    return Math.random();
  }
  const a = 1664525;
  const c = 1013904223;
  const m = 2 ** 32;

  seed.number = (a * (seed.number + addNumber) + c) % m;
  
  // Нормализуем результат до диапазона [0, 1)
  return seed.number / m;
};

const hexToRgba = (hex: string, opacity: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result 
    ? `rgb(${[parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(' ')} / ${opacity}%)` 
    : null;
}

defineExpose({
  render,
  clearCanvas,
  generateImageFile
});
</script>

<style lang='scss' scoped>
.spot-canvas {
  flex: 1 0;
  width: 75vw;
  height: 90vh;
  border: 1px solid rgba(253, 253, 253, 0.477);
  border-radius: 10px;
}
</style>
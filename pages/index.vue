<template>
  <div class="spot-main">
    <SpotCanvas 
      ref="spot-canvas"
      :spots-settings="spotsSettings"
      @seed="v => spotsSettings.seed.number = v"
    />

    <div class="spot-sidebar">
      <h3> Семя для генерации пятен </h3>
      <div class="seed-wrapper">
        <input
          v-model="spotsSettings.seed.checked"
          class="seed-checkbox" 
          type="checkbox"
        >
        <input
          class="seed-input" 
          type="number"
          max="999998"
          :disabled="!spotsSettings.seed.checked"
          :value="spotsSettings.seed.number"
          @input="v => spotsSettings.seed.number = Number((v.target as HTMLInputElement).value)"
        >
      </div>

      <h3> Настройки </h3>

      <div>
        <s-input-color
          label="Цвет пятен"
          :color="spotsSettings.color"
          @input="v => spotsSettings.color = v"
        />
        <s-input-color
          label="Второй цвет"
          :color="spotsSettings.secondColor"
          @input="v => spotsSettings.secondColor = v"
        />
        <s-input-color
          label="Цвет фона"
          :color="spotsSettings.backgroundColor"
          @input="v => spotsSettings.backgroundColor = v"
        />
        <s-input-range
          label="Прозрачность"
          :range="spotsSettings.opacity"
          @input="v => spotsSettings.opacity = v"
        />
        <s-input-min-max
          label="Размер пятен"
          :min="spotsSettings.radiusMin"
          :max="spotsSettings.radiusMax"
          @min-value="v => spotsSettings.radiusMin = v"
          @max-value="v => spotsSettings.radiusMax = v"
        />
        <s-input-min-max
          label="Число пятен"
          :min="spotsSettings.spotsAmountMin"
          :max="spotsSettings.spotsAmountMax"
          @min-value="v => spotsSettings.spotsAmountMin = v"
          @max-value="v => spotsSettings.spotsAmountMax = v"
        />
      </div>

      <section></section>
      
      <button class="glass-button" style="margin-bottom: 8px;" @click="generate">Сгенерировать</button>
      <button class="glass-button" @click="save">Сохранить</button>
      <button class="glass-button" @click="clear">Очистить</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import SpotCanvas from '../components/SpotCanvas.vue';
import type { SpotsSettings } from '../types/SpotSettings.ts';

const spotCanvas = useTemplateRef<InstanceType<typeof SpotCanvas>>('spot-canvas');

const spotsSettings = ref<SpotsSettings>({
  seed: {
    number: 0,
    checked: false,
  },
  color: '#000000',
  secondColor: '#000000',
  backgroundColor: '#ffffff',
  opacity: '100',
  radiusMin: 0,
  radiusMax: 100,
  spotsAmountMin: 0,
  spotsAmountMax: 100,
});

watch(
  spotsSettings,
  (newValue, oldValue) => {
    localStorage.setItem('spotsSettings', JSON.stringify(newValue));
  },
  { deep: true, }
);

onMounted(() => {
  if (localStorage.getItem('spotsSettings')) {
    spotsSettings.value = JSON.parse(localStorage.getItem('spotsSettings') || '{}');
  }
});

const generate = () => {
  console.log('generate');

  spotCanvas.value?.render();
}

const save = () => {
  console.log('save');

  let imageData = spotCanvas.value?.generateImageFile() || "";
  const downloadLink = document.createElement('a');
  downloadLink.href = imageData;
  downloadLink.download = 'untitled.png';
  downloadLink.click();
}

const clear = () => {
  console.log('clear');

  spotCanvas.value?.clearCanvas();
}
</script>

<style lang='scss'>
.spot-main {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
}

.spot-canvas-container {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
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

h3 {
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

.seed-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}
.seed-checkbox {
  width: 20px;
  height: 20px;
}
.seed-input {
  flex: 1;
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
.seed-input:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.473);
}
</style>
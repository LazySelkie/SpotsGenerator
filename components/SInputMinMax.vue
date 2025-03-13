<template>
  <div class="spot-input-min-max-wrapper">
    <s-input
      type="number"
      :label="props.label"
      :value="props.min"
      @input="v => emits('minValue', v)"
    >
      <template #additional>
        <input
          type="number"
          :value="props.max"
          @input="v => emits('maxValue', (v.target as HTMLInputElement).value)"
        >
      </template>
    </s-input>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['input', 'minValue', 'maxValue']);
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  min: {
    type: String,
    default: '0',
  },
  max: {
    type: String,
    default: '100',
  },
});
</script>

<style lang="scss" scoped>
.spot-input-min-max-wrapper :deep(.input-wrapper) {
  display: flex;
  justify-content: space-between;

  input {
    max-width: 40px;
    text-align: center;

    display: inline-block;
    padding: 4px 4px;
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
  input:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.473);
  }
  // чтобы убрать стрелочки вверх-вниз для изменения введенного числа
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0
  }
}
</style>

<template>
  <div class="spot-input-wrapper">
    <label :for="inputId">{{ props.label }}</label>
    <div style="flex: 1">
      <div class="input-wrapper">
        <input
          :id="inputId" 
          :type="props.type"
          :value="props.value"
          @input="v => emits('input', (v.target as HTMLInputElement).value)"
        >
        <slot name="additional"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['input']);
const props = defineProps({
	label: {
		type: String,
    default: '',
	},
  type: {
		type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  }
});

const inputId = useId();
</script>

<style lang='scss' scoped>
.spot-input-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: inherit;
  flex-wrap: wrap;

  label {
    margin: 5px;
    flex: 1;
    text-align: end;
  }
}
</style>
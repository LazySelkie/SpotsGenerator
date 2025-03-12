<template>
  <div class="spot-input-wrapper">
    <label :for="inputId">{{ props.label }}</label>
    <div class="input-wrapper">
      <input
        :id="inputId" 
        :type="props.type"
        :value="props.value"
        @input="v => emits('input', v)"
      >
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

<style lang="scss">
.spot-input-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: inherit;

  label {
    margin: 5px;
  }
}
</style>
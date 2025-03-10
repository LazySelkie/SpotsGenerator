<template>
  <div class="spot-input-wrapper">
    <label for="spot-input-label">{{ props.label }}</label>
		<input 
      id="spot-input" 
      :type="props.type"
      :value="props.value"
      @input="v => emits('input', v)"
    >
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
</script>

<style lang="scss">

</style>
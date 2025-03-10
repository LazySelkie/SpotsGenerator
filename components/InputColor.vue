<template>
  <div class="input-color-wrapper">
    <label for="input-color">{{ props.label }}</label>
		<input id="input-color" class="glass-color-input" type="color">
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
	label: {
		type: String,
    default: '',
	}
});
</script>

<style lang="scss">

</style>
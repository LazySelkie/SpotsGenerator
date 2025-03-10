<template>
  <div class="spot-input-color-wrapper">
    <s-input
			type="color"
			:label="props.label"
			:value="color"
			@input="v => emits('input', v)"
		/>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['input']);
const props = defineProps({
	label: {
		type: String,
    default: '',
	},
	color: {
		type: String,
    default: '#000000',
	}
});
</script>

<style lang="scss">

</style>
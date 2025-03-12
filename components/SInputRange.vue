<template>
  <div class="spot-input-range-wrapper">
    <s-input
			type="range"
			:label="props.label"
			:value="props.range"
			@input="v => emits('input', v)"
		/>
  </div>
</template>

<script setup lang='ts'>
const emits = defineEmits(['input']);
const props = defineProps({
	label: {
		type: String,
    default: '',
	},
	range: {
		type: String,
    default: '0',
	}
});
</script>

<style lang='scss' scoped>
.spot-input-range-wrapper .input-wrapper {

	input[type="range"] {

	}
}

</style>
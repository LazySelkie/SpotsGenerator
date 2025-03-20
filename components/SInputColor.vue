<template>
  <div class="spot-input-color-wrapper">
    <s-input
			type="color"
			:label="props.label"
			:value="props.color"
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
	color: {
		type: String,
    default: '#000000',
	}
});
</script>

<style lang='scss' scoped>
.spot-input-color-wrapper :deep(.input-wrapper) {
  width: 25px;
  height: 25px;
  border-radius: 50px;
  overflow: hidden;

	input[type="color"] {
		border: 0;
		padding: 0;
		width: 200%;
		height: 200%;
		cursor: pointer;
		transform: translate(-25%, -25%)
	}
}
</style>
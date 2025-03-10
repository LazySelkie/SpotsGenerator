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

<style lang='scss'>
// .spot-input-color-wrapper {
//   input[type="color"] {
//     /* width: 10px; */
//     /* height: 10px; */
//     /* display: inline-block; */
//     appearance: none;
//     /* block-size: unset; */
//     background-color: unset;
//     box-sizing: unset;
//     /* padding: 0; */
//     margin: 0;
//     border: unset;
//     border-radius: 100%;
//     inline-size: 20px;
//   }
// }

.spot-input-color-wrapper .input-wrapper {
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
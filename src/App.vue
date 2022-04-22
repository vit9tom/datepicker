<template>
	<Datepicker
		:minDateStr="minDateStr"
		:maxDateStr="maxDateStr"
		:defaultDateStr="defaultDateStr"
		:holidays="holidays"
		@selectDate="selectDate"
	/>
</template>

<script>
import Datepicker from "@/components/Datepicker";
export default {
	name: 'App',
	data() {
		return {
			minDateStr: '2020-04-24',
			maxDateStr: '2022-08-09',
			defaultDateStr: '2022-09-05',
			holidays: [6, 7]
		}
	},
	methods: {
		selectDate(str) {
			this.defaultDateStr = str;
		}
	},
	components: {
		Datepicker
	}
}
</script>

<style lang="less">
</style>

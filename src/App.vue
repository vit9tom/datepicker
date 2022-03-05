<template>
	<main class="root">
		<section class="container">
			<Datepicker
				:minDateStr="minDateStr"
				:maxDateStr="maxDateStr"
				:defaultDateStr="defaultDateStr"
				:holidays="holidays"
				@selectDate="selectDate"
			/>
		</section>
	</main>
</template>

<script>
import Datepicker from "@/components/Datepicker";
export default {
	name: 'App',
	data() {
		return {
			minDateStr: '2022-02-24',
			maxDateStr: '2022-08-09',
			defaultDateStr: '2022-03-05',
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
* {
	box-sizing: border-box;
	font-family: Roboto, sans-serif;
}

.root {
	height: 100vh;
	display: flex;
	justify-content: center;
	padding-top: 100px;
	background: @blocks_color;
}

.container {
	width: 300px;
	position: relative;
	padding-top: 12px;
}

.form {
	&-field {
		&-warning {
			position: absolute;
			top: 0;
			left: 0;
			font-size: 14px;
			color: @warning_color;
		}
	}
}
</style>

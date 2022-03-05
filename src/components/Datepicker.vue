<template>
	<span v-show="isInvalid" class="form-field-warning">
        {{ $t('wrongDate') }}
    </span>

	<div class="datepicker" ref="datepicker">

		<input
			class="datepicker-input"
			type="text"
			:placeholder="$t('chooseDate')"
			v-model.lazy="russianDate"
			@change="setRussianDate"
			@keyup="mask"
			ref="input"
			maxlength="10"
		/>
		<span class="datepicker-icon" @click="toggle">
            <svg
	            aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar"
	            class="svg-inline--fa fa-calendar fa-w-14"
	            role="img" xmlns="http://www.w3.org/2000/svg"
	            viewBox="0 0 448 512">
	            <path
		            d="M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V204c0-6.6 5.4-12 12-12zm436-44v-36c0-26.5-21.5-48-48-48h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v36c0 6.6 5.4 12 12 12h424c6.6 0 12-5.4 12-12z">
	            </path>
            </svg>
        </span>

		<div
			v-show="visible"
			tabindex="1"
			class="datepicker-calendar"
			@blur="hide"
			ref="calendar"
		>

			<template v-if="!yearSelectOpened">
				<div class="datepicker-header">
	                <span class="datepicker-month-arrow datepicker-month-arrow-previous" v-show="hasPreviousMonth" @click="setPreviousMonth">
	                    <svg
		                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left"
		                    class="svg-inline--fa fa-chevron-left fa-w-10"
		                    role="img" xmlns="http://www.w3.org/2000/svg"
		                    viewBox="0 0 320 512">
		                    <path fill="currentColor"
		                          d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z">
		                    </path>
	                    </svg>
	                </span>
					<span
						class="datepicker-month-title"
						:class="{'datepicker-month-title-clickable': yearsArr.length > 1}"
						@click="openYearSelect"
					>
	                    {{ month.name }} {{ month.year }}
		                <svg
			                v-if="yearsArr.length > 1"
			                class="fa-chevron-down datepicker-header-year-arrow"
			                aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img"
			                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
		                >
			                <path fill="currentColor"
			                      d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
			                </path>
		                </svg>
	                </span>
					<span class="datepicker-month-arrow datepicker-month-arrow-next" v-show="hasNextMonth" @click="setNextMonth">
		                <svg
		                    class="svg-inline--fa fa-chevron-right fa-w-10"
		                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right"
		                    role="img" xmlns="http://www.w3.org/2000/svg"
		                    viewBox="0 0 320 512">
		                    <path fill="currentColor"
		                          d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
		                    </path>
		                </svg>
	                </span>
				</div>

				<div class="datepicker-week">
					<span class="datepicker-week-day">{{ $t('mo') }}</span>
					<span class="datepicker-week-day">{{ $t('tu') }}</span>
					<span class="datepicker-week-day">{{ $t('we') }}</span>
					<span class="datepicker-week-day">{{ $t('th') }}</span>
					<span class="datepicker-week-day">{{ $t('fr') }}</span>
					<span class="datepicker-week-day">{{ $t('sa') }}</span>
					<span class="datepicker-week-day">{{ $t('su') }}</span>
				</div>
				<div class="datepicker-days" ref="daysContainer">
                <span class="datepicker-day"
                      :class="{
                        'datepicker-day__disabled': day.disabled,
                        'datepicker-day__active': day.str === selectedDate.getDate() && month.index === selectedDate.getMonth() && month.year === selectedDate.getFullYear()
                      }"
                      :style="dayStyle"
                      v-for="day in month.datesArr"
                      :key="+day.str"
                      @click="selectDate(day.date)"
                >
                    {{ day.str }}
                </span>
				</div>
			</template>

			<div class="datepicker-wheels" v-show="yearSelectOpened">
				<div class="datepicker-wheel-top"></div>
				<div class="datepicker-wheel-border-top"></div>
				<div class="datepicker-wheel-border-bottom"></div>

				<div
					class="datepicker-wheel"
					ref="years"
				>
					<div
						class="datepicker-wheel-item datepicker-wheel-item-year"
						v-for="n in yearsArr"
						:key="n"
						:id="n"
						@wheel.prevent="onWheel($event, 'year')"
						@click="selectYear(n)"
					>
						{{ n }}
					</div>
				</div>
				<div
					class="datepicker-wheel"
					ref="months"
				>
					<div
						class="datepicker-wheel-item datepicker-wheel-item-month"
						v-for="n in monthsArr"
						:key="n"
						:id="n"
						@wheel.prevent="onWheel($event, 'month')"
						@click="selectMonth(n)"
					>
						{{ n }}
					</div>
				</div>

				<div class="datepicker-wheel-bottom"></div>
			</div>

			<div class="datepicker-set" @click="set">{{ $t('apply') }}</div>

		</div>

	</div>
</template>

<script>
export default {
	props: [
		'minDateStr', // yyyy-mm-dd
		'maxDateStr', // yyyy-mm-dd
		'defaultDateStr', // yyyy-mm-dd
		'holidays' // [6,7]
	],
	data() {
		return {
			selectedDate: new Date(),
			visible: false,
			hasToOpen: true,
			localMonthsArr: [
				this.$t('january'),
				this.$t('february'),
				this.$t('march'),
				this.$t('april'),
				this.$t('may'),
				this.$t('june'),
				this.$t('july'),
				this.$t('august'),
				this.$t('september'),
				this.$t('october'),
				this.$t('november'),
				this.$t('december')
			],
			month: {
				index: 0,
				name: 'Январь',
				year: 2019,
				datesArr: [{
					date: new Date(),
					str: 1
				}]
			},
			russianDate: '',
			dayStyle: '',
			yearSelectOpened: false
		}
	},
	computed: {
		minDate() {
			let dateArr = this.minDateStr.split('-').map(str => +str);
			dateArr[1]--;
			return new Date(...dateArr);
		},
		maxDate() {
			let dateArr = this.maxDateStr.split('-').map(str => +str);
			dateArr[1]--;
			return new Date(...dateArr);
		},
		defaultDate() {
			if (!this.defaultDateStr) return undefined;
			let dateArr = this.defaultDateStr.split('-').map(str => +str);
			if (dateArr.find(d => isNaN(d))) return new Date();
			dateArr[1]--;
			return new Date(...dateArr);
		},
		hasPreviousMonth() {
			return (
				this.month.year > this.minDate.getFullYear()
				|| (this.month.year === this.minDate.getFullYear()
					&& this.month.index > this.minDate.getMonth())
			);
		},
		hasNextMonth() {
			return (
				this.month.year < this.maxDate.getFullYear()
				|| (this.month.year === this.maxDate.getFullYear()
					&& this.month.index < this.maxDate.getMonth())
			);
		},
		yearsArr() {
			let arr = [];
			const minYear = this.minDate.getFullYear();
			const maxYear = this.maxDate.getFullYear();
			for (let y = minYear; y <= maxYear; y++) {
				arr.push(y);
			}
			return arr;
		},
		monthsArr() {
			const openedYear = this.month.year;
			const minYear = this.minDate.getFullYear();
			const maxYear = this.maxDate.getFullYear();
			let arr = [...this.localMonthsArr];
			if (openedYear === minYear) {
				const firstMonthIndex = this.minDate.getMonth();
				arr = this.localMonthsArr.slice(firstMonthIndex);
			} else if (openedYear === maxYear) {
				const lastMonthIndex = this.maxDate.getMonth();
				arr = this.localMonthsArr.slice(0, lastMonthIndex + 1);
			}
			return arr;
		},
		isInvalid() {
			return this.isDisabled(this.selectedDate);
		}
	},
	watch: {
		russianDate(val) {
			const dateStr = val.split('.').reverse().join('-');
			this.$emit('selectDate', dateStr);
		},
		defaultDate(val) {
			this.selectedDate = new Date(val);
			this.selectDate(this.selectedDate);
		},
		minDate(val) {
			if (this.selectedDate.getTime() < val.getTime()) {
				this.selectedDate = new Date(val);
				this.selectDate(this.selectedDate);
			}
		},
		maxDate(val) {
			if (this.selectedDate.getTime() > val.getTime()) {
				this.selectedDate = new Date(this.minDate);
				this.selectDate(this.selectedDate);
			}
		},
		visible(val) {
			this.$nextTick(() => {
				if (!val) return;
				if (!this.$refs.daysContainer) return;
				const width = this.$refs.daysContainer.offsetWidth / 7;
				this.dayStyle = `height: ${width}px`;
				this.$refs.calendar.style.height = 80 + width * 6 + 'px';
			});
		}
	},
	mounted() {
		if (this.defaultDate) this.selectedDate = this.defaultDate;
		if (this.selectedDate > this.maxDate) {
			this.selectedDate = this.maxDate;
		} else if (this.selectedDate < this.minDate) {
			this.selectedDate = this.minDate;
		}
		this.selectDate(this.selectedDate);
		this.month.index = this.selectedDate.getMonth();
		this.month.year = this.selectedDate.getFullYear();
		this.setMonth();

		let isYearsScrolling;
		this.$refs.years.addEventListener('scroll', () => {
			window.clearTimeout(isYearsScrolling);
			isYearsScrolling = setTimeout(() => {
				this.handleScroll('year');
			}, 100);
		});

		let isMonthsScrolling;
		this.$refs.months.addEventListener('scroll', () => {
			window.clearTimeout(isMonthsScrolling);
			isMonthsScrolling = setTimeout(() => {
				this.handleScroll('month');
			}, 100);
		});
	},
	methods: {
		hide() {
			setTimeout(() => {
				this.visible = false;
			}, 100);
		},
		show() {
			this.visible = true;
			setTimeout(() => {
				this.setMonth();
			}, 0);
			setTimeout(() => {
				this.$refs.calendar.focus();
			}, 100);
		},
		toggle() {
			this.visible ? this.hide() : this.show();
		},
		setMonthDatesArr(monthIndex, year) {
			const daysInMonth = 32 - new Date(year, monthIndex, 32).getDate();
			this.month.datesArr = [];

			for (let i = 1; i <= daysInMonth; i++) {
				const date = new Date(year, monthIndex, i);
				this.month.datesArr.push({
					date,
					str: i,
					disabled: this.isDisabled(date)
				});
			}
		},
		setMonth() {
			this.month.name = this.localMonthsArr[this.month.index];
			this.setMonthDatesArr(this.month.index, this.month.year);
			const americanWeek = [6, 0, 1, 2, 3, 4, 5];
			const firstDay = americanWeek[this.month.datesArr[0].date.getDay()];
			this.$nextTick(() => {
				if (this.$refs.datepicker) {
					const firstDayNode = this.$refs.datepicker.querySelector('.datepicker-day');
					if (firstDayNode) {
						firstDayNode.style.marginLeft = `calc(${firstDay} * 100% / 7)`;
					}
				}
			});
			this.month = Object.assign({}, this.month);
		},
		setPreviousMonth() {
			if (this.month.index === 0) {
				this.month.year--;
				this.month.index = 11;
			} else {
				this.month.index--;
			}
			this.setMonth();
		},
		setNextMonth() {
			if (this.month.index === 11) {
				this.month.year++;
				this.month.index = 0;
			} else {
				this.month.index++;
			}
			this.setMonth();
		},
		selectDate(date) {
			if (date < this.minDate) {
				this.selectedDate = this.minDate;
			} else if (date > this.maxDate) {
				this.selectedDate = this.maxDate;
			} else {
				this.selectedDate = date;
			}
			this.month.year = this.selectedDate.getFullYear();
			this.month.index = this.selectedDate.getMonth();
			this.russianDate = [
				('0' + this.selectedDate.getDate()).slice(-2),
				('0' + (+this.selectedDate.getMonth() + 1)).slice(-2),
				this.month.year
			].join('.');
		},
		setRussianDate(e) {
			let str = e.target.value.replace(/\D/g, "");
			let val = str.slice(0, 2) + '.' + str.slice(2, 4) + '.' + str.slice(-4);
			if (!str) {
				this.selectDate(this.minDate);
				return;
			}
			const dateArr = val.split('.').map(str => +str).reverse();
			dateArr[1]--;
			let userDate = new Date(...dateArr);
			if (userDate > this.maxDate) {
				this.selectDate(this.maxDate);
			} else if (userDate < this.minDate) {
				this.selectDate(this.minDate);
			} else if (this.isDisabled(userDate)) {
				let date = new Date(userDate);
				while (this.isDisabled(date)) {
					date.setDate(date.getDate() - 1);
				}
				this.selectDate(date);
			} else {
				this.selectDate(userDate);
			}
		},
		onWheel(e, field) {
			const wheel = field === 'year' ? this.$refs.years : this.$refs.months;
			const newPos = e.deltaY > 0 ? wheel.scrollTop + 40 : wheel.scrollTop - 40;
			wheel.scroll({
				top: newPos
			});
		},
		handleScroll(field) {
			const wheel = field === 'year' ? this.$refs.years : this.$refs.months;
			const nodes = [...wheel.querySelectorAll('.datepicker-wheel-item')];
			const getPosition = n => {
				const pos = n.getBoundingClientRect().top - wheel.getBoundingClientRect().top;
				return Math.round(pos);
			}
			let selectedNode = nodes.find(n => getPosition(n) >= 80 && getPosition(n) < 120);
			if (!selectedNode) {
				if (wheel.scrollTop < 80) {
					selectedNode = nodes[0];
				} else {
					selectedNode = nodes[nodes.length - 1];
				}
			}

			const selected = selectedNode.id;
			if (field === 'year') {
				this.month.year = +selected;
				this.scrollToItem('year', +selected);
				if (!this.monthsArr.includes(this.month.name)) {
					this.month.name = this.monthsArr[0];
					this.month.index = this.localMonthsArr.indexOf(this.monthsArr[0]);
					this.scrollToItem('month', this.month.name);
				}
			} else {
				this.month.name = selected;
				this.month.index = this.localMonthsArr.indexOf(selected);
				this.scrollToItem('month', this.month.name);
			}
		},
		scrollToItem(field, item) {
			let wheel, top;
			if (field === 'year') {
				wheel = this.$refs.years;
				const startYear = this.yearsArr[0];
				top = (+item - startYear) * 40;
			} else if (field === 'month') {
				wheel = this.$refs.months;
				const index = this.localMonthsArr.indexOf(item);
				const startIndex = this.localMonthsArr.indexOf(this.monthsArr[0]);
				top = (index - startIndex) * 40;
			}
			wheel.scroll({
				top
			});
		},
		selectYear(y) {
			this.month.year = y;
			this.scrollToItem('year', y);
		},
		selectMonth(m) {
			this.month.name = m;
			this.month.index = this.localMonthsArr.indexOf(m);
			this.scrollToItem('month', m);
		},
		openYearSelect() {
			if (this.yearsArr.length > 1) {
				this.yearSelectOpened = true;
				this.$nextTick(() => {
					this.scrollToItem('year', this.month.year);
					this.scrollToItem('month', this.month.name);
				});
			}
		},
		closeYearSelect() {
			this.yearSelectOpened = false;
			this.setMonth();
		},
		set() {
			if (this.yearSelectOpened) {
				this.closeYearSelect();
			} else {
				this.hide();
			}
		},
		isHoliday(date) {
			if (!this.holidays) return false;
			const week = [7, 1, 2, 3, 4, 5, 6];
			return this.holidays.includes(week[date.getDay()]);
		},
		isDisabled(date) {
			return (
				date.getTime() < this.minDate.getTime()
				|| this.isHoliday(date)
				|| date.getTime() > this.maxDate.getTime()
			);
		},
		mask(e) {
			e.target.value = e.target.value.replace(/[^\d\.]/g, "");
			if (e.key !== 'Backspace' && e.key !== '.') {
				let arr = e.target.value.split('');
				switch (e.target.value.length) {
					case 2:
						arr[2] = '.';
						e.target.value = arr.join('');
						break;
					case 3:
						arr[3] = arr[2]
						arr[2] = '.';
						e.target.value = arr.join('');
						break;
					case 5:
						arr[5] = '.';
						e.target.value = arr.join('');
						break;
					case 6:
						arr[6] = arr[5]
						arr[5] = '.';
						e.target.value = arr.join('');
						break;
					default:
						break;
				}
			}
		}
	}
}
</script>

<style lang="less">
.datepicker {
	user-select: none;
	position: relative;
	display: flex;
	text-align: center;

	&-input {
		background: transparent;
		font-size: 18px;
		color: lighten(contrast(@blocks_color), 20%);
		padding: 5px 30px 5px 0;
		border: none;
		border-bottom: 1px solid lighten(contrast(@blocks_color), 40%);
		outline: none;
		display: block;
		width: 100%;
		position: relative;
		resize: none;
		font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, Oxygen-Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
	}

	&-icon {
		position: absolute;
		height: 20px;
		width: 20px;
		right: 6px;
		top: 6px;
		display: block;
		z-index: 1;
		cursor: pointer;

		path {
			fill: @color;
		}
	}

	&-header {
		position: relative;
		text-align: center;
		padding: 4px 0 8px;

		&-year-arrow {
			height: .7em;

			path {
				fill: #333;
			}
		}
	}

	&-calendar {
		color: #333;
		outline: none;
		width: 100%;
		position: absolute;
		top: 35px;
		left: 0;
		right: 0;
		padding: 10px;
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 0 0 3px 0 rgba(0, 0, 0, .5);
		border: 1px solid #d8d8dc;
		z-index: 2;
		overflow: hidden;
	}

	&-week {
		display: flex;
		text-align: center;
		margin-top: 5px;
		padding-bottom: 5px;
		border-bottom: 1px solid #333;

		&-day {
			display: block;
			width: calc(100% / 7);
		}
	}

	&-month-title {
		display: block;
		text-align: center;

		&-clickable {
			cursor: pointer;
		}
	}

	&-month-arrow {
		display: block;
		cursor: pointer;
		position: absolute;
		top: 5px;

		svg {
			width: 15px;
			height: 15px;
		}

		path {
			fill: @color;
		}

		&-previous {
			left: 0;
		}

		&-next {
			right: 0;
		}
	}

	&-days {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		align-items: center;
		margin-top: 5px;
	}

	&-day {
		line-height: 1;
		width: calc(100% / 7);
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			color: @color;
		}

		@media (max-width: 768px) {
			font-size: 18px;
		}

		&__active {
			background-color: @color;
			color: #fff;
			border-radius: 50%;

			&:hover {
				color: #fff;
			}
		}

		&__disabled {
			color: #d8d8dc;
			cursor: default;
			pointer-events: none;

			&:hover {
				color: #d8d8dc;
			}
		}

	}

	&-set {
		position: absolute;
		right: 20px;
		bottom: 12px;
		color: @color;
		cursor: pointer;
	}

	&-wheels {
		background: #fff;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		position: relative;
		height: 200px;
	}

	&-wheel {
		font-size: 20px;
		overflow: scroll;

		width: 50%;

		@media (max-width: 768px) {
			font-size: 22px;
		}

		&-item {
			width: 100%;
			height: 40px;
			cursor: pointer;
			user-select: none;
			line-height: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			&-hour {
				text-align: right;
				padding-right: 32px;
			}

			&-minute {
				padding-left: 32px;
			}

		}

		&-top {
			position: absolute;
			top: 0;
			z-index: 2;
			width: 100%;
			box-shadow: 0 20px 70px 50px #fff;
		}

		&-bottom {
			position: absolute;
			bottom: 0;
			width: 100%;
			box-shadow: 0 -20px 70px 50px #fff;
		}

		&-border-top, &-border-bottom {
			background: @color;
			height: 2px;
			position: absolute;
			left: 10px;
			right: 10px;
		}

		&-border-top {
			top: 80px;
		}

		&-border-bottom {
			top: 120px;
		}

		:first-child {
			margin-top: 80px;
		}

		:last-child {
			margin-bottom: 80px;
		}

		&::-webkit-scrollbar {
			display: none;
		}

		&::-webkit-scrollbar-button {
			display: none;
		}

		&::-webkit-scrollbar-track {
			display: none;
		}

		&::-webkit-scrollbar-thumb {
			display: none;
		}
	}

}
</style>
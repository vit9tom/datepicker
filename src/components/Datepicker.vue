<template>
	<main class="root">
		<section class="container">
			<span v-show="isInvalid" class="form-field-warning">
		        Некорректная дата
		    </span>

			<div class="datepicker" ref="datepicker">

				<input
					class="datepicker-input"
					type="text"
					placeholder="Выберите дату"
					v-model.lazy="russianDate"
					@change="onInputChange"
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
			                <span v-show="hasPreviousMonth" class="datepicker-month-arrow datepicker-month-arrow-previous"
			                      @click="setPreviousMonth">
			                    <svg
				                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left"
				                    class="svg-inline--fa fa-chevron-left fa-w-10"
				                    role="img" xmlns="http://www.w3.org/2000/svg"
				                    viewBox="0 0 320 512">
				                    <path
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
					                <path
						                d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z">
					                </path>
				                </svg>
			                </span>
							<span class="datepicker-month-arrow datepicker-month-arrow-next" v-show="hasNextMonth"
							      @click="setNextMonth">
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
							<span
								v-for="weekDay in localWeekDays"
								:key="weekDay"
								class="datepicker-week-day"
							>{{ weekDay }}</span>
						</div>
						<div class="datepicker-days" ref="daysContainer">
		                <div class="datepicker-day"
		                      :class="{
		                        'datepicker-day__disabled': day.disabled,
		                        'datepicker-day__active': day.number === selectedDate.getDate() && month.index === selectedDate.getMonth() && +month.year === selectedDate.getFullYear()
		                      }"
		                      :style="dayStyle"
		                      v-for="day in month.datesArr"
		                      :key="day.number"
		                      @click="selectDate(day.date)"
		                >
		                    {{ day.number }}
		                </div>
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
								@wheel.prevent.stop="onWheel($event, 'year')"
								@click="selectYear(n.toString())"
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
								@wheel.prevent.stop="onWheel($event, 'month')"
								@click="selectMonth(n)"
							>
								{{ n }}
							</div>
						</div>

						<div class="datepicker-wheel-bottom"></div>
					</div>

					<div class="datepicker-set" @click="set">Применить</div>

				</div>

			</div>

		</section>
	</main>
</template>

<script lang="ts">
import type {TDateKebab, TRussianDate} from '../plugins/dates'
import {getDateFromKebab} from '../plugins/dates'
import {computed, defineComponent, PropType, ref, reactive} from "vue";

type TWheel = 'year' | 'month';

export default defineComponent({
	props: {
		minDateStr: {
			type: String as PropType<TDateKebab>,
			required: true
		},
		maxDateStr: {
			type: String as PropType<TDateKebab>,
			required: true
		},
		defaultDateStr: {
			type: String as PropType<TDateKebab>,
			required: false,
			default: ''
		},
		holidays: {
			type: Array as PropType<number[]>,
			required: false,
			default: []
		}
	},
	setup(props, context) {
		let selectedDate = ref<Date>(new Date());
		let visible = ref<Boolean>(false);
		let hasToOpen = ref<Boolean>(true);

		type TMonthObj = {
			index: number,
			name: string,
			year: string,
			datesArr: Array<{
				date: Date,
				number: number
			}>
		}

		let month = ref<TMonthObj>({
			index: 0,
			name: 'Январь',
			year: '2019',
			datesArr: [{
				date: new Date(),
				number: 1
			}]
		});

		let russianDate = ref<TRussianDate>('');
		let dayStyle = ref<String>('');
		let yearSelectOpened = ref<Boolean>(false);

		let minDate = computed<Date>(() => getDateFromKebab(props.minDateStr));
		let minYear = computed<number>(() => minDate.value.getFullYear());
		let maxDate = computed<Date>(() => getDateFromKebab(props.maxDateStr));
		let maxYear = computed<number>(() => maxDate.value.getFullYear());
		let defaultDate = computed<Date>(() => getDateFromKebab(props.defaultDateStr));

		let hasPreviousMonth = computed<Boolean>(() => +month.value.year > minYear.value
			|| (+month.value.year === minYear.value && month.value.index > minDate.value.getMonth()));
		let hasNextMonth = computed<Boolean>(() => +month.value.year < maxYear.value
			|| (+month.value.year === maxYear.value && month.value.index < maxDate.value.getMonth()));

		let yearsArr = computed<number[]>(() => {
			let arr: number[] = [];
			for (let y = minYear.value; y <= maxYear.value; y++) arr.push(y);
			return arr;
		});

		const isHoliday = (date: Date): Boolean => {
			const week = [7, 1, 2, 3, 4, 5, 6];
			return props.holidays.includes(week[date.getDay()]);
		}

		const isDisabled = (date: Date): Boolean => {
			return (
				date < minDate.value
				|| isHoliday(date)
				|| date > maxDate.value
			);
		}

		let isInvalid = computed<Boolean>(() => isDisabled(selectedDate.value));

		const localMonthsArr = [
			"Январь",
			"Февраль",
			"Март",
			"Апрель",
			"Май",
			"Июнь",
			"Июль",
			"Август",
			"Сентябрь",
			"Октябрь",
			"Ноябрь",
			"Декабрь",
		];
		const localWeekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
		let monthsArr = computed<string[]>(() => {
			const openedYear: number = +month.value.year;
			let arr: string = [...localMonthsArr];
			if (openedYear === minYear.value) {
				const firstMonthIndex = minDate.value.getMonth();
				arr = localMonthsArr.slice(firstMonthIndex);
			} else if (openedYear === maxYear.value) {
				const lastMonthIndex = maxDate.value.getMonth();
				arr = localMonthsArr.slice(0, lastMonthIndex + 1);
			}
			return arr;
		});

		return {
			selectedDate,
			visible,
			hasToOpen,
			month,
			russianDate,
			dayStyle,
			yearSelectOpened,
			minDate,
			minYear,
			maxYear,
			maxDate,
			defaultDate,
			hasPreviousMonth,
			hasNextMonth,
			yearsArr,
			isDisabled,
			isInvalid,
			localMonthsArr,
			localWeekDays,
			monthsArr
		}
	},
	watch: {
		russianDate(val) {
			const dateStr: string = val.split('.').reverse().join('-');
			this.$emit('selectDate', dateStr);
		},
		defaultDate: {
			handler(val) {
				this.selectDate(val);
			},
			immediate: true
		},
		minDate: {
			handler(val) {
				if (this.selectedDate < val) {
					this.selectDate(val);
				}
			},
			immediate: true
		},
		maxDate: {
			handler(val) {
				if (this.selectedDate > val) {
					this.selectDate(this.maxDate);
				}
			},
			immediate: true
		},
		visible(val) {
			this.$nextTick(() => {
				if (!val) return;
				if (!this.$refs.daysContainer) return;
				const width: number = (this.$refs.daysContainer as any).offsetWidth / 7;
				this.dayStyle = `height: ${width}px`;
				(this.$refs.calendar as any).style.height = 80 + width * 6 + 'px';
			});
		}
	},
	mounted() {
		this.month.index = this.selectedDate.getMonth();
		this.month.year = this.selectedDate.getFullYear().toString();
		this.setMonth();

		for (let field of ['year', 'month']) {
			(this.$refs[field + 's'] as HTMLElement).addEventListener('scroll', () => {
				this.handleScroll(field as TWheel);
			});
		}
	},
	methods: {
		hide(): void {
			setTimeout(() => {
				this.visible = false;
			}, 100);
		},
		show(): void {
			this.visible = true;
			setTimeout(() => {
				this.setMonth();
			}, 0);
			setTimeout(() => {
				(this.$refs.calendar as any).focus();
			}, 100);
		},
		toggle(): void {
			this.visible ? this.hide() : this.show();
		},
		getMonthIndex(name: string): number {
			return this.localMonthsArr.indexOf(name);
		},
		setMonth(): void {
			const _ = this;
			const {index, year} = _.month;
			_.month.name = _.localMonthsArr[index];
			const daysInMonth = 32 - new Date(+year, index, 32).getDate();
			_.month.datesArr = [];
			for (let day = 1; day <= daysInMonth; day++) {
				const date: Date = new Date(+year, index, day);
				const obj = {
					date,
					number: day,
					disabled: _.isDisabled(date)
				}
				_.month.datesArr.push(obj);
			}
			const americanWeek = [6, 0, 1, 2, 3, 4, 5];
			const firstDay = americanWeek[_.month.datesArr[0].date.getDay()];
			_.$nextTick(() => {
				if (_.$refs.datepicker) {
					const firstDayNode = (_.$refs.datepicker as any).querySelector('.datepicker-day');
					if (firstDayNode) firstDayNode.style.marginLeft = `calc(${firstDay} * 100% / 7)`;
				}
			});
		},
		setPreviousMonth(): void {
			if (this.month.index === 0) {
				this.month.year = (+this.month.year - 1).toString();
				this.month.index = 11;
			} else {
				this.month.index--;
			}
			this.setMonth();
		},
		setNextMonth(): void {
			if (this.month.index === 11) {
				this.month.year = (+this.month.year + 1).toString();
				this.month.index = 0;
			} else {
				this.month.index++;
			}
			this.setMonth();
		},
		selectDate(date: Date): void {
			if (date < this.minDate) {
				this.selectedDate = new Date(this.minDate);
			} else if (date > this.maxDate) {
				this.selectedDate = new Date(this.maxDate);
			} else {
				this.selectedDate = new Date(date);
			}
			this.russianDate = [
				('0' + this.selectedDate.getDate()).slice(-2),
				('0' + (+this.selectedDate.getMonth() + 1)).slice(-2),
				this.selectedDate.getFullYear()
			].join('.');
		},
		onInputChange(e: Event): void {
			const val: string = (e.target as HTMLInputElement).value;
			let userDate: Date = this.minDate;
			if (val.length === 10) {
				const dateArr: number[] = val.split('.').map(p => +p);
				dateArr[1]--;
				userDate = new Date(dateArr[2], dateArr[1], dateArr[0]);
				if (this.isDisabled(userDate)) {
					while (this.isDisabled(userDate)) {
						userDate.setDate(userDate.getDate() - 1);
					}
				}
			}
			this.month.year = userDate.getFullYear();
			this.month.index = userDate.getMonth();
			this.setMonth();
			this.selectDate(userDate);
		},
		mask(e: KeyboardEvent): void {
			const input: HTMLInputElement = e.target as HTMLInputElement;
			input.value = input.value.replace(/[^\d\.]/g, "");
			if (e.key !== 'Backspace' && e.key !== '.') {
				let arr: string[] = input.value.split('');
				switch (input.value.length) {
					case 2:
						arr[2] = '.';
						break;
					case 3:
						arr[3] = arr[2]
						arr[2] = '.';
						break;
					case 5:
						arr[5] = '.';
						break;
					case 6:
						arr[6] = arr[5]
						arr[5] = '.';
						break;
					default:
						break;
				}
				input.value = arr.join('');
			}
		},
		onWheel(e: WheelEvent, field: TWheel): void {
			const wheel: HTMLElement = this.$refs[field + 's'] as HTMLElement;
			const newPos: number = e.deltaY > 0 ? wheel.scrollTop + 40 : wheel.scrollTop - 40;
			wheel.scroll({
				top: newPos
			});
		},
		handleScroll(field: TWheel): void {
			const _ = this;
			const wheel: HTMLElement = _.$refs[field + 's'] as HTMLElement;
			const nodes: Element[] = [...wheel.querySelectorAll('.datepicker-wheel-item')];
			const getPosition = (n: Element): number => {
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
			const id = selectedNode.id;
			if (field === 'year') {
				_.selectYear(id);
				if (_.monthsArr.includes(_.month.name)) return;
				_.month.index = _.getMonthIndex(_.monthsArr[0]);
			} else {
				_.month.index = _.getMonthIndex(id);
			}
		},
		scrollToItem(field: TWheel, item: string): void {
			let wheel: HTMLElement = this.$refs[field + 's'] as HTMLElement;
			let top: number;
			if (field === 'year') {
				top = (+item - this.minYear) * 40;
			} else {
				const index: number = this.getMonthIndex(item);
				const startIndex: number = this.getMonthIndex(this.monthsArr[0]);
				top = (index - startIndex) * 40;
			}
			wheel.scroll({
				top
			});
		},
		selectYear(y: string): void {
			this.month.year = y;
			this.scrollToItem('year', y);
		},
		selectMonth(m: string): void {
			this.month.index = this.getMonthIndex(m);
			this.scrollToItem('month', m);
		},
		openYearSelect(): void {
			if (this.yearsArr.length > 1) {
				this.yearSelectOpened = true;
				this.$nextTick(() => {
					this.scrollToItem('year', this.month.year);
					this.scrollToItem('month', this.month.name);
				});
			}
		},
		closeYearSelect(): void {
			this.yearSelectOpened = false;
			this.setMonth();
		},
		set(): void {
			if (this.yearSelectOpened) {
				this.closeYearSelect();
			} else {
				this.hide();
			}
		}
	}
})
</script>

<style lang="less">
@blocks_color: #ffffff;
@warning_color: #ce3527;
@color: #2bbd5c;

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
	padding: 12px 0;
}

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
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		line-height: 20px;

		&-year-arrow {
			height: .7em;
			margin-left: 4px;

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
		padding: 10px 10px 15px;
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
		display: flex;
		flex-direction: row;
		align-items: center;

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

		> div {
			line-height: 1;
		}

	}

	&-set {
		position: absolute;
		right: 20px;
		bottom: 6px;
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
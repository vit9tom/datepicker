import { mount } from '@vue/test-utils'
import Datepicker from '../../src/components/Datepicker.vue'

/*
    1. Проверить данные при разных входных (из сторибука).
    2. Проверить окрашивание выходных
    3. Выбор даты, выбор некорректной даты
    4. Следующий/предыдущий месяц
    5. Ввод в поле, маска, коррекция
    6. Колёса: клик, скролл и свайп
    7. Открытие/закрытие окна
    8. Соответствие дням недели конкретного месяца
    9. Проверить событие
*/

const getRussianDate = (date) => {
    return [
        ('0' + date.getDate()).slice(-2),
        ('0' + (+date.getMonth() + 1)).slice(-2),
        date.getFullYear()
    ].join('.');
}

const cases = [
    {
        props: {
            minDateStr: '2020-04-24',
            maxDateStr: '2024-08-09',
            defaultDateStr: '2022-09-05',
            holidays: [6, 7]
        },
        expected: {
            hasPreviousMonth: true,
            hasNextMonth: true,
            yearsArr: [2020, 2021, 2022, 2023, 2024],
            month: {
                index: 8,
                year: "2022"
            },
            russianDate: '05.09.2022',
            isInvalid: false
        }
    },
    {
        props: {
            minDateStr: '2020-04-24',
            maxDateStr: '2024-08-09',
            defaultDateStr: '2022-09-04',
            holidays: [6, 7]
        },
        expected: {
            hasPreviousMonth: true,
            hasNextMonth: true,
            yearsArr: [2020, 2021, 2022, 2023, 2024],
            month: {
                index: 8,
                year: "2022"
            },
            russianDate: '04.09.2022',
            isInvalid: true
        }
    },
    {
        props: {
            minDateStr: '2020-04-24',
            maxDateStr: '2022-08-09',
            defaultDateStr: '2022-09-05',
            holidays: []
        },
        expected: {
            hasPreviousMonth: true,
            hasNextMonth: false,
            yearsArr: [2020, 2021, 2022],
            month: {
                index: 7,
                year: "2022"
            },
            russianDate: '09.08.2022',
            isInvalid: false
        }
    },
    {
        props: {
            minDateStr: '2020-04-24',
            maxDateStr: '2022-08-09',
            defaultDateStr: '2019-09-05',
            holidays: []
        },
        expected: {
            hasPreviousMonth: false,
            hasNextMonth: true,
            yearsArr: [2020, 2021, 2022],
            month: {
                index: 3,
                year: "2020"
            },
            russianDate: '24.04.2020',
            isInvalid: false
        }
    },
    {
        props: {
            minDateStr: '2022-04-24',
            maxDateStr: '2022-08-09',
            defaultDateStr: '2022-06-04',
            holidays: [7]
        },
        expected: {
            hasPreviousMonth: true,
            hasNextMonth: true,
            yearsArr: [2022],
            month: {
                index: 5,
                year: "2022"
            },
            russianDate: '04.06.2022',
            isInvalid: false
        }
    },
    {
        props: {
            minDateStr: '2020-04-24',
            maxDateStr: '2028-08-09',
            defaultDateStr: '',
            holidays: []
        },
        expected: {
            hasPreviousMonth: true,
            hasNextMonth: true,
            yearsArr: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028],
            month: {
                index: (new Date()).getMonth(),
                year: (new Date()).getFullYear().toString()
            },
            russianDate: getRussianDate(new Date()),
            isInvalid: false
        }
    },

]

describe.each(cases)('$props holidays: $props.holidays $expected', ({props, expected}) => {
    const wrapper = mount(Datepicker, {props});

    it('hasPreviousMonth', function () {
        expect(wrapper.vm.hasPreviousMonth).toEqual(expected.hasPreviousMonth);
    });
    it('hasNextMonth', function () {
        expect(wrapper.vm.hasNextMonth).toEqual(expected.hasNextMonth);
    });
    it('yearsArr', function () {
        expect(wrapper.vm.yearsArr).toEqual(expected.yearsArr);
    });
    it('month.index', function () {
        expect(wrapper.vm.month.index).toEqual(expected.month.index);
    });
    it('month.year', function () {
        expect(wrapper.vm.month.year).toEqual(expected.month.year);
    });
    it('russianDate', function () {
        expect(wrapper.vm.russianDate).toEqual(expected.russianDate);
    });
    it('isInvalid', function () {
        expect(wrapper.vm.isInvalid).toEqual(expected.isInvalid);
    });

    // const prevMonthBtn = wrapper.get('.datepicker-month-arrow-previous');
    // const nextMonthBtn = wrapper.get('.datepicker-month-arrow-next');

    it('disabled holidays', function () {
        const isHoliday = (date) => {
            const week = [7, 1, 2, 3, 4, 5, 6];
            return props.holidays.includes(week[date.getDay()]);
        }
        const holidayDates = wrapper.vm.month.datesArr.filter(d => isHoliday(d.date));
        const enabledDay = holidayDates.find(d => d.disabled === false);
        expect(enabledDay).toBe(undefined);
    });
})
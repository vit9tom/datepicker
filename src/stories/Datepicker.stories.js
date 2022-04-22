import Datepicker from '../components/Datepicker.vue';

export default {
    title: 'Datepicker',
    component: Datepicker,
    argTypes: {
        minDateStr: { control: 'text' },
        maxDateStr: { control: 'text' },
        defaultDateStr: { control: 'text' },
        holidays: { control: 'inline-check', options: [1,2,3,4,5,6,7] }
    },
};

const Template = (args) => ({
    components: { Datepicker },
    setup() { return { args }; },
    template: '<Datepicker v-bind="args" />',
});

export const Normal = Template.bind({});
Normal.args = {
    minDateStr: '2020-04-24',
    maxDateStr: '2024-08-09',
    defaultDateStr: '2022-09-05',
    holidays: [6, 7]
};

export const Invalid = Template.bind({});
Invalid.args = {
    minDateStr: '2020-04-24',
    maxDateStr: '2024-08-09',
    defaultDateStr: '2022-09-04',
    holidays: [6, 7]
};

export const MaxDate = Template.bind({});
MaxDate.args = {
    minDateStr: '2020-04-24',
    maxDateStr: '2022-08-09',
    defaultDateStr: '2022-09-05',
    holidays: []
};

export const MinDate = Template.bind({});
MinDate.args = {
    minDateStr: '2020-04-24',
    maxDateStr: '2022-08-09',
    defaultDateStr: '2019-09-05',
    holidays: []
};

export const OneYear = Template.bind({});
OneYear.args = {
    minDateStr: '2022-04-24',
    maxDateStr: '2022-08-09',
    defaultDateStr: '2022-06-04',
    holidays: [7]
};

export const Today = Template.bind({});
Today.args = {
    minDateStr: '2020-04-24',
    maxDateStr: '2022-08-09',
    defaultDateStr: '',
    holidays: []
};
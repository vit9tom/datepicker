import {createI18n} from 'vue-i18n'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
    return {
        "en": {
            "chooseDate": "Choose date",
            "wrongDate": "Wrong date",
            "mo": "mo",
            "tu": "tu",
            "we": "we",
            "th": "th",
            "fr": "fr",
            "sa": "sa",
            "su": "su",
            "january": "January",
            "february": "February",
            "march": "March",
            "april": "April",
            "may": "May",
            "june": "June",
            "july": "July",
            "august": "August",
            "september": "September",
            "october": "October",
            "november": "November",
            "december": "December",
            "apply": "Apply"
        },
        "ru": {
            "chooseDate": "Выберите дату",
            "wrongDate": "Некорректная дата",
            "mo": "пн",
            "tu": "вт",
            "we": "ср",
            "th": "чт",
            "fr": "пт",
            "sa": "сб",
            "su": "вс",
            "january": "Январь",
            "february": "Февраль",
            "march": "Март",
            "april": "Апрель",
            "may": "Май",
            "june": "Июнь",
            "july": "Июль",
            "august": "Август",
            "september": "Сентябрь",
            "october": "Октябрь",
            "november": "Ноябрь",
            "december": "Декабрь",
            "apply": "Применить"
        }
    }
}

export default createI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'ru',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'ru',
    globalInjection: true,
    messages: loadLocaleMessages()
})

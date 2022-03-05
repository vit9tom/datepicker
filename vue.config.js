const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pluginOptions: {
        i18n: {
            locale: 'ru',
            fallbackLocale: 'ru',
            // localeDir: 'assets/locales',
            enableInSFC: true
        }
    },
    css: {
        loaderOptions: {
            less: {
                additionalData: `
                    @import "@/assets/main.less";
                `
            }
        }
    }
})

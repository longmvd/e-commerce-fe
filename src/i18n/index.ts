import { createI18n } from 'vue-i18n'
import en from './en'
import vi from './vi'


const messages = {
    en,
    vi
}
// const t = useI18n();
// export function setLocale(value: string){
//     t.locale.value = value
// }

export default createI18n({
    locale: 'vi',
    fallbackLocale: 'en',
    messages,
    legacy: false
})


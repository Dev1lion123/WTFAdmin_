import en from './trans/en.json'
import rus from './trans/rus.json'

import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'


const resourses = {
    en:{
        translation: en,
    },
    rus:{
        translation: rus,
    },
}

i18n
.use(initReactI18next)
.use(Backend)
.use(LanguageDetector)
.init({
    debug: true,
    fallbackLng:'ru'
})

export default i18n
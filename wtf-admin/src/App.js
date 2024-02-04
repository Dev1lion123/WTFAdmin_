import React, { useEffect } from 'react';
import Header from './components/header/Header'
import Page from './components/page/Page'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next';
import useLocalStorage from './hooks/use-localstorage';
import i18n from './i18n';
import Loader from './components/Loader/Loader';


import './styles/appereance.css'
import './styles/media.css'
import './styles/settings.css'
import './styles/simplebar.css'
import './styles/style.css'


function App() {
  const {t, i18n} = useTranslation()
  const[language, setLanguage] = useLocalStorage('language', 'en')

  const handleLanguageChange = () => {
    if(language === 'en'){
      i18n.changeLanguage('ru')
      setLanguage('ru')
    }else if(language === 'ru'){
      i18n.changeLanguage('en')
      setLanguage('en')
    }
  }

  


  return (
    <div>
      <div className="wrapper data-simplebar">
        <Header/>
        <Page/>
      </div>
    </div>
    
  );
}


export default function WrappedApp(){
  return(
    <Suspense fallback='...loading'>
      <App />
    </Suspense>
  )
};

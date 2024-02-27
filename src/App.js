import React, { useEffect, useState  } from 'react';
import Header from './components/header/Header'
import Page from './components/page/Page.js'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next';
import useLocalStorage from './hooks/use-localstorage';
import i18n from './i18n';
import './styles/appereance.css'
import './styles/media.css'
import './styles/settings.css'
import './styles/simplebar.css'
import './styles/style.css'
import FileUpload from './components/DragNDrop/DragDrop.js';

function App() {
  const {t, i18n} = useTranslation()
  const[language, setLanguage] = useLocalStorage('language', 'en')

  const handleLanguageChange = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en'; 
    setLanguage(newLanguage)
  }


const App = () => {
  return (
    <div>
      <h1>Cloudinary Image Upload</h1>
      <FileUpload />
    </div>
  );
};

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

import React from "react";
import { useEffect, useState } from "react";

export const useValidation = (value, validators) => {
    // определяем базовые состояния для полей формы
    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    // делаем свитч для вариации типов валидации по длине строки, пустоте и корректности почты через регулярное выражение
    useEffect(() => {
        for (const validation in validators) {
            switch(validation){
                case 'minLength':
                    value.length < validators[validation] ? setMinLengthError(true) : setMinLengthError(false)
                    break
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break
                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break
            }
        }
    }, [value])

    // определяем активность кнопки отправки формы. Если все проверки валидны - кнопка становится активной 
    useEffect(() => {
        if(isEmpty || emailError || minLengthError){
            setInputValid(false)
        }else{
            setInputValid(true)
            
        }
    }, [isEmpty, emailError, minLengthError])

    // возвращаем все состояния
    return{
        isEmpty,
        minLengthError,
        emailError,
        inputValid,
    }
}
// описываем состояния инпута
export const useInput = (initialValue, validators) => {
    const [value, setValue] = useState(initialValue) // состояние значения в инпуте
    const [isDirty, setDirty] = useState(false) //состояние показывает то, был ли выход из инпута или нет
    const valid = useValidation(value, validators)

    // изменения значения в инпуте
    const onChange = (e) => {
        setValue(e.target.value)
    }

    // проверка на пустоту и выход с кривозаполненного или незаполненного инпута
    const onBlur = () =>{
        setDirty(true)
    }

    // возвращаем все состояния
    return{
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid,
    }
}

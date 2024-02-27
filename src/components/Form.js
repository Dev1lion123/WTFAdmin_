import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal/Modal";
import { useInput } from "../hooks/use-form-validate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCircleCheck } from "@fortawesome/free-solid-svg-icons";
import DragDropFile from "./DragNDrop/DragDrop.js";
import axios from "axios";

const sign = <FontAwesomeIcon icon={faPersonCircleCheck} size="2x" marginRight="10px" />;

function Form() {
  const [modalActive, setModalActive] = useState(false);
  const [file, setFile] = useState(null); // Состояние для хранения выбранного изображения
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file); 
      formData.append('title', title.value);
      formData.append('link', link.value);
      formData.append('text', text.value);

      const response = await axios.post("/api/uploadPhoto", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log("Данные успешно отправлены на сервер");
        setModalActive(true);
      } else {
        console.error("Ошибка при отправке данных на сервер:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error.message);
    }
  };

  // Функция для обработки выбранного изображения
  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  // Form validation
  const { t } = useTranslation();
  const title = useInput("", { isEmpty: true, minLength: 5 });
  const link = useInput("", { isEmpty: true, minLength: 2 });
  const text = useInput("", { isEmpty: true, minLength: 2 });
  

  return (
    <form className="contact__form" onSubmit={handleSubmit}>
      <div className="input__data">
        <input
          onBlur={title.onBlur}
          value={title.value}
          onChange={title.onChange}
          className="name__input input form__control element-animation"
          type="text"
          placeholder={t("post.title")}
          name="title"
          required
        />
        {title.isDirty && title.isEmpty && <div className="form__error">{t("error.empty")}</div>}
        {title.isDirty && title.minLengthError && (
          <div className="form__error">{t("error.length")}</div>
        )}
      </div>

      <div className="input__data">
        <input
          onBlur={link.onBlur}
          value={link.value}
          onChange={link.onChange}
          className="link__input input form__control element-animation"
          type="text"
          placeholder={t("post.link")}
          name="link"
          required
        />
        {link.isDirty && link.isEmpty && <div className="form__error">{t("error.empty")}</div>}
        {link.isDirty && link.minLengthError && (
          <div className="form__error">{t("error.length")}</div>
        )}
      </div>

      <DragDropFile onFileChange={handleFileChange} /> 

      <div className="input__data">
        <textarea
          onBlur={text.onBlur}
          value={text.value}
          onChange={text.onChange}
          className="form__textarea form__control element-animation"
          name="text"
          id=""
          cols="30"
          rows="10"
          placeholder={t("post.text")}
        ></textarea>
        {text.isDirty && text.isEmpty && <div className="form__error">{t("error.empty")}</div>}
        {text.isDirty && text.minLengthError && (
          <div className="form__error">{t("error.length")}</div>
        )}
      </div>

      <div className="input__data">
        <button
          type="submit"
          className="send__btn form__control element-animation"
          
        >
          {t("post.send")}
        </button>
      </div>

      {modalActive && (
        <Modal
          active={modalActive}
          setActive={setModalActive}
          icon={sign}
          text={t("modal.message")}
        />
      )}
    </form>
  );
}

export default Form;

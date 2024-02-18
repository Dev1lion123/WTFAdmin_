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
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Отправляем POST-запрос на сервер с данными формы
      const response = await axios.post("/api/addData", {
        title: title.value,
        link: link.value,
        pic: pic.value,
        text: text.value
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

  // form validation
  const { t } = useTranslation();
  const title = useInput("", { isEmpty: true, minLength: 5 });
  const link = useInput("", { isEmpty: true, minLength: 2 });
  const pic = useInput("", { isEmpty: true, minLength: 1 });
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

      <DragDropFile />

      <div className="input__data">
        <textarea
          onBlur={text.onBlur}
          value={text.value}
          onChange={text.onChange}
          className="form__textarea form__control element-animation"
          name="text"
          id="text"
          placeholder={t("post.text")}
        ></textarea>
        {text.isDirty && text.isEmpty && <div className="form__error">{t("error.empty")}</div>}
        {text.isDirty && text.minLengthError && (
          <div className="form__error">{t("error.length")}</div>
        )}
      </div>

      <button
        disabled={!title.inputValid || !link.inputValid || !text.inputValid}
        className="form__btn form__control element-animation"
        type="submit"
        name="submit"
      >
        {t("post.button")}
      </button>
      <Modal active={modalActive} setActive={setModalActive}>
        {sign}
        <p>{t("contact.modalThanks")}</p>
        <br />
        <p>{t("contact.modalRequest")}</p>
      </Modal>
    </form>
  );
}

export default Form;

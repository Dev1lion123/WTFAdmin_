import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "./Modal/Modal";
import { useValidation, useInput } from "../hooks/use-form-validate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCircleCheck } from "@fortawesome/free-solid-svg-icons";
import './DragNDrop/DragDrop.js'
import DragDropFile from "./DragNDrop/DragDrop.js";
const sign = <FontAwesomeIcon icon={faPersonCircleCheck} size="2x" marginRight="10px"/>

function Form() {
  const [modalActive, setModalActive] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузка страницы)

    // Ваши данные для отправки на сервер
    const formData = {
      title: title.value,
      link: link.value,
      pic: pic.value,
      text: text.value,
    };

    try {
      const response = await fetch("path/to/your/server-script.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Server response:", data);
        // Здесь вы можете обработать успешный ответ от сервера, если нужно
        setModalActive(true);
      } else {
        console.error("Server response error:", response.status, response.statusText);
        // Здесь вы можете обработать ошибку от сервера, если нужно
      }
    } catch (error) {
      console.error("Fetch error:", error);
      // Здесь вы можете обработать ошибку fetch, если нужно
    }
  };

  // form validation
  const { t, i18n } = useTranslation();
  const title = useInput("", { isEmpty: true, minLength: 5 });
  const link = useInput("", { isEmpty: true, minLength: 2 });
  const pic = useInput("", { isEmpty: true, minLength: 1 });
  const text = useInput("", { isEmpty: true, minLength: 2 });

 

  return (
    <form className="contact__form" action="../database/send.php" method="post">
      
      <div className="input__data">
        <input
          onBlur={(e) => title.onBlur(e)}
          value={title.value}
          onChange={(e) => title.onChange(e)}
          className="name__input input form__control element-animation"
          type="text"
          placeholder={t("post.title")}
          name="name"
          required
        />
        {title.isDirty && title.isEmpty && (
          <div className="form__error">{t("error.empty")}</div>
        )}
        {title.isDirty && title.minLengthError && (
          <div className="form__error">{t("error.length")}</div>
        )}
      </div>
      
      <div className="input__data">
        <input
          onBlur={(e) => link.onBlur(e)}
          value={link.value}
          onChange={(e) => link.onChange(e)}
          className="link__input input form__control element-animation"
          type="text"
          placeholder={t("post.link")}
          name="link"
          required
        />
        {link.isDirty && link.isEmpty && (
          <div className="form__error">{t("error.empty")}</div>
        )}
        {link.isDirty && link.minLengthError && (
          <div className="form__error">{t("error.length")}</div>
        )}
      </div>
      
      <DragDropFile/>
      <div className="input__data">
        <input
          onBlur={(e) => pic.onBlur(e)}
          value={pic.value}
          onChange={(e) => pic.onChange(e)}
          className="pic__input input form__control element-animation"
          type="text"
          placeholder={t("post.pic")}
          name="pic"
          required
        />
        {/* {pic.isDirty && pic.emailError && (
          <div className="form__error">{t("error.invalidEmail")}</div>
        )} */}
        {pic.isDirty && pic.isEmpty && (
          <div className="form__error">{t("error.empty")}</div>
        )}
        {pic.isDirty && pic.minLengthError && (
          <div className="form__error">{t("error.length")}</div>
        )}
      </div>
      
      <div className="input__data">
        <textarea
          onBlur={(e) => text.onBlur(e)}
          value={text.value}
          onChange={(e) => text.onChange(e)}
          className="form__textarea form__control element-animation"
          name="text"
          id="text"
          placeholder={t("post.text")}
        ></textarea>
        {text.isDirty && text.isEmpty && (
        <div className="form__error">{t("error.empty")}</div>
        )}
        {text.isDirty && text.minLengthError && (
          <div className="form__error">{t("error.length")}</div>
        )}
      </div>

      
      
      <button onSubmit={handleSubmit}
        disabled={
          !title.inputValid ||
          !link.inputValid ||
          !pic.inputValid ||
          !text.inputValid
        }
        onClick={() => setModalActive(true)}
        className="form__btn form__control element-animation"
        type="submit"
        name="submit"
      >
        {t("post.button")}
      </button>
      <Modal active={modalActive} setActive={setModalActive}>
        {sign}
        <p>
          {t("contact.modalThanks")}
        </p>
        <br></br>
        <p>
          {t("contact.modalRequest")}
        </p>
      </Modal>
    </form>
  );
}

export default Form;

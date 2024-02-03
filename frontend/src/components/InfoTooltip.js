import React from "react";
import successIcon from "../images/success.svg";
import failIcon from "../images/error.svg";

export default function InfoTooltip({ name, onClose, isOpen, err }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <button
        onClick={onClose}
        type="button"
        className="popup__close-button opacity"
        aria-label="Закрыть попап"
      ></button>
      <div className="popup__image-container">
        <div className="infotooltip">
          <img
            className="infotooltip__image"
            src={err ? failIcon : successIcon}
            alt="Вы успешно зарегистрировались"
          />
          <p className="infotooltip__text">
            {err
              ? "Что-то пошло не так! Попробуйте ещё раз."
              : "Вы успешно зарегистрировались!"}
          </p>
        </div>
      </div>
    </div>
  );
}

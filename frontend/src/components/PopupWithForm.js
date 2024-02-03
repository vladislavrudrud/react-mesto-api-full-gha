import React from "react";

export default function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="form form_type_new-card"
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className="form__button" type="submit">
            {buttonText}
          </button>
        </form>
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button btn"
          aria-label="Закрытие popup"
        ></button>
      </div>
    </div>
  );
}

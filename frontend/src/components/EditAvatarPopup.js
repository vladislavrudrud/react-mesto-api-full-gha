import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const link = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: link.current.value,
    });
  }

  useEffect(() => {
    if (!isOpen) {
      link.current.value = "";
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      name="upd-ava"
      buttonText="Создать"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        ref={link}
        className="form__input form__input_avatar_link"
        id="ava-url-input"
        name="cardLink"
        type="url"
        placeholder="Ссылка на изображение"
        autoComplete="off"
        onChange={(e) => (link.current.value = e.target.value)}
        required
      />
      <span className="form__input-error ava-url-input-error"></span>
    </PopupWithForm>
  );
}

import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      title="Новое место"
      name="add-card"
      buttonText="Создать"
      onClose={onClose}
    >
      <input
        className="form__input form__input_card_name"
        id="add-card-input"
        name="cardName"
        type="text"
        placeholder="Название"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <span className="form__input-error add-card-input-error"></span>
      <input
        className="form__input form__input_card_link"
        id="card-link-input"
        name="cardLink"
        type="url"
        placeholder="Ссылка на изображение"
        autoComplete="off"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />
      <span className="form__input-error card-link-input-error"></span>
    </PopupWithForm>
  );
}

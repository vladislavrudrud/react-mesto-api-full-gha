import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }

    if (!isOpen) {
      setName("");
      setDescription("");
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Редактировать профиль"
      name="profile-info"
      buttonText="Создать"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_user_name"
        id="user-name-input"
        name="userName"
        type="text"
        placeholder="Представьтесь"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <span className="form__input-error user-name-input-error"></span>
      <input
        className="form__input form__input_user_work"
        id="user-work-input"
        name="userWork"
        type="text"
        placeholder="Ваша работа"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={(event) => setDescription(event.target.value)}
        required
      />
      <span className="form__input-error user-work-input-error"></span>
    </PopupWithForm>
  );
}

import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import iconPencil from '../images/icon-pen.svg';

import Card from "./Card";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
      <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
              src={currentUser.avatar}
              alt="Аватарка"
              className="profile__avatar"
          />
          <img
              className="profile__updavatar-button"
              src={iconPencil}
              alt="edit-pencil"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button btn"
            onClick={onEditProfile}
          ></button>
          <p className="profile__work">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button btn"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="card" aria-label="Карточки">
        <ul className="card__items">
          {cards.map((obj) => (
            <Card
              key={obj._id}
              obj={obj}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card({ obj, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = obj.owner === currentUser._id;
  const isLiked = obj.likes.some((i) => i === currentUser._id);
  const cardLikesBtnClassname = `card__button-likes${
    isLiked ? "_active" : ""
  } btn`;

  return (
    <li className="card__item">
      <img
        className="card__image"
        src={obj.link}
        alt={obj.name}
        onClick={() => onCardClick(obj)}
      />
      <div className="card__description">
        <p className="card__title">{obj.name}</p>
        <div className="card__likes">
          <button
            type="button"
            className={cardLikesBtnClassname}
            aria-label="Сердечко"
            onClick={() => onCardLike(obj)}
          ></button>
          <p className="card__likes-count">{obj.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="card__button-delete btn"
          onClick={() => onCardDelete(obj)}
        ></button>
      )}
    </li>
  );
}

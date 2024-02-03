import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onRegister({ email, password });
      }}
      className="auth-form"
    >
      <p className="auth-form__welcome">Регистрация</p>
      <input
        className="auth-form__input form__input_user_email"
        id="user-email-input"
        name="email"
        type="email"
        placeholder="Email"
        minLength="2"
        maxLength="40"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <span className="form__input-error auth-form__input-error"></span>
      <input
        className="auth-form__input form__input_user_password"
        id="user-password-input"
        name="password"
        type="password"
        placeholder="Пароль"
        minLength="6"
        maxLength="200"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <span className="form__input-error auth-form__input-error"></span>

      <button type="submit" className="auth-form__submit-button">
        Зарегистрироваться
      </button>
      <div className="auth-form__text">
        <span>Уже зарегистрированы? </span>
        <Link to="/sign-in" className="auth-form__link">
          Войти
        </Link>
      </div>
    </form>
  );
}

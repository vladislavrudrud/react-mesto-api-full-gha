import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin({ email, password });
      }}
      className="auth-form"
    >
      <p className="auth-form__welcome">Вход</p>
      <input
        className="auth-form__input form__input_user_email"
        id="user-email-input"
        name="email"
        value={email}
        type="email"
        placeholder="Email"
        minLength="2"
        onChange={(e) => setEmail(e.target.value)}
        maxLength="40"
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        maxLength="200"
        required
      />
      <span className="form__input-error auth-form__input-error"></span>
      <button type="submit" className="auth-form__submit-button">
        Войти
      </button>
    </form>
  );
}

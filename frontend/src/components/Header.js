import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import logoSvg from "../images/logo.svg";
export default function Header({ email, onQuit }) {
  return (
    <header className="header">
      <div className="header__flex">
        <div>
          <img className="header__logo" src={logoSvg} alt="Логотип Место" />
        </div>
        <div>
          {email && <span className="header__email">{email}</span>}
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Link className="header__link" to={"/sign-in"}>
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link className="header__link" to={"/sign-up"}>
                  Регистрация
                </Link>
              }
            />
            <Route
              path="/"
              element={
                <Link className="header__link" onClick={onQuit} to={"/sign-in"}>
                  Выйти
                </Link>
              }
            />
          </Routes>
        </div>
      </div>
    </header>
  );
}

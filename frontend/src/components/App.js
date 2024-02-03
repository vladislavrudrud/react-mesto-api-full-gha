import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Api } from "../utils/Api";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../utils/Auth.js";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [infoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const api = new Api({
    baseUrl: "https://api.kolos.nomoredomainsmonster.ru",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json",
    },
  })

  useEffect(() => {
    if(isLogged) {
      Promise.all([api.getProfile(), api.getInitialCards()])
          .then(([user, cards]) => {
            setCurrentUser(user);
            setCards(cards.reverse());
          })
          .catch((error) => {
          });
    }
  }, [isLogged]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          console.log(res.email)
          setCurrentUser(res)
          setIsLogged(true);
            setEmail(res.email);
            navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  function handleCardClick(data) {
    setSelectedCard(data);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevState) => prevState.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    api
      .setProfile(user)
      .then(() => {
        setCurrentUser({ ...currentUser, name: user.name, about: user.about });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(obj) {
    if (!obj.email || !obj.password) {
      return;
    }
    auth
      .login(obj)
      .then((data) => {
        if (data.token) {
          setIsLogged(true);
          localStorage.setItem("token", data.token);
          setEmail(obj.email);
          navigate("/");
        }
      })
      .catch((err) => {
        setErr(true);
        setIsInfoTooltipOpen((prev) => !prev);
      });
  }

  function handleRegister(obj) {
    if (!obj.email || !obj.password) {
      return;
    }
    auth
      .register(obj)
      .then((data) => {
        setErr(false);
        setIsInfoTooltipOpen((prev) => !prev);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setErr(true);
        setIsInfoTooltipOpen((prev) => !prev);
      });
  }

  function handleQuit() {
    setEmail("");
    localStorage.removeItem("token");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <Header email={email} onQuit={handleQuit} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLogged={isLogged}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="del-confirm"
          buttonText="Да"
        ></PopupWithForm>

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          name="infotooltip"
          err={err}
        />
      </CurrentUserContext.Provider>
      {/* <template id="card-template">

      </template> */}
    </div>
  );
}

export default App;

import React from "react";
import PopupWithForm from "./PopupWithForm";
import Card from "./Card";
import { api } from "../utils/api.js";
import ImagePopup from "./ImagePopup";

export default function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__user-pic-box" onClick={props.onEditAvatar}>
          <img
            className="profile__user-pic"
            src={userAvatar}
            alt="Картинка профиля."
          />
        </div>
        <PopupWithForm
          name="user-pic-update"
          title="Обновить аватар"
          btnText="Сохранить"
          isOpen={props.isEditAvatarPopupOpen}
          onClose={props.closeAllPopups}
        >
          <input
            type="url"
            id="user-pic-url-input"
            className="popup__input popup__input_type_user-pic-url"
            name="input-user-pic-url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error user-pic-url-input-error"></span>
        </PopupWithForm>
        <div className="profile__user-info-box">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-btn"
            type="button"
            onClick={props.onEditProfile}
            aria-label="Рекдатировать профиль."
          ></button>
          <PopupWithForm
            name="profile-edit"
            title="Редактировать профиль"
            btnText="Сохранить"
            isOpen={props.isEditProfilePopupOpen}
            onClose={props.closeAllPopups}
          >
            <input
              type="text"
              id="user-name-input"
              className="popup__input popup__input_type_name"
              name="input-user-name"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
            />
            <span className="popup__input-error user-name-input-error"></span>
            <input
              type="text"
              id="user-about-input"
              className="popup__input popup__input_type_about"
              name="input-user-about"
              placeholder="О себе"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="popup__input-error user-about-input-error"></span>
          </PopupWithForm>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button
          className="profile__add-card"
          type="button"
          onClick={props.onAddPlace}
          aria-label="Добавить карточку."
        ></button>
        <PopupWithForm
          name="add-card"
          title="Новое место"
          btnText="Сохранить"
          isOpen={props.isAddPlacePopupOpen}
          onClose={props.closeAllPopups}
        >
          <input
            type="text"
            id="card-name-input"
            className="popup__input popup__input_type_card-name"
            name="input-card-name"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__input-error card-name-input-error"></span>
          <input
            type="url"
            id="card-url-input"
            className="popup__input popup__input_type_card-url"
            name="input-card-url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error card-url-input-error"></span>
        </PopupWithForm>
      </section>

      <section className="cards page__section" aria-label="Места.">
        {cards.map((data) => (
          <Card key={data._id} data={data} onCardClick={props.onCardClick}/>
        ))}
      </section>

      <ImagePopup card={props.selectedCard} onClose={props.closeAllPopups}/>

      <PopupWithForm
        name="del-card"
        title="Вы уверены?"
        btnText="Да"
      />
    </main>
  );
}

import { useState, useEffect } from "react";
import Card from "./Card";
import { api } from "../utils/api.js";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
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
        <div className="profile__user-pic-box" onClick={onEditAvatar}>
          <img
            className="profile__user-pic"
            src={userAvatar}
            alt="Картинка профиля."
          />
        </div>

        <div className="profile__user-info-box">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-btn"
            type="button"
            onClick={onEditProfile}
            aria-label="Рекдатировать профиль."
          ></button>

          <p className="profile__about">{userDescription}</p>
        </div>
        <button
          className="profile__add-card"
          type="button"
          onClick={onAddPlace}
          aria-label="Добавить карточку."
        ></button>
      </section>

      <section className="cards page__section" aria-label="Места.">
        {cards.map((data) => (
          <Card key={data._id} data={data} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

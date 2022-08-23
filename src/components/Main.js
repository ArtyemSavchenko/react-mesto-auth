import { useState, useEffect, useContext } from "react";
import Card from "./Card";
import { api } from "../utils/api.js";
import { CurrentUserInfo } from "../contexts/CurrentUserContext";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
}) {
  const [cards, setCards] = useState([]);

  const user = useContext(CurrentUserInfo);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === user._id);

    if (!isLiked) {
      api.putLike(card._id).then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(err => console.log(err));
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(err => console.log(err));
    }
  };

  const handleCardDelete = (card) => {
    api.delCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
    .catch(err => console.log(err));
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__user-pic-box" onClick={onEditAvatar}>
          <img
            className="profile__user-pic"
            src={user.avatar}
            alt="Картинка профиля."
          />
        </div>

        <div className="profile__user-info-box">
          <h1 className="profile__name">{user.name}</h1>
          <button
            className="profile__edit-btn"
            type="button"
            onClick={onEditProfile}
            aria-label="Рекдатировать профиль."
          ></button>

          <p className="profile__about">{user.about}</p>
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
          <Card
            key={data._id}
            data={data}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

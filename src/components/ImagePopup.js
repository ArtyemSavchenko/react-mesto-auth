import React from 'react';

export default function ImagePopup({ card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card && "popup_active"}`}>
      <div className="card-image">
        <figure className="card-image__box">
          <img
            className="card-image__img"
            src={card.link}
            alt={card.name}
          />
          <figcaption className="card-image__caption">
            {card.name}
          </figcaption>
        </figure>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть форму."
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

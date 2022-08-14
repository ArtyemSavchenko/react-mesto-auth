import React from 'react';

export default function Card({ data, onCardClick }) {
  function handleClick() {
    onCardClick(data);
  }

  return (
    <article className="card">
      <img
        src={data.link}
        alt={data.name}
        className="card__img"
        onClick={handleClick}
      />
      <h2 className="card__title">{data.name}</h2>
      <div className="card__like-box">
        <button
          className="card__like"
          type="button"
          aria-label="Нравится."
        ></button>
        <span className="card__like-number">{data.likes.length}</span>
      </div>
      <button className="card__del" type="button" aria-label="Удалить"></button>
    </article>
  );
}

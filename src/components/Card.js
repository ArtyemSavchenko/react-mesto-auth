export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.data);
  }

  return (
    <article className="card">
      <img
        src={props.data.link}
        alt={props.data.name}
        className="card__img"
        onClick={handleClick}
      />
      <h2 className="card__title">{props.data.name}</h2>
      <div className="card__like-box">
        <button
          className="card__like"
          type="button"
          aria-label="Нравится."
        ></button>
        <span className="card__like-number">{props.data.likes.length}</span>
      </div>
      <button className="card__del" type="button" aria-label="Удалить"></button>
    </article>
  );
}

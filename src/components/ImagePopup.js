export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card && "popup_active"}`}>
      <div className="card-image">
        <figure className="card-image__box">
          <img
            className="card-image__img"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="card-image__caption">
            {props.card.name}
          </figcaption>
        </figure>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть форму."
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

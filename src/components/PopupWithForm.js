export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} popup_type_form ${
        props.isOpen && "popup_active"
      }`}
    >
      <div className="popup__window">
        <h3 className="popup__title">{props.title}</h3>
        <form
          className="popup__form"
          name={props.name}
          autoComplete="off"
          noValidate
        >
          {props.children}
          <button className="popup__submit-btn" type="submit" >
            {props.btnText}
          </button>
        </form>
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

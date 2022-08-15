export default function PopupWithForm({ name, title, children, btnText, onClose, isOpen}) {
  return (
    <div
      className={`popup popup_type_${name} popup_type_form ${
        isOpen && "popup_active"
      }`}
    >
      <div className="popup__window">
        <h3 className="popup__title">{title}</h3>
        <form
          className="popup__form"
          name={name}
          autoComplete="off"
          noValidate
        >
          {children}
          <button className="popup__submit-btn" type="submit" >
            {btnText}
          </button>
        </form>
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

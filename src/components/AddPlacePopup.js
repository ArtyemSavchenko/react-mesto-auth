import { useState } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = useState('');
  const [cardUrl, setCardUrl] = useState('');
  
  const handleChangeCardName = (e) => {
    setCardName(e.target.value);
  }

  const handleChangeCardUrl = (e) => {
    setCardUrl(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: cardName,
      link: cardUrl,
    })
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
        value={cardName}
        onChange={handleChangeCardName}
      />
      <span className="popup__input-error card-name-input-error"></span>
      <input
        type="url"
        id="card-url-input"
        className="popup__input popup__input_type_card-url"
        name="input-card-url"
        placeholder="Ссылка на картинку"
        required
        value={cardUrl}
        onChange={handleChangeCardUrl}
      />
      <span className="popup__input-error card-url-input-error"></span>
    </PopupWithForm>
  );
}
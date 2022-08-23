import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputUrlref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(inputUrlref.current.value);
    inputUrlref.current.value = '';
  }

  return (
    <PopupWithForm
      name="user-pic-update"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="user-pic-url-input"
        className="popup__input popup__input_type_user-pic-url"
        name="input-user-pic-url"
        placeholder="Ссылка на картинку"
        required
        ref={inputUrlref}
      />
      <span className="popup__input-error user-pic-url-input-error"></span>
    </PopupWithForm>
  );
}
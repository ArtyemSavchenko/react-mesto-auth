import Popup from './Popup';
import successIcon from '../images/icon-success.svg';
import failureIcon from '../images/icon-failure.svg';

export default function InfoTooltip({ isOpen, success, onClose }) {
  return (
    <Popup window isOpen={isOpen} onClose={onClose}>
      {success ? (
        <div className="reg-info">
          <img className="reg-info__img" src={successIcon} />
          <p className="reg-info__text">Вы успешно зарегистрировались!</p>
        </div>
      ) : (
        <div className="reg-info">
          <img className="reg-info__img" src={failureIcon} />
          <p className="reg-info__text">
            Что-то пошло не так! Попробуйте ещё раз.
          </p>
        </div>
      )}
    </Popup>
  );
}

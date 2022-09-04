import { useEffect } from 'react';

export default function Popup({ isOpen, onClose, children, window }) {
  const handlerOverlayClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    document.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        onClose();
      }
    });

    return () => {
      document.removeEventListener('keyup', e => {
        if (e.key === 'Escape') {
          onClose();
        }
      });
    };
  }, []);

  return (
    <div
      className={`popup${isOpen ? ' popup_active' : ''}`}
      onClick={handlerOverlayClick}
    >
      <div className={window ? 'popup__window' : 'popup__content-box'}>
        {children}
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

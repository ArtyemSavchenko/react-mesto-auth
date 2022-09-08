import { useEffect, useState } from 'react';
import styles from './Notification.module.css';

const Notification = ({ id, type, heading, text, onClose, delayClose }) => {
  const [notificationClass, setNotificationClass] = useState(
    styles.notification
  );

  const closeNotification = () => {
    setNotificationClass(string =>
      string.replace(styles.notificationOnLoad, styles.notificationOnClose)
    );
    setTimeout(() => {
      onClose(id);
    }, 1500);
  };

  const handlerBtnCloseClick = () => {
    closeNotification();
  };

  useEffect(() => {
    setNotificationClass(classNot => {
      if (type === 'done') {
        return classNot + ' ' + styles.notificationDone;
      }
      if (type === 'error') {
        return classNot + ' ' + styles.notificationError;
      }
    });
  }, []);

  useEffect(() => {
    if (delayClose && delayClose > 0) {
      setTimeout(() => {
        closeNotification();
      }, delayClose);
    }
  }, []);

  useEffect(() => {
    setNotificationClass(classNot => {
      return classNot + ' ' + styles.notificationOnLoad;
    });
  }, []);

  return (
    <article aria-label="Уведомление" className={notificationClass}>
      <div>
        <p className={styles.heading}>{heading}</p>
        <p className={styles.text}>{text}</p>
      </div>
      <button
        type="button"
        className={styles.btnClose}
        onClick={handlerBtnCloseClick}
        aria-label="Закрыть уведомление"
      />
    </article>
  );
};
export default Notification;

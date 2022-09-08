import Notification from './Notification';
import styles from './Notofications.module.css';

const Notofications = ({ notifications, delayClose }) => {
  return (
    <div className={styles.box}>
      {notifications.list.map(item => (
        <Notification
          {...item}
          key={item.id}
          onClose={notifications.closeNotification}
          delayClose={delayClose}
        />
      ))}
    </div>
  );
};

export default Notofications;

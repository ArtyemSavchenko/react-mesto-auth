import { useState } from 'react';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const pushNotification = notification => {
    const date = new Date();
    const newId = date.getSeconds() + date.getMilliseconds() + Math.random();
    setNotifications(nots => [
      {
        ...notification,
        id: newId
      },
      ...nots
    ]);
  };

  const closeNotification = id => {
    setNotifications(nots =>
      nots.reduce((prev, not) => {
        if (not.id !== id) {
          prev.push(not);
        }
        return prev;
      }, [])
    );
  };

  return [{ list: notifications, closeNotification }, pushNotification];
};

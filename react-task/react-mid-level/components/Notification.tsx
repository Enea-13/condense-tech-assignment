"use client";

import { useCallback, useEffect, useState } from "react";

const message = "Added movie to favorites!";

// TODO: use ContextApi
export const Notification: React.FC = (notify = false) => {
  const [notification, setNotification] = useState(notify);

  const onClose = useCallback(() => {
    setNotification(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    notification && (
      <div>
        <p>{message}</p>
      </div>
    )
  );
};
export default Notification;

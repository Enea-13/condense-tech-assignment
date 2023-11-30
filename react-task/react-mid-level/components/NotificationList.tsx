"use client";

import { Notification, useNotification } from "@/context/Notification";

const NotificationList = () => {
  const { notifications } = useNotification();

  return (
    <div>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
        />
      ))}
    </div>
  );
};

export default NotificationList;

"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

type Notification = {
  id: number;
  message: string;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (message: string) => void;
  removeNotification: (id: number) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

// Notification provider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string) => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
    };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

    // Automatically remove the notification after 5 seconds
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  // Context values
  const contextValues: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={contextValues}>
      {children}
    </NotificationContext.Provider>
  );
};

// Notification component
export const Notification: React.FC<Notification> = ({ id, message }) => {
  const { removeNotification } = useNotification();

  const handleRemove = () => {
    removeNotification(id);
  };

  return (
    <div>
      <p>{message}</p>
      <button onClick={handleRemove}>Dismiss</button>
    </div>
  );
};

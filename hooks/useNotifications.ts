import { useCallback } from "react";
import * as Notifications from "expo-notifications";

export const initNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

export const askNotificationsPermission = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus !== "granted") {
    await Notifications.requestPermissionsAsync();
  }
};

export const useNotifications = () => {
  const show = useCallback(async (title: string, message: string) => {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: message,
      },
      trigger: null,
    });
  }, []);

  return { show };
};

export default useNotifications;

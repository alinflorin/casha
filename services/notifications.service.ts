import * as Notifications from "expo-notifications";

class NotificationsService {
  init() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }

  async askPermission() {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    if (existingStatus !== "granted") {
      await Notifications.requestPermissionsAsync();
    }
  }

  async show(title: string, message: string) {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: message,
      },
      trigger: null,
    });
  }
}

export const notificationsService = new NotificationsService();
export default notificationsService;

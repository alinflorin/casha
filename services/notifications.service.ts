import * as Notifications from 'expo-notifications';

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
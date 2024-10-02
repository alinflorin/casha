import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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
    if (Platform.OS === 'web') {
      alert(title + ": " + message);
      return '';
    }
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
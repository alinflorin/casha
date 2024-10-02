class NotificationsService {
  init() {
    console.log('Notifications init not needed.');
  }

  async askPermission() {
    await Promise.resolve();
  }

  async show(title: string, message: string) {
    await Promise.resolve();
    alert(title + ': ' + message);
    return "";
  }
}

export const notificationsService = new NotificationsService();
export default notificationsService;

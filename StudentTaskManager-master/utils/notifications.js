import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';

// Konfigurimi i njoftimeve në sfond
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Kërkon leje për njoftime
export async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// Planifikon një njoftim për një afat detyre
export async function scheduleTaskNotification(task) {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  const deadline = new Date(task.deadline);
  deadline.setDate(deadline.getDate() - 1); // 1 ditë para afatit

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Kujtesë për Detyrën 📌',
      body: `Afati për "${task.title}" është nesër!`,
      sound: true,
    },
    trigger: deadline,
  });
}

import { ref, onMounted, watch } from 'vue';

// Створюємо глобальні змінні для спільного стану між компонентами
const notifications = ref([]);
const unreadCount = ref(0);
const loading = ref(false);
const error = ref(null);

// Глобальна функція для розрахунку кількості непрочитаних сповіщень
const calculateUnreadCount = () => {
  unreadCount.value = notifications.value.filter(n => !n.read).length;
};

export function useNotifications() {
  // Функція для отримання сповіщень з API
  const fetchNotifications = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      // В реальному додатку тут має бути запит до API
      // У демо версії просто використовуємо локальні сповіщення
      calculateUnreadCount();
    } catch (err) {
      console.error('Помилка отримання сповіщень:', err);
      error.value = 'Не вдалося завантажити сповіщення';
    } finally {
      loading.value = false;
    }
  };
  
  // Функція для позначення сповіщення як прочитаного
  const markAsRead = async (notificationId) => {
    try {
      // Для демонстрації просто оновлюємо локальний стан
      const notification = notifications.value.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
        calculateUnreadCount();
      }
      
      return true;
    } catch (err) {
      console.error('Помилка при позначенні сповіщення як прочитаного:', err);
      return false;
    }
  };
  
  // Функція для позначення всіх сповіщень як прочитаних
  const markAllAsRead = async () => {
    try {
      // Для демонстрації просто оновлюємо локальний стан
      notifications.value.forEach(notification => {
        notification.read = true;
      });
      
      calculateUnreadCount();
      return true;
    } catch (err) {
      console.error('Помилка при позначенні всіх сповіщень як прочитаних:', err);
      return false;
    }
  };
  
  // Функція для видалення сповіщення
  const removeNotification = async (notificationId) => {
    try {
      // Для демонстрації просто оновлюємо локальний стан
      notifications.value = notifications.value.filter(n => n.id !== notificationId);
      calculateUnreadCount();
      
      return true;
    } catch (err) {
      console.error('Помилка при видаленні сповіщення:', err);
      return false;
    }
  };
  
  // Оновлена функція додавання сповіщення
  const addNotification = async (message, type = 'info', options = {}) => {
    try {
      // Створюємо нове сповіщення
      const newNotification = {
        id: Date.now(), // Унікальний ID на основі часу
        type: type,
        message: message,
        read: false,
        createdAt: new Date()
      };
      
      // Додаємо нове сповіщення на початок масиву
      notifications.value = [newNotification, ...notifications.value];
      
      // Перераховуємо кількість непрочитаних
      calculateUnreadCount();
      
      // Викликаємо подію, щоб сповістити інші компоненти про нове сповіщення
      window.dispatchEvent(new CustomEvent('new-notification', { 
        detail: { notification: newNotification, options } 
      }));
      
      // Додаємо звук сповіщення, якщо вказано
      if (options.playSound) {
        playNotificationSound();
      }
      
      return newNotification;
    } catch (err) {
      console.error('Помилка при створенні сповіщення:', err);
      return null;
    }
  };
  
  // Функція для відтворення звуку сповіщення
  const playNotificationSound = () => {
    try {
      // Створюємо аудіоелемент зі звуком сповіщення
      // В реальному проекті має бути посилання на дійсний аудіофайл
      const audio = new Audio('/sounds/notification.mp3');
      audio.volume = 0.5;
      
      // Спробуємо відтворити звук
      const playPromise = audio.play();
      
      // Обробка помилок при відтворенні звуку
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Не вдалося відтворити звук сповіщення:', error);
          // Більшість браузерів дозволяють автоматичне відтворення звуку лише після взаємодії користувача зі сторінкою
        });
      }
    } catch (error) {
      console.error('Помилка при відтворенні звуку сповіщення:', error);
    }
  };
  
  // Спеціалізовані функції для різних типів сповіщень з додатковими опціями
  const addSuccessNotification = (message, options = { playSound: true, autoOpen: true }) => 
    addNotification(message, 'success', options);
    
  const addErrorNotification = (message, options = { playSound: true, autoOpen: true }) => 
    addNotification(message, 'error', options);
    
  const addWarningNotification = (message, options = { playSound: true, autoOpen: true }) => 
    addNotification(message, 'warning', options);
    
  const addInfoNotification = (message, options = { playSound: false, autoOpen: false }) => 
    addNotification(message, 'info', options);
  
  // Форматування часу створення сповіщення
  const formatNotificationTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // різниця в секундах
    
    if (diff < 60) {
      return 'щойно';
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes} ${getMinutesString(minutes)} тому`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} ${getHoursString(hours)} тому`;
    } else if (diff < 604800) {
      const days = Math.floor(diff / 86400);
      return `${days} ${getDaysString(days)} тому`;
    } else {
      return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
    }
  };
  
  // Допоміжні функції для склонення числівників
  const getMinutesString = (minutes) => {
    if (minutes % 10 === 1 && minutes % 100 !== 11) return 'хвилину';
    if ([2, 3, 4].includes(minutes % 10) && ![12, 13, 14].includes(minutes % 100)) return 'хвилини';
    return 'хвилин';
  };
  
  const getHoursString = (hours) => {
    if (hours % 10 === 1 && hours % 100 !== 11) return 'годину';
    if ([2, 3, 4].includes(hours % 10) && ![12, 13, 14].includes(hours % 100)) return 'години';
    return 'годин';
  };
  
  const getDaysString = (days) => {
    if (days % 10 === 1 && days % 100 !== 11) return 'день';
    if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) return 'дні';
    return 'днів';
  };
  
  // Отримання кольору для типу сповіщення
  const getNotificationTypeClasses = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };
  
  // Отримання іконки для типу сповіщення
  const getNotificationIcon = (type) => {
    return type; // Для спрощення, в реальному додатку тут буде логіка вибору відповідної іконки
  };
  
  // Завантаження сповіщень при створенні компонента
  onMounted(() => {
    fetchNotifications();
  });
  
  // Оновлення підрахунку непрочитаних при зміні списку сповіщень
  watch(notifications, () => {
    calculateUnreadCount();
  }, { deep: true });
  
  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    formatNotificationTime,
    getNotificationTypeClasses,
    getNotificationIcon,
    // Функції для створення сповіщень
    addNotification,
    addSuccessNotification,
    addErrorNotification,
    addWarningNotification,
    addInfoNotification
  };
}
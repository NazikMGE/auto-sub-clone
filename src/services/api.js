// services/api.js
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

// Створюємо екземпляр axios з базовим URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 5000, // Таймаут 10 секунд
});

// Додаємо інтерсептор для запитів
api.interceptors.request.use(
  (config) => {
    // Додаємо авторизаційний токен до всіх запитів, якщо він є
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Додаємо інтерсептор для відповідей
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Текуча конфігурація запиту для повторного запиту
    const originalRequest = error.config;
    
    // Перехоплюємо помилки авторизації (401)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        try {
          const authStore = useAuthStore();
          authStore.logout();
        } catch (e) {
          // Якщо не вдається отримати доступ до store, просто видаляємо токен
          localStorage.removeItem('token');
          localStorage.removeItem('token_created_at');
        }
        
        // Якщо ми на захищеному маршруті, перенаправляємо на сторінку входу
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/register' && !currentPath.startsWith('/reset-password')) {
          // Зберігаємо сторінку для перенаправлення після авторизації
          window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
        }
      } catch (refreshError) {
        console.error('Token refresh error:', refreshError);
      }
    }
    
    // Інші типи помилок
    if (error.response && error.response.status === 403) {
      console.error('Доступ заборонено:', error);
    }
    
    // Помилки мережі - корисна інформація для користувача
    if (!error.response) {
      const customError = {
        status: 0,
        message: 'Сервер недоступний. Перевірте підключення до Інтернету'
      };
      return Promise.reject(customError);
    }
    
    return Promise.reject(error);
  }
);

// Додаємо функцію для скасування запитів
api.cancelToken = axios.CancelToken;
api.isCancel = axios.isCancel;

export default api;
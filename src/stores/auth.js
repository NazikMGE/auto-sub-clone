import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import authService from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  // Реактивний стан
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const authStatus = ref(!!localStorage.getItem('token')); // Реактивний стан автентифікації

  // Обчислювані властивості
  const isAuthenticated = computed(() => authStatus.value);
  
  const userInitials = computed(() => {
    if (!user.value?.full_name && !user.value?.name) return '';
    
    const nameToUse = user.value?.full_name || user.value?.name;
    return nameToUse
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  });
  // Методи
  async function loadUserProfile() {
  if (!isAuthenticated.value) return null;
  
  try {
    loading.value = true;
    const userData = await authService.getCurrentUser();
    user.value = userData;
    return userData;
  } catch (err) {
    console.error('Error loading user profile:', err);
    error.value = 'Не вдалося завантажити профіль користувача';
    
    // Важливе виправлення: якщо не вдалося завантажити профіль - 
    // вважаємо користувача неавторизованим
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      console.log('Token is invalid or expired, logging out user');
      await logout(); // Це оновить authStatus.value на false
      return null;
    }
    
    // Додаткова перевірка на інші важливі помилки, 
    // які можуть свідчити про недійсність токена
    if (!err.response || err.response.status >= 500) {
      // Якщо сервер недоступний або сталася серйозна помилка,
      // краще не виходити автоматично, а просто повернути null
      console.log('Server error, but keeping user session active');
      return null;
    }
    
    return null;
  } finally {
    loading.value = false;
  }
}

  async function login(credentials) {
    try {
      loading.value = true;
      error.value = null;
      
      const response = await authService.login(credentials);
      
      // Встановлюємо статус авторизації
      authStatus.value = true;
      
      // Завантажуємо профіль користувача
      await loadUserProfile();
      
      return { success: true, data: response };
    } catch (err) {
      console.error('Login error:', err);
      
      if (err.response && err.response.data) {
        error.value = err.response.data.detail || 'Помилка під час входу. Перевірте ваші дані.';
      } else {
        error.value = 'Сервер недоступний. Спробуйте пізніше.';
      }
      
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  }
  
  async function register(userData) {
    try {
      loading.value = true;
      error.value = null;
      
      const response = await authService.register(userData);
      
      // Встановлюємо статус авторизації, якщо реєстрація авторизує користувача
      if (response.access_token) {
        authStatus.value = true;
        await loadUserProfile();
      }
      
      return { success: true, data: response };
    } catch (err) {
    console.error('Registration error:', err);
    
    if (err.response) {
      if (err.response.status === 400 && 
          err.response.data && 
          err.response.data.detail && 
          (err.response.data.detail.includes("Email already registered") || 
           err.response.data.detail.includes("email already registered"))) {
        
        error.value = 'Цей email вже зареєстрований. Спробуйте увійти в систему.';
        return { 
          success: false, 
          error: error.value, 
          code: 'EMAIL_EXISTS',  // Додаємо код помилки для кращої обробки
          details: err.response.data
        };
        
      } else if (err.response.data && err.response.data.detail) {
        error.value = err.response.data.detail;
      } else {
        error.value = 'Помилка під час реєстрації. Перевірте введені дані.';
      }
    } else {
      error.value = 'Сервер недоступний. Спробуйте пізніше.';
    }
    
    return { success: false, error: error.value, details: err.response?.data };
  } finally {
      loading.value = false;
    }
  }
  
  async function logout() {
    // Викликаємо сервіс для виходу
    authService.logout();
    
    // Очищаємо даний сховища
    user.value = null;
    error.value = null;
    
    // Оновлюємо статус авторизації
    authStatus.value = false;
    
    return true;
  }
  
  // Ініціалізація сховища - викликається при запуску додатку
  async function init() {
  // Перевіряємо токен у localStorage
  const token = localStorage.getItem('token');
  
  if (token) {
    authStatus.value = true; // Попередньо встановлюємо як авторизований
    
    try {
      // Намагаємося завантажити профіль
      const profile = await loadUserProfile();
      
      // Якщо не вдалося завантажити профіль (повернувся null),
      // але loadUserProfile не викликав logout(),
      // встановлюємо authStatus відповідно до наявності даних
      if (!profile && user.value === null) {
        authStatus.value = false;
        localStorage.removeItem('token'); // Видаляємо недійсний токен
        console.log('Failed to load profile, clearing auth state');
      }
    } catch (e) {
      // Щось пішло не так під час завантаження профілю
      console.error('Error during auth initialization:', e);
      authStatus.value = false;
      localStorage.removeItem('token');
    }
  } else {
    authStatus.value = false;
  }
}

async function updateUserAvatar(avatarUrl) {
  try {
    // Оновлюємо локальний об'єкт користувача
    if (user.value) {
      user.value = {
        ...user.value,
        avatarUrl: avatarUrl
      };
    }
    
    // Викликаємо подію для оповіщення всіх компонентів
    // Це дозволить компонентам, що відслідковують цю подію, оновитися
    window.dispatchEvent(new CustomEvent('user-avatar-updated', { 
      detail: { avatarUrl } 
    }));
    
    return true;
  } catch (error) {
    console.error('Error updating user avatar:', error);
    return false;
  }
}


  return {
    user,
    loading,
    error,
    authStatus,
    isAuthenticated,
    userInitials,
    login,
    register,
    logout,
    loadUserProfile,
    init,
    updateUserAvatar
  };
});
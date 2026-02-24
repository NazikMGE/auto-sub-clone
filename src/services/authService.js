// services/authService.js
import api from './api';
import axios from 'axios';

const authService = {
  /**
   * Реєстрація нового користувача
   * @param {Object} userData - Дані для реєстрації (email, password)
   * @returns {Promise} - Відповідь серверу з даними користувача і токеном
   */
  register: async (userData) => {
  try {
    // Генеруємо аватар на основі імені користувача (email)
    const emailName = userData.email.split('@')[0];
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(emailName)}&background=random&color=fff&size=128&font-size=0.45`;
    
    // Додаємо згенерований аватар до даних користувача
    const userDataWithAvatar = {
      ...userData,
      avatarUrl: avatarUrl
    };
    
    // Надсилаємо запит на реєстрацію з аватаром
    const response = await api.post('/api/v1/users/register', userDataWithAvatar);
    
    // Якщо API повертає токен одразу при реєстрації, зберігаємо його
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
},

  /**
   * Вхід у систему
   * @param {Object} credentials - Дані для входу (email/username, password)
   * @returns {Promise} - Відповідь серверу з токеном і, можливо, даними користувача
   */
  login: async (credentials) => {
    try {
      // Підготовка даних у форматі x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append('username', credentials.email || credentials.username);
      formData.append('password', credentials.password);
      
      console.log('Sending login data:', formData.toString()); // Для відладки
      
      // Безпосередній запит до API
      const baseURL = api.defaults.baseURL || 'http://localhost:8000';
      const response = await axios.post(
        `${baseURL}/api/v1/users/login`, 
        formData.toString(), 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      console.log('Login successful:', response.data);
      
      // Зберігаємо токен у локальному сховищі
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        console.log('Error response:', error.response.data);
      }
      throw error;
    }
  },

  /**
   * Отримання інформації про поточного користувача
   * @returns {Promise} - Відповідь серверу з даними користувача
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/v1/users/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  /**
   * Вихід з системи
   */
  logout: () => {
    localStorage.removeItem('token');
  },

  /**
   * Перевірка, чи користувач авторизований (чи є токен у localStorage)
   * @returns {Boolean} - true, якщо користувач авторизований
   */
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  }
};

export default authService;
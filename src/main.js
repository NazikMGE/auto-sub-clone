import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { useAuthStore } from './stores/auth';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

const authStore = useAuthStore();

// Асинхронна ініціалізація додатка
const initApp = async () => {
  try {
    // Завантажуємо профіль користувача, якщо є токен
    await authStore.init();
  } catch (error) {
    console.error('Failed to initialize app:', error);
  } finally {
    // Монтуємо додаток після ініціалізації
    app.mount('#app');
  }
};

initApp();
<template>
  <div class="min-h-screen flex flex-col items-center justify-center overflow-hidden relative isolate">
    <div class="absolute inset-0 z-0 bg-gradient-to-br from-blue-700 via-indigo-900 to-purple-900 dark:from-blue-900 dark:via-indigo-950 dark:to-purple-950 overflow-hidden">
      <div class="absolute -top-60 -left-60 w-[40rem] h-[40rem] bg-pink-500/20 rounded-full blur-3xl animate-blob"></div>
      <div class="absolute top-0 -right-24 w-[30rem] h-[30rem] bg-yellow-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-0 left-20 w-[35rem] h-[35rem] bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      
      <div class="absolute inset-0 bg-grid-white/[0.05] bg-[length:50px_50px]"></div>
      
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-sm"></div>
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent blur-sm"></div>
    </div>

    <FallingParticles v-if="showParticles" class="absolute inset-0 z-[5]" />

    <div class="container relative z-10 px-5 py-6 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl mx-auto">
      <div class="hidden lg:block lg:w-1/2 text-left">
        <div class="flex justify-start mb-6">
          <router-link to="/" class="inline-flex items-center transition-transform duration-300 hover:scale-105 focus:outline-none">
            <img :src="logoUrl" alt="AutoSubtitles Logo" class="h-12 w-auto mr-3" />
            <span class="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">
              <span>Auto</span><span class="text-yellow-400">Subtitles</span>
            </span>
          </router-link>
        </div>
        
        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-md">Субтитри <span class="text-yellow-400">просто</span> як ніколи.</h1>
        
        <p class="text-lg text-blue-100 mb-6 max-w-md opacity-90">
          З AutoSubtitles ваш відео та аудіо контент стане доступним для всіх. Швидко, точно та сучасно.
        </p>
        
        <div class="space-y-3 mb-5 max-w-md">
          <div class="flex items-center text-white gap-2">
            <SparklesIcon class="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <span>Швидке розпізнавання мови з високою точністю</span>
          </div>
          <div class="flex items-center text-white gap-2">
            <LanguageIcon class="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <span>Підтримка більше 50 мов</span>
          </div>
          <div class="flex items-center text-white gap-2">
            <FilmIcon class="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <span>Сумісність з популярними відеоформатами</span>
          </div>
        </div>
      </div>
      
      <div class="w-full max-w-md lg:w-1/2">
        <div class="modern-card p-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:shadow-yellow-400/10">
          <div class="flex justify-center mb-6 lg:hidden">
            <router-link to="/" class="inline-flex items-center transition-transform duration-300 hover:scale-105 focus:outline-none">
              <img :src="logoUrl" alt="AutoSubtitles Logo" class="h-10 w-auto mr-2" />
              <span class="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">
                <span>Auto</span><span class="text-yellow-400">Subtitles</span>
              </span>
            </router-link>
          </div>
          
          <!-- Повідомлення про сесію -->
          <div 
            v-if="sessionExpiredMsg" 
            class="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl animate-fade-in flex items-center"
          >
            <ExclamationTriangleIcon class="h-5 w-5 mr-2 text-amber-400" aria-hidden="true" />
            <span class="text-sm text-amber-100">{{ sessionExpiredMsg }}</span>
          </div>
          
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-white">
              З поверненням!
            </h2>
            <p class="text-blue-100 text-sm mt-1">
              Раді бачити вас знову! Введіть ваші дані для входу.
            </p>
          </div>
          
          <form class="space-y-5" @submit.prevent="handleLogin">
            <div>
              <label for="email-address" class="block text-sm font-medium text-blue-100 mb-2">
                Email адреса
              </label>
              <div class="relative">
                <input 
                  id="email-address" 
                  name="email" 
                  type="email" 
                  autocomplete="email" 
                  required 
                  v-model="email"
                  class="input-with-icon pl-10 pr-4 py-3 w-full rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-blue-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                  :class="{'border-red-500 focus:border-red-500 focus:ring-red-500/50': errorMsg}"
                  placeholder="ви@приклад.com"
                >
                <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                  <AtSymbolIcon class="h-5 w-5 text-white/70" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-2">
                <label for="password" class="block text-sm font-medium text-blue-100">
                  Пароль
                </label>
                <a href="#" class="text-sm font-medium text-blue-300 hover:text-yellow-400 transition-colors duration-200">
                  Забули пароль?
                </a>
              </div>
              <div class="relative">
                <input 
                  id="password" 
                  name="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  autocomplete="current-password" 
                  required 
                  v-model="password"
                  class="input-with-icon pl-10 pr-10 py-3 w-full rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-blue-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                  :class="{'border-red-500 focus:border-red-500 focus:ring-red-500/50': errorMsg}"
                  placeholder="••••••••"
                >
                <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
                  <LockClosedIcon class="h-5 w-5 text-white/70" aria-hidden="true" />
                </div>
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-yellow-400 focus:outline-none transition-colors duration-200 z-10"
                >
                  <EyeIcon v-if="showPassword" class="h-5 w-5" aria-hidden="true" />
                  <EyeSlashIcon v-else class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div class="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox"
                v-model="rememberMe"
                class="h-4 w-4 rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-400 focus:ring-offset-0 transition-colors"
              >
              <label for="remember-me" class="ml-2 block text-sm text-blue-100">
                Запам'ятати мене
              </label>
            </div>

            <div 
              v-if="errorMsg" 
              class="flex items-center p-3 bg-red-500/10 border border-red-500/30 rounded-xl animate-fade-in"
            >
              <ExclamationCircleIcon class="h-5 w-5 mr-2 text-red-400" aria-hidden="true" />
              <span class="text-sm text-red-100">{{ errorMsg }}</span>
            </div>

            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 shadow-lg shadow-blue-700/20 hover:shadow-blue-700/30 flex items-center justify-center group relative overflow-hidden"
            >
              <span class="absolute right-full w-12 h-32 -mt-8 bg-white/20 -rotate-12 transform group-hover:translate-x-[650%] ease-out transition-transform duration-1000"></span>
              
              <ArrowRightOnRectangleIcon 
                v-if="!isLoading" 
                class="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" 
                aria-hidden="true" 
              />
              <svg v-if="isLoading" class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'Вхід...' : 'Увійти' }}</span>
            </button>
          </form>

          <div class="relative flex items-center justify-center my-6">
            <div class="w-full border-t border-white/10"></div>
            <div class="px-3 text-xs text-blue-200 bg-transparent whitespace-nowrap">або</div>
            <div class="w-full border-t border-white/10"></div>
          </div>

          <div class="text-center">
            <p class="text-sm text-blue-100">
              Ще немає акаунту?
              <router-link to="/register" class="font-medium text-blue-300 hover:text-yellow-400 transition-colors duration-200 ml-1 animated-link">
                Створити зараз
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import logoUrl from '@/assets/logo.svg';
import FallingParticles from '@/components/ui/FallingParticles.vue';

// Імпорт іконок з Heroicons
import { 
  AtSymbolIcon, 
  LockClosedIcon, 
  ArrowRightOnRectangleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
  LanguageIcon,
  FilmIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Контроль анімації частинок для продуктивності
const showParticles = ref(true);

// Форма входу
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const isLoading = ref(false);
const errorMsg = ref('');
const showPassword = ref(false);
const sessionExpiredMsg = ref('');

// Встановлюємо повідомлення про закінчення сесії
onMounted(() => {
  // Перевірка повідомлень URL-параметрах
  if (route.query.message === 'session_expired') {
    sessionExpiredMsg.value = 'Ваша сесія закінчилася через неактивність. Будь ласка, увійдіть знову.';
  }
  
  // Перевірка, чи був користувач перенаправлений через потребу авторизації
  if (route.query.redirect && !authStore.isAuthenticated) {
    sessionExpiredMsg.value = 'Для доступу до цієї сторінки необхідно увійти в систему.';
  }
  
  // Перевіряємо, чи потрібно запам'ятати користувача
  checkRememberedUser();
});

// Функція для обробки входу - ПОКРАЩЕНА
const handleLogin = async () => {
  isLoading.value = true;
  errorMsg.value = '';
  sessionExpiredMsg.value = '';
  
  try {
    // Валідація форми перед відправкою
    if (!validateForm()) {
      isLoading.value = false;
      return;
    }
    
    // Дані для входу у правильному форматі
    const credentials = {
      username: email.value.trim(), // Email використовується як username для API
      password: password.value
    };
    
    // Запам'ятовуємо користувача, якщо потрібно
    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('savedEmail', email.value);
    } else {
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('savedEmail');
    }
    
    // Використовуємо метод login зі сховища auth
    const result = await authStore.login(credentials);
    
    if (result.success) {
      console.log('Login successful:', result.data);
      
      // Встановлюємо час створення токена
      localStorage.setItem('token_created_at', Date.now().toString());
      
      // Перенаправлення на потрібну сторінку після успішного входу
      const redirectPath = route.query.redirect || '/dashboard';
      router.push(redirectPath);
    } else {
      // Використовуємо структуроване повідомлення про помилку
      errorMsg.value = result.error || 'Помилка під час входу';
      console.error('Login error details:', result.details);
    }
  } catch (error) {
    console.error('Login error:', error);
    handleLoginError(error);
  } finally {
    isLoading.value = false;
  }
};

// Функція для валідації форми
const validateForm = () => {
  // Валідація email
  if (!email.value.trim()) {
    errorMsg.value = 'Будь ласка, введіть email';
    return false;
  }
  
  // Перевіряємо формат email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    errorMsg.value = 'Будь ласка, введіть коректний email';
    return false;
  }
  
  // Валідація пароля
  if (!password.value) {
    errorMsg.value = 'Будь ласка, введіть пароль';
    return false;
  }
  
  return true;
};

// Функція для обробки помилок входу
const handleLoginError = (error) => {
  // Обробка помилок
  if (error.status) {
    // Використовуємо структуровану помилку
    errorMsg.value = error.message;
  } else if (error.response) {
    // Помилки від сервера
    if (error.response.status === 401) {
      errorMsg.value = 'Неправильний email або пароль. Спробуйте ще раз.';
    } else if (error.response.status === 429) {
      errorMsg.value = 'Забагато спроб входу. Спробуйте пізніше.';
    } else if (error.response.data && typeof error.response.data === 'object') {
      // Обробка структурованих помилок від FastAPI
      if (Array.isArray(error.response.data.detail)) {
        // Якщо відповідь - масив помилок валідації
        errorMsg.value = 'Помилка валідації даних. Перевірте введені дані.';
        console.error('Validation errors:', error.response.data.detail);
      } else if (error.response.data.detail) {
        errorMsg.value = error.response.data.detail;
      } else {
        errorMsg.value = 'Помилка під час входу. Перевірте ваші дані.';
      }
    } else {
      errorMsg.value = 'Помилка під час входу. Спробуйте ще раз.';
    }
  } else if (error.request) {
    // Запит був надісланий, але відповіді не було
    errorMsg.value = 'Сервер не відповідає. Перевірте підключення до Інтернету.';
  } else {
    // Інші помилки
    errorMsg.value = 'Несподівана помилка. Спробуйте пізніше.';
  }
};

// Підготовка сторінки
const checkRememberedUser = () => {
  if (localStorage.getItem('rememberMe') === 'true') {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      email.value = savedEmail;
      rememberMe.value = true;
    }
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes blob {
  0% { transform: scale(1) translate(0px, 0px); }
  33% { transform: scale(1.1) translate(30px, -50px); }
  66% { transform: scale(0.9) translate(-20px, 20px); }
  100% { transform: scale(1) translate(0px, 0px); }
}

.animate-blob {
  animation: blob 7s infinite;
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
.bg-grid-white {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255,255,255)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}
.modern-card {
  background: rgba(30, 58, 138, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.input-with-icon {
  background-color: rgba(30, 41, 59, 0.5);
}
.input-with-icon:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1);
}
.animated-link {
  position: relative;
}
.animated-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -1px;
  left: 0;
  background-color: #FACC15;
  transition: width 0.3s ease-in-out;
}
.animated-link:hover::after {
  width: 100%;
}
@media (max-width: 640px) {
  .modern-card {
    padding: 1.5rem;
    border-radius: 1rem;
  }
}
</style>
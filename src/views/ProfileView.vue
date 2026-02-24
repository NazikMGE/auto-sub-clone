<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 transition-all duration-300">
    <!-- Декоративний фоновий елемент -->
    <div class="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent dark:from-blue-500/20 dark:to-transparent pointer-events-none"></div>
    
    <div class="absolute top-20 right-10 w-32 h-32 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
    <div class="absolute bottom-20 left-10 w-40 h-40 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
    
    <div class="main-container py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Заголовок сторінки з анімацією -->
      <div class="mb-8 animate-fade-in">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
          <span class="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">Мій профіль</span>
          <span class="ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 transform transition-transform hover:scale-105">
            Особистий кабінет
          </span>
        </h1>
        <p class="text-slate-600 dark:text-slate-400">
          Перегляд та редагування особистої інформації
        </p>
      </div>

      <!-- Основний контент з покращеною сіткою -->
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Лівий сайдбар з фото та статистикою -->
        <div class="md:col-span-1 space-y-6">
          <!-- Секція з аватаркою (покращена з анімаціями) -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style="animation-delay: 0.1s">
            <div class="p-6 flex flex-col items-center">
              <div class="relative group mb-5">
                <div class="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900/30 overflow-hidden ring-4 ring-white dark:ring-slate-700 shadow-md transition-all duration-300 group-hover:ring-blue-200 dark:group-hover:ring-blue-800">
                  <img 
                    :src="userAvatarUrl" 
                    alt="User avatar" 
                    class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <button 
                  @click="handleAvatarUpload"
                  class="absolute inset-0 w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600/90 to-indigo-600/90 dark:from-blue-500/90 dark:to-indigo-500/90 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 cursor-pointer"
                >
                  <div class="text-white transition-all transform group-hover:scale-110">
                    <CameraIcon class="w-6 h-6 mb-1 mx-auto" />
                    <span class="text-xs">Змінити фото</span>
                  </div>
                </button>
                <input 
                  ref="avatarInputRef"
                  type="file" 
                  class="hidden" 
                  accept="image/*" 
                  @change="onAvatarSelected"
                />
              </div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-1">{{ userName }}</h2>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-2 flex items-center">
                <EnvelopeIcon class="w-4 h-4 mr-1 text-blue-500 dark:text-blue-400" />
                {{ userEmail }}
              </p>
              
              <div class="mt-3 w-full text-center border-t border-slate-100 dark:border-slate-700 pt-3">
                <span class="text-sm flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                  <CalendarIcon class="w-4 h-4 mr-1 text-blue-500 dark:text-blue-400" />
                  З нами з {{ formatDate(userRegistrationDate) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Статистика користувача (покращена з анімаціями) -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style="animation-delay: 0.2s">
            <div class="p-6">
              <h3 class="text-sm font-medium uppercase tracking-wider mb-5 flex items-center text-slate-700 dark:text-slate-300">
                <ChartBarIcon class="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
                Ваша статистика
              </h3>
              <div class="space-y-4">
                <div class="group flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-sm">
                  <span class="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                    <DocumentTextIcon class="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110" />
                    Проектів створено
                  </span>
                  <span class="text-lg font-semibold text-slate-900 dark:text-white">{{ userStats.projects }}</span>
                </div>
                <div class="group flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:shadow-sm">
                  <span class="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                    <CheckCircleIcon class="w-4 h-4 mr-2 text-green-500 dark:text-green-400 group-hover:text-green-600 dark:group-hover:text-green-300 transition-all duration-300 group-hover:scale-110" />
                    Завершено проектів
                  </span>
                  <span class="text-lg font-semibold text-slate-900 dark:text-white">{{ userStats.completedProjects }}</span>
                </div>
                <div class="group flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:shadow-sm">
                  <span class="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                    <ClockIcon class="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-all duration-300 group-hover:scale-110" />
                    Загальний час
                  </span>
                  <span class="text-lg font-semibold text-slate-900 dark:text-white">{{ userStats.totalProcessingTime }}</span>
                </div>
                <div class="group flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-sm">
                  <span class="text-sm text-slate-700 dark:text-slate-300 flex items-center">
                    <UserIcon class="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110" />
                    Останній вхід
                  </span>
                  <span class="text-sm font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 py-1 px-2 rounded transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40">{{ userStats.lastLogin }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Основний контент - форми редагування профілю -->
        <div class="md:col-span-3 space-y-6">
          <!-- Форма особистої інформації (покращена з анімаціями) -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg animate-fade-in" style="animation-delay: 0.3s">
            <div class="p-8">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <UserCircleIcon class="w-6 h-6 mr-2 text-blue-500 dark:text-blue-400" />
                Особиста інформація
              </h3>
              
              <form @submit.prevent="savePersonalInfo" class="space-y-6">
                <!-- Повне ім'я -->
                <div class="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6">
                  <div class="sm:col-span-3">
                    <label for="first_name" class="block text-base font-medium text-slate-700 dark:text-slate-300 mb-2">Ім'я</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon class="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>
                      <input 
                        type="text" 
                        id="first_name" 
                        v-model="personalInfo.firstName"
                        autocomplete="given-name"
                        placeholder="Ваше ім'я"
                        class="pl-10 block w-full rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-base py-3 transition-colors border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div class="sm:col-span-3">
                    <label for="last_name" class="block text-base font-medium text-slate-700 dark:text-slate-300 mb-2">Прізвище</label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserGroupIcon class="h-5 w-5 text-slate-400 dark:text-slate-500" />
                      </div>
                      <input 
                        type="text" 
                        id="last_name" 
                        v-model="personalInfo.lastName"
                        autocomplete="family-name"
                        placeholder="Ваше прізвище"
                        class="pl-10 block w-full rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-base py-3 transition-colors border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                <!-- Email адреса -->
                <div>
                  <label for="email" class="block text-base font-medium text-slate-700 dark:text-slate-300 mb-2">Email адреса</label>
                  <div class="relative rounded-lg">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon class="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="personalInfo.email"
                      autocomplete="email" 
                      disabled
                      class="pl-10 block w-full rounded-lg bg-slate-100 dark:bg-slate-700/30 text-slate-500 dark:text-slate-400 shadow-sm text-base py-3 cursor-not-allowed border-transparent outline-none"
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                      <LockClosedIcon class="h-4 w-4 text-slate-400" aria-hidden="true" />
                    </div>
                  </div>
                  <p class="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center">
                    <InformationCircleIcon class="w-4 h-4 mr-1 text-blue-500 dark:text-blue-400" />
                    Ваш email не може бути змінений
                  </p>
                </div>

                <!-- Кнопки дій -->
                <div class="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <!-- Покращена кнопка скасування -->
                  <button 
                    type="button" 
                    @click="resetPersonalInfo"
                    class="flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 dark:focus:ring-slate-700 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <ArrowPathIcon class="w-4 h-4 mr-2 text-slate-500 dark:text-slate-400" />
                    Скасувати
                  </button>
                  
                  <!-- Покращена кнопка збереження -->
                  <button 
                    type="submit" 
                    :disabled="personalInfoLoading"
                    class="group flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-0 bg-blue-600 text-white shadow-md transition-all duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <svg v-if="personalInfoLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <CheckIcon v-else class="w-4 h-4 mr-2 text-white transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                    Зберегти зміни
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Додаткова інформація про акаунт (покращена з анімаціями) -->
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg animate-fade-in" style="animation-delay: 0.4s">
            <div class="p-8">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <ShieldCheckIcon class="w-6 h-6 mr-2 text-blue-500 dark:text-blue-400" />
                Інформація про акаунт
              </h3>
              
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Покращений блок статусу акаунту -->
                  <div class="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5 transition-all duration-300 hover:shadow-md hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transform hover:-translate-y-1">
                    <div class="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">Статус акаунту</div>
                    <div class="flex items-center">
                      <div class="w-3 h-3 bg-green-500 rounded-full mr-2 shadow animate-pulse"></div>
                      <span class="text-lg font-semibold text-slate-900 dark:text-white">Активний</span>
                    </div>
                  </div>
                  
                  <!-- Покращений блок дати створення -->
                  <div class="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5 transition-all duration-300 hover:shadow-md hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transform hover:-translate-y-1">
                    <div class="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">Дата створення</div>
                    <div class="flex items-center">
                      <CalendarIcon class="w-5 h-5 text-blue-500 dark:text-blue-400 mr-2" />
                      <span class="text-lg font-semibold text-slate-900 dark:text-white">{{ formatDate(userRegistrationDate) }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- Кнопка налаштувань - покращена -->
                <div class="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <router-link 
                    to="/settings" 
                    class="group inline-flex items-center justify-center px-5 py-3 border-0 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md transition-all duration-300 hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <CogIcon class="mr-2 h-5 w-5 transform transition-transform group-hover:rotate-45" aria-hidden="true" />
                    Налаштування акаунту
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotifications } from '@/composables/useNotifications';
import api from '@/services/api';
import {
  CameraIcon,
  LockClosedIcon,
  CogIcon,
  UserIcon,
  UserCircleIcon,
  UserGroupIcon,
  EnvelopeIcon,
  CalendarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  CheckIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();
const avatarInputRef = ref(null);
const avatarLoading = ref(false);

// Використовуємо useNotifications для сповіщень
const { 
  addSuccessNotification, 
  addErrorNotification, 
  addWarningNotification,
  addInfoNotification
} = useNotifications();

// Дані користувача з authStore
const userEmail = computed(() => {
  return authStore.user?.email || '';
});

const userRegistrationDate = computed(() => {
  return authStore.user?.createdAt || new Date();
});

const userName = computed(() => {
  if (authStore.user?.full_name) return authStore.user.full_name;
  if (authStore.user?.name) return authStore.user.name;
  
  // Якщо у нас є firstName і lastName з форми, використовуємо їх
  if (personalInfo.value.firstName || personalInfo.value.lastName) {
    return `${personalInfo.value.firstName} ${personalInfo.value.lastName}`.trim();
  }
  
  // Інакше показуємо ім'я користувача з email
  return userEmail.value.split('@')[0];
});

const userAvatarUrl = computed(() => {
  // Якщо користувач має аватар
  if (authStore.user?.avatarUrl) {
    // Перевіряємо, чи avatarUrl є згенерованим через UI Avatars API
    if (authStore.user.avatarUrl.includes('ui-avatars.com')) {
      // Використовуємо URL без змін, оскільки він вже є повним
      return authStore.user.avatarUrl;
    }
    
    // Отримуємо базовий URL з змінних середовища
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    
    // Шлях аватара з бекенда (наприклад, "/avatars/filename.svg")
    const avatarPath = authStore.user.avatarUrl;
    
    // Додаємо параметр часу для запобігання кешуванню
    const timestamp = Date.now();
    
    // Будуємо повний URL
    // Видаляємо слеш в кінці baseUrl, якщо він є
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    
    // Визначаємо, чи URL вже містить параметри запиту
    const separator = avatarPath.includes('?') ? '&' : '?';
    
    // Повертаємо повний URL
    return `${normalizedBaseUrl}${avatarPath}${separator}t=${timestamp}`;
  }
  
  // Якщо аватар не вказано, використовуємо заглушку
  const displayName = userName.value || (authStore.user?.email ? authStore.user.email.split('@')[0] : 'User');
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random&color=fff&size=128&font-size=0.45`;
});

// Оновлена функція обробки вибору аватарки
const onAvatarSelected = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // Перевірка типу файлу
  if (!file.type.startsWith('image/')) {
    addErrorNotification('Дозволені лише файли зображень', { 
      playSound: true, 
      autoOpen: false 
    });
    return;
  }
  
  // Перевірка розміру файлу (макс. 2МБ)
  const maxSize = 2 * 1024 * 1024; // 2МБ в байтах
  if (file.size > maxSize) {
    addErrorNotification('Розмір файлу не повинен перевищувати 2МБ', { 
      playSound: true, 
      autoOpen: false 
    });
    return;
  }
  
  // Перевірка, чи файл не завеликий (попередження)
  if (file.size > 1 * 1024 * 1024) { // Більше 1МБ
    addWarningNotification('Файл досить великий. Це може вплинути на швидкість завантаження.', { 
      playSound: true, 
      autoOpen: false 
    });
  }
  
  // Показуємо індикатор завантаження
  avatarLoading.value = true;
  
  try {
    // Створення FormData для завантаження файлу
    const formData = new FormData();
    formData.append('file', file);
    
    // Відправка файлу на сервер
    const response = await api.post('/api/v1/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Якщо запит успішний, оновлюємо користувача в authStore
    if (response.data && response.data.avatarUrl) {
      // Оновлюємо аватар у сховищі authStore
      if (authStore.user) {
        authStore.user = {
          ...authStore.user,
          avatarUrl: response.data.avatarUrl
        };
      }
      
      // Викликаємо подію для оповіщення інших компонентів
      if (typeof authStore.updateUserAvatar === 'function') {
        await authStore.updateUserAvatar(response.data.avatarUrl);
      } else {
        // Якщо функція не існує, створюємо та поширюємо подію вручну
        window.dispatchEvent(new CustomEvent('user-avatar-updated', { 
          detail: { avatarUrl: response.data.avatarUrl } 
        }));
      }
      
      // Створюємо сповіщення про успішне оновлення аватара
      addSuccessNotification('Аватар успішно оновлено', { 
        playSound: true,  // Відтворювати звук
        autoOpen: false    // Автоматично відкривати меню сповіщень
      });
    }
  } catch (error) {
    console.error('Помилка при завантаженні аватара:', error);
    
    // Створюємо сповіщення про помилку
    addErrorNotification('Не вдалося завантажити аватар', { 
      playSound: true,  // Відтворювати звук
      autoOpen: false    // Автоматично відкривати меню сповіщень
    });
    
    // Відображаємо детальну інформацію про помилку в консолі
    if (error.response) {
      console.error('Відповідь сервера:', error.response.data);
    }
  } finally {
    // Знімаємо індикатор завантаження
    avatarLoading.value = false;
    
    // Скидаємо вибір файлу, щоб можна було повторно вибрати той самий файл
    if (avatarInputRef.value) {
      avatarInputRef.value.value = '';
    }
  }
};

const userStats = ref({
  projects: 0,
  completedProjects: 0,
  totalProcessingTime: '0 хв',
  lastLogin: 'Зараз'
});

// Функція для завантаження статистики користувача з API
const loadUserStats = async () => {
  try {
    // Отримуємо статистику користувача з API
    const response = await api.get('/api/v1/users/me/stats');
    const stats = response.data;
    
    // Логування для налагодження
    console.log('Отримані дані статистики:', stats);
    console.log('Час останнього входу з API:', stats.lastLogin);
    
    // Оновлюємо дані у userStats
    userStats.value = {
      projects: stats.projects || 0,
      completedProjects: stats.completedProjects || 0,
      // Форматуємо час обробки
      totalProcessingTime: formatProcessingTime(stats.totalProcessingSeconds || 0),
      // Форматуємо час останнього входу
      lastLogin: stats.lastLogin ? formatTimeAgo(new Date(stats.lastLogin)) : 'Зараз'
    };
  } catch (error) {
    console.error('Помилка при завантаженні статистики:', error);
    addErrorNotification('Не вдалося завантажити статистику користувача', {
      playSound: true,
      autoOpen: false
    });
  }
};

// Функція для форматування часу обробки
const formatProcessingTime = (totalSeconds) => {
  if (!totalSeconds || totalSeconds === 0) return '0 хв';
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours} год ${minutes} хв`;
  } else {
    return `${minutes} хв`;
  }
};

// Функція для форматування часу "тому"
const formatTimeAgo = (date) => {
  // Логування для налагодження
  console.log('Час останнього входу (об\'єкт Date):', date);
  console.log('Поточний час:', new Date());
  
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  
  console.log('Різниця у хвилинах:', diffMin);
  
  if (diffMin < 1) return 'Щойно';
  if (diffMin < 60) return `${diffMin} хв тому`;
  
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} год тому`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} дн тому`;
  
  // Форматуємо локальну дату
  return date.toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Стан форми особистої інформації
const personalInfo = ref({
  firstName: '',
  lastName: '',
  email: userEmail.value
});

const originalPersonalInfo = ref({...personalInfo.value});
const personalInfoLoading = ref(false);

// Завантаження даних при створенні компонента
onMounted(async () => {
  try {
    // Якщо можливо, отримуємо актуальні дані користувача
    if (authStore.user) {
      // Заповнюємо форму даними користувача
      personalInfo.value = {
        firstName: authStore.user.first_name || '',
        lastName: authStore.user.last_name || '',
        email: authStore.user.email || ''
      };
      
      // Зберігаємо копію для можливості скасування змін
      originalPersonalInfo.value = {...personalInfo.value};
    }
    
    // Завантажуємо статистику користувача
    await loadUserStats();
    
  } catch (error) {
    console.error('Помилка при завантаженні даних профілю:', error);
    addErrorNotification('Не вдалося завантажити дані профілю', {
      playSound: true,
      autoOpen: false
    });
  }
});

// Методи для роботи з аватаром
const handleAvatarUpload = () => {
  console.log("Clicking avatar upload button");
  // Переконайтеся, що avatarInputRef існує
  if (avatarInputRef.value) {
    avatarInputRef.value.click();
  } else {
    console.error("Avatar input reference is null");
  }
};

// Оновлена функція збереження особистої інформації через API
const savePersonalInfo = async () => {
  personalInfoLoading.value = true;
  
  try {
    // Створення даних для оновлення
    const updateData = {
      first_name: personalInfo.value.firstName,
      last_name: personalInfo.value.lastName
    };
    
    // Відправка запиту до API - використовуємо реальний API ендпоінт
    const response = await api.put('/api/v1/users/me', updateData);
    
    // Перевіряємо успішність оновлення
    if (response && response.data) {
      console.log('User data updated successfully:', response.data);
      
      // Оновлюємо дані користувача в authStore
      if (authStore.user) {
        authStore.user = {
          ...authStore.user,
          first_name: response.data.first_name || updateData.first_name,
          last_name: response.data.last_name || updateData.last_name
        };
      }
      
      // Оновлюємо копію для можливості скасування змін
      originalPersonalInfo.value = {...personalInfo.value};
      
      // Створюємо сповіщення про успішне оновлення
      addSuccessNotification('Особиста інформація успішно оновлена!', {
        playSound: true,
        autoOpen: false
      });
    } else {
      throw new Error('Відповідь API не містить даних');
    }
  } catch (error) {
    console.error('Помилка при збереженні особистої інформації:', error);
    
    // Виводимо детальну інформацію про помилку
    if (error.response) {
      console.error('Відповідь сервера при помилці:', error.response.data);
      // Встановлюємо більш точне повідомлення про помилку
      const errorMessage = error.response.data?.detail || 'Не вдалося оновити особисту інформацію';
      addErrorNotification(errorMessage, {
        playSound: true,
        autoOpen: false
      });
    } else if (error.request) {
      // Запит був зроблений, але відповідь не отримана
      addErrorNotification('Сервер не відповідає. Перевірте підключення до мережі.', {
        playSound: true,
        autoOpen: false
      });
    } else {
      // Щось інше пішло не так
      addErrorNotification('Не вдалося оновити особисту інформацію: ' + error.message, {
        playSound: true,
        autoOpen: false
      });
    }
  } finally {
    personalInfoLoading.value = false;
  }
};

// Покращена функція скасування змін
const resetPersonalInfo = () => {
  // Відновлюємо початкові значення
  personalInfo.value = {...originalPersonalInfo.value};
  
  // Показуємо користувачу сповіщення про скасування змін
  addInfoNotification('Зміни скасовано, дані відновлено', {
    playSound: false,
    autoOpen: false
  });
};

// Форматування дати
const formatDate = (date) => {
  if (!date) return '';
  
  // Переконуємося, що обробляємо дату правильно
  const dateObj = new Date(date);
  
  // Для відладки
  console.log('Форматування дати реєстрації:', date);
  console.log('Об\'єкт Date для реєстрації:', dateObj);
  
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return dateObj.toLocaleDateString('uk-UA', options);
};
</script>

<style scoped>
/* Пульсуючі анімації для фонових елементів */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

@keyframes pulse-slower {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
}

.animate-pulse-slow {
  animation: pulse-slow 6s ease-in-out infinite;
}

.animate-pulse-slower {
  animation: pulse-slower 10s ease-in-out infinite;
}

/* Покращений стиль для елементів форми - БЕЗ ЕФЕКТУ ПІДНЕСЕННЯ */
input, select, textarea {
  transition: all 0.3s ease;
}

</style>
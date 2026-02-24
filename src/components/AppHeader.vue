<template>
  <header class="bg-white/90 dark:bg-slate-900/95 backdrop-blur-lg shadow-sm fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
    <nav class="main-container flex items-center justify-between h-16 md:h-20">
      <!-- Логотип перенаправляє на різні сторінки в залежності від автентифікації -->
      <router-link :to="logoTargetLink" class="flex-shrink-0 flex items-center space-x-2 group">
        <img :src="logoUrl" alt="AutoSubtitles Logo" class="h-7 md:h-8 w-auto transform group-hover:scale-105 transition-transform duration-200">
        <span class="text-xl font-extrabold tracking-tight">
          <span class="text-slate-800 dark:text-white">Auto</span><span class="text-blue-600 dark:text-indigo-400">Subtitles</span>
        </span>
      </router-link>

      <!-- Навігація залежить від стану автентифікації -->
      <div class="hidden md:flex items-center space-x-1">
        <router-link
          v-for="item in currentNavigation"
          :key="item.name"
          :to="item.href"
          class="px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-200"
          active-class="!text-blue-600 dark:!text-indigo-400 bg-slate-100 dark:bg-slate-800"
        >
          <component v-if="item.icon" :is="item.icon" class="h-4 w-4 inline mr-1.5 -mt-0.5" />
          {{ item.name }}
        </router-link>
        
        <!-- Додатковий пункт для авторизованих користувачів перегляду публічної сторінки -->
        <router-link 
          v-if="isLoggedIn" 
          to="/" 
          class="px-3 py-2 rounded-md text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-200"
          exact-active-class="!text-blue-600 dark:!text-indigo-400 bg-slate-100 dark:bg-slate-800"
        >
          <InformationCircleIcon class="h-4 w-4 inline mr-1.5 -mt-0.5" />
          Про сервіс
        </router-link>
      </div>

      <div class="flex items-center space-x-3 md:space-x-4">
        <template v-if="!isLoggedIn">
          <div class="hidden sm:flex items-center space-x-2">
            <router-link to="/login" class="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors duration-150">
              Вхід
            </router-link>
            <router-link to="/register" class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-900 shadow-sm hover:shadow-md transition-all duration-200">
              Реєстрація
            </router-link>
          </div>
        </template>

        <template v-if="isLoggedIn">
          <button type="button" @click="createNewProject" title="Створити новий проект" class="hidden sm:inline-flex items-center p-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all duration-200">
            <PlusIcon class="h-5 w-5" />
             <span class="ml-1.5 hidden lg:inline text-sm font-medium">Створити</span>
          </button>

          <!-- Оновлена кнопка сповіщень з меню -->
          <div class="relative">
            <button 
              id="notification-button"
              type="button" 
              @click="notificationMenuOpen = !notificationMenuOpen" 
              title="Сповіщення" 
              class="relative p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-colors"
            >
              <span class="sr-only">Переглянути сповіщення</span>
              <BellIcon class="h-6 w-6" />
              <!-- Індикатор кількості непрочитаних сповіщень -->
              <span 
                v-if="unreadCount > 0" 
                class="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full notification-badge"
                :class="{'new-notification': unreadCount > 0}"
              >
                {{ unreadCount > 9 ? '9+' : unreadCount }}
              </span>
            </button>
            
            <!-- Випадаюче меню сповіщень -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div 
                v-if="notificationMenuOpen" 
                id="notification-menu"
                class="origin-top-right absolute right-0 mt-2 w-80 rounded-xl shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 dark:ring-slate-700 focus:outline-none z-20"
                role="menu" 
                aria-orientation="vertical" 
                tabindex="-1"
              >
                <!-- Заголовок списку сповіщень -->
                <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Сповіщення</h3>
                  <button 
                    v-if="unreadCount > 0"
                    @click="markAllAsRead()"
                    class="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Позначити всі як прочитані
                  </button>
                </div>
                
                <!-- Список сповіщень -->
                <div class="max-h-80 overflow-y-auto notifications-list">
                  <!-- Завантаження -->
                  <div v-if="notificationsLoading" class="py-20 flex justify-center">
                    <svg class="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  
                  <!-- Порожній стан -->
                  <div v-else-if="notifications.length === 0" class="py-10 text-center">
                    <svg class="mx-auto h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                    <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Немає сповіщень</p>
                  </div>
                  
                  <!-- Список сповіщень -->
                  <div v-else>
                    <div v-for="notification in notifications" :key="notification.id" class="relative">
                      <button 
                        @click="markAsRead(notification.id); notificationMenuOpen = false"
                        class="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                        :class="{'bg-blue-50 dark:bg-slate-700/20': !notification.read}"
                      >
                        <div class="flex items-start">
                          <!-- Індикатор непрочитаного сповіщення -->
                          <div v-if="!notification.read" class="h-2 w-2 mt-1.5 mr-2 rounded-full bg-blue-500 dark:bg-indigo-500"></div>
                          
                          <!-- Тип сповіщення -->
                          <div :class="['w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center', getNotificationTypeClasses(notification.type)]">
                            <CheckCircleIcon v-if="notification.type === 'success'" class="h-4 w-4" />
                            <ExclamationCircleIcon v-else-if="notification.type === 'error'" class="h-4 w-4" />
                            <ExclamationTriangleIcon v-else-if="notification.type === 'warning'" class="h-4 w-4" />
                            <InformationCircleIcon v-else class="h-4 w-4" />
                          </div>
                          
                          <!-- Зміст сповіщення -->
                          <div class="ml-3 flex-1">
                            <p class="text-sm text-slate-700 dark:text-slate-200">{{ notification.message }}</p>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ formatNotificationTime(notification.createdAt) }}</p>
                          </div>
                        </div>
                      </button>
                      
                      <!-- Кнопка видалення сповіщення -->
                      <button 
                        @click.stop="removeNotification(notification.id)"
                        class="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700/20"
                      >
                        <XMarkIcon class="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Оновлений футер без переходу на /notifications -->
                <div class="border-t border-slate-200 dark:border-slate-700 px-4 py-2 text-center">
                  <button 
                    @click="markAllAsRead(); notificationMenuOpen = false"
                    v-if="notifications.length > 0"
                    class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Позначити всі як прочитані
                  </button>
                  <p 
                    v-else
                    class="text-sm text-slate-500 dark:text-slate-400"
                  >
                    Немає нових сповіщень
                  </p>
                </div>
              </div>
            </transition>
          </div>

          <div class="relative">
            <button @click="userMenuOpen = !userMenuOpen" type="button" class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <img class="h-9 w-9 rounded-full object-cover border-2 border-transparent hover:border-indigo-400 transition-colors" :src="userAvatarUrl" alt="User avatar">
            </button>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div v-if="userMenuOpen" class="origin-top-right absolute right-0 mt-2 w-60 rounded-xl shadow-lg py-1 bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 dark:ring-slate-700 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                  <p class="text-sm font-semibold text-slate-900 dark:text-white truncate">{{ userName }}</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ userEmail }}</p>
                </div>
                <div class="py-1">
                  <router-link v-for="item in userMenuItems" :key="item.name" :to="item.href" @click="userMenuOpen = false" class="flex items-center px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-blue-600 dark:hover:text-indigo-400 group" role="menuitem" tabindex="-1">
                     <component :is="item.icon" class="h-5 w-5 mr-3 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-indigo-400 transition-colors" />
                    {{ item.name }}
                  </router-link>
                </div>
                <div class="border-t border-slate-200 dark:border-slate-700 py-1">
                  <button @click="handleLogout" class="flex items-center w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-red-600 dark:hover:text-red-400 group" role="menuitem" tabindex="-1">
                    <ArrowRightOnRectangleIcon class="h-5 w-5 mr-3 text-slate-400 dark:text-slate-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                    Вийти
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </template>

        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:outline-none">
            <span class="sr-only">Відкрити меню</span>
            <Bars3Icon v-if="!mobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="mobileMenuOpen" class="md:hidden absolute top-16 md:top-20 inset-x-0 p-3 transition transform origin-top-right bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-slate-700 rounded-b-lg">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in currentNavigation"
            :key="item.name"
            :to="item.href"
            @click="closeMobileMenu"
            class="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors group"
            active-class="bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-indigo-400"
          >
            <component v-if="item.icon" :is="item.icon" class="h-5 w-5 mr-3 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-indigo-400 transition-colors" />
            {{ item.name }}
          </router-link>
          
          <!-- Додаткове посилання для мобільного меню -->
          <router-link 
            v-if="isLoggedIn" 
            to="/" 
            @click="closeMobileMenu"
            class="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors group"
          >
            <InformationCircleIcon class="h-5 w-5 mr-3 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-indigo-400 transition-colors" />
            Про сервіс
          </router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-slate-200 dark:border-slate-700">
          <template v-if="isLoggedIn">
            <div class="flex items-center px-3 mb-3">
              <img class="h-10 w-10 rounded-full object-cover mr-3 flex-shrink-0" :src="userAvatarUrl" alt="User avatar">
              <div>
                <p class="text-base font-medium text-slate-800 dark:text-white truncate">{{ userName }}</p>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{{ userEmail }}</p>
              </div>
            </div>
            <div class="space-y-1 px-2">
              <router-link v-for="item in userMenuItems" :key="item.name" :to="item.href" @click="closeMobileMenu" class="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-blue-600 dark:hover:text-indigo-400 group">
                  <component :is="item.icon" class="h-5 w-5 mr-3 text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-indigo-400 transition-colors" />
                  {{ item.name }}
                </router-link>
              <button @click="handleLogoutAndCloseMenu" class="flex items-center w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-red-600 dark:hover:text-red-400 group">
                  <ArrowRightOnRectangleIcon class="h-5 w-5 mr-3 text-slate-500 dark:text-slate-400 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                  Вийти
                </button>
            </div>
          </template>
          <template v-else>
             <div class="flex flex-col space-y-2 px-2">
              <router-link to="/login" @click="closeMobileMenu" class="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                Вхід
              </router-link>
              <router-link to="/register" @click="closeMobileMenu" class="block w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors">
                Реєстрація
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotifications } from '@/composables/useNotifications';
import logoUrl from '@/assets/logo.svg';
import {
  Bars3Icon, 
  XMarkIcon, 
  BellIcon, 
  PlusIcon, 
  HomeIcon, 
  VideoCameraIcon,
  Cog6ToothIcon, 
  ChartBarIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon, 
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon, 
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';

// Ініціалізація сховища авторизації
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

// Використання стану авторизації з Pinia store
const isLoggedIn = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

// Змінні для управління меню
const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);
const notificationMenuOpen = ref(false);

// Ініціалізація сповіщень
const { 
  notifications, 
  unreadCount, 
  loading: notificationsLoading, 
  markAsRead, 
  markAllAsRead,
  removeNotification,
  formatNotificationTime,
  getNotificationTypeClasses,
  getNotificationIcon 
} = useNotifications();

// Обчислювані властивості для даних користувача
const userName = computed(() => {
  if (user.value?.full_name) return user.value.full_name;
  if (user.value?.name) return user.value.name;
  if (user.value?.first_name || user.value?.last_name) {
    return `${user.value.first_name || ''} ${user.value.last_name || ''}`.trim();
  }
  if (user.value?.email) return user.value.email.split('@')[0];
  return 'Користувач';
});

const userEmail = computed(() => {
  return user.value?.email || '';
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

// Перенаправлення при кліку на логотип
const logoTargetLink = computed(() => {
  return isLoggedIn.value ? '/dashboard' : '/';
});

// Навігація залежно від статусу автентифікації
const loggedOutUserNavigation = [
  { name: 'Головна', href: '/', icon: HomeIcon },
];

const loggedInUserNavigation = [
  { name: 'Панель керування', href: '/dashboard', icon: HomeIcon },
  { name: 'Мої проекти', href: '/my-projects', icon: VideoCameraIcon },
];

const userMenuItems = [
  { name: 'Мій профіль', href: '/profile', icon: UserCircleIcon },
  { name: 'Налаштування', href: '/settings', icon: Cog6ToothIcon },
];

const currentNavigation = computed(() => {
  return isLoggedIn.value ? loggedInUserNavigation : loggedOutUserNavigation;
});

// Функція для закриття меню сповіщень при кліку за його межами
const handleClickOutside = (event) => {
  const notificationMenu = document.getElementById('notification-menu');
  
  if (notificationMenuOpen.value && notificationMenu && !notificationMenu.contains(event.target)) {
    const notificationButton = document.getElementById('notification-button');
    
    // Перевіряємо, що клік не на кнопці сповіщень
    if (!notificationButton || !notificationButton.contains(event.target)) {
      notificationMenuOpen.value = false;
    }
  }
  
  // Також можна реалізувати закриття user menu
  if (userMenuOpen.value) {
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenu = document.querySelector('[aria-labelledby="user-menu-button"]');
    
    if (userMenuButton && userMenu && 
        !userMenuButton.contains(event.target) && 
        !userMenu.contains(event.target)) {
      userMenuOpen.value = false;
    }
  }
};

// Для слухача подій нових сповіщень
const setupNotificationEventListeners = () => {
  // Додаємо слухача для автоматичного відкриття меню сповіщень при появі нового
  window.addEventListener('new-notification', (event) => {
    // Перевіряємо опції сповіщення
    const options = event.detail.options || {};
    
    // Якщо вказано autoOpen = true або не вказано (за замовчуванням true)
    if (options.autoOpen !== false) {
      // Відкриваємо меню сповіщень автоматично
      notificationMenuOpen.value = true;
      
      // Закриваємо меню автоматично через 5 секунд, якщо користувач не взаємодіє з ним
      setTimeout(() => {
        // Перевіряємо, чи користувач не наводить курсор на меню сповіщень
        const notificationMenu = document.getElementById('notification-menu');
        if (notificationMenu && !notificationMenu.matches(':hover')) {
          notificationMenuOpen.value = false;
        }
      }, 5000);
    }
  });
  
  // Додаємо слухача подій для оновлення аватара
  window.addEventListener('user-avatar-updated', (event) => {
    console.log('Avatar updated, refreshing header component');
    // В реальному додатку тут можна оновити інтерфейс, якщо потрібно
  });
};

// Очищення слухачів для уникнення витоків пам'яті
const cleanupNotificationEventListeners = () => {
  window.removeEventListener('new-notification', () => {});
  window.removeEventListener('user-avatar-updated', () => {});
};

watch(route, () => {
  mobileMenuOpen.value = false;
  userMenuOpen.value = false;
  notificationMenuOpen.value = false;
});

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Функція для створення нового проекту
const createNewProject = () => {
  router.push('/projects/new');
};

const handleLogout = async () => {
  try {
    // Використовуємо метод logout зі сховища auth замість безпосереднього виклику authService
    await authStore.logout();
    
    // Закриваємо меню
    userMenuOpen.value = false;
    
    // Перенаправляємо користувача на головну сторінку
    router.push('/');
  } catch (error) {
    console.error('Помилка при виході:', error);
  }
};

// Функція для виходу з системи і закриття мобільного меню
const handleLogoutAndCloseMenu = async () => {
  await handleLogout();
  closeMobileMenu();
};

// Ініціалізація - завантаження профілю користувача, якщо вже авторизований
onMounted(async () => {
  try {
    if (isLoggedIn.value) {
      // Примусово оновлюємо профіль користувача при кожному монтуванні
      await authStore.loadUserProfile();
      console.log('Profile loaded successfully:', authStore.user);
    }
    
    // Встановлюємо обробники подій
    setupNotificationEventListeners();
    
    // Додаємо слухача подій для закриття меню сповіщень при кліку за його межами
    document.addEventListener('click', handleClickOutside);
  } catch (error) {
    console.error('Error loading user profile during initialization:', error);
  }
});

// Очищення слухачів подій при демонтуванні
onUnmounted(() => {
  // Видаляємо слухач для закриття меню сповіщень
  document.removeEventListener('click', handleClickOutside);
  
  // Очищаємо слухачі подій сповіщень
  cleanupNotificationEventListeners();
});
</script>

<style scoped>
.main-container {
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}
@media (min-width: 768px) { .main-container { padding-left: 1.5rem; padding-right: 1.5rem; } }
@media (min-width: 1024px) { .main-container { padding-left: 2rem; padding-right: 2rem; } }

.animate-breath {
  animation: breath_anim 3s ease-in-out infinite alternate;
}
@keyframes breath_anim {
  from { transform: scale(1); }
  to { transform: scale(1.03); }
}

/* Стилі для сповіщень */
.notification-badge {
  transition: all 0.2s ease-in-out;
  transform-origin: center;
}

.notifications-container:hover .notification-badge {
  transform: scale(1.1);
}

.notifications-list {
  max-height: 400px;
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.notifications-list::-webkit-scrollbar {
  width: 6px;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.new-notification {
  animation: pulse 1.5s infinite;
}
</style>
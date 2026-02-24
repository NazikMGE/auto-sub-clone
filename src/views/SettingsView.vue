<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 transition-all duration-300">
    <!-- Декоративний фоновий елемент -->
    <div class="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent dark:from-blue-500/20 dark:to-transparent pointer-events-none"></div>
    
    <div class="absolute top-20 left-10 w-32 h-32 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
    <div class="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
    
    <div class="main-container py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Заголовок сторінки з анімацією -->
      <div class="mb-8 animate-fade-in">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
          <span class="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">Налаштування</span>
          <span class="ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 transform transition-transform hover:scale-105">
            Безпека та API
          </span>
        </h1>
        <p class="text-slate-600 dark:text-slate-400">
          Керуйте API ключами та налаштуваннями облікового запису
        </p>
      </div>

      <!-- Вкладки налаштувань з покращеним дизайном -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Навігація налаштувань (ліва панель) з анімацією -->
        <div class="lg:w-1/4 animate-fade-in" style="animation-delay: 0.1s">
          <nav class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            <div class="p-5 border-b border-slate-200 dark:border-slate-700">
              <h2 class="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                <Cog6ToothIcon class="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
                Категорії
              </h2>
            </div>
            <ul class="p-3 space-y-1">
              <li v-for="(tab, index) in settingsTabs" :key="index">
                <button 
                  @click="activeTab = tab.id" 
                  class="w-full px-4 py-3 flex items-center rounded-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  :class="activeTab === tab.id ? 
                    'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-indigo-400 shadow-sm' : 
                    'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'"
                >
                  <component :is="tab.icon" class="w-5 h-5 mr-3" :class="activeTab === tab.id ? 'text-blue-500 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'" />
                  <span class="font-medium">{{ tab.name }}</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Вміст активної вкладки (права панель) -->
        <div class="lg:w-3/4 space-y-6">
          <!-- API ключі та інтеграції з анімацією -->
          <div 
            v-if="activeTab === 'api'" 
            class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg animate-fade-in" 
            style="animation-delay: 0.2s"
          >
            <div class="p-8">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <KeyIcon class="w-6 h-6 mr-2 text-blue-500 dark:text-blue-400" />
                API ключі та інтеграції
              </h3>
              
              <!-- AssemblyAI інтеграція з покращеним дизайном -->
              <div class="space-y-6">
                <div class="border-b border-slate-200 dark:border-slate-700 pb-6">
                  <div class="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-4 mb-6 transition-all duration-300 hover:shadow-md">
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center">
                        <img src="@/assets/assemblyai.svg" alt="AssemblyAI Logo" class="h-6 w-auto mr-3">
                        <h4 class="text-lg font-semibold text-slate-800 dark:text-slate-200">AssemblyAI</h4>
                      </div>
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm transition-all duration-300" 
                            :class="apiKeyStatus.valid ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 
                                    apiKeyStatus.loading ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                    apiKeyStatus.error ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'">
                        <div v-if="apiKeyStatus.valid" class="flex items-center">
                          <CheckCircleIcon class="w-4 h-4 mr-1" />
                          Підключено
                        </div>
                        <div v-else-if="apiKeyStatus.loading" class="flex items-center">
                          <svg class="animate-spin w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Перевірка...
                        </div>
                        <div v-else-if="apiKeyStatus.error" class="flex items-center">
                          <ExclamationCircleIcon class="w-4 h-4 mr-1" />
                          Помилка
                        </div>
                        <div v-else class="flex items-center">
                          <InformationCircleIcon class="w-4 h-4 mr-1" />
                          Не підключено
                        </div>
                      </span>
                    </div>
                    
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-4 flex items-start">
                      <InformationCircleIcon class="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>
                        Введіть власний API ключ AssemblyAI для транскрипції своїх файлів. 
                        <a href="https://www.assemblyai.com/app/account" 
                          target="_blank" 
                          class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline">
                          Отримати ключ
                        </a>
                      </span>
                    </p>
                  </div>
                  
                  <div v-if="apiKeyStatus.error" class="mb-4 p-4 text-sm bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 flex items-center shadow-sm">
                    <ExclamationCircleIcon class="w-5 h-5 mr-2 text-red-500 dark:text-red-400 flex-shrink-0" />
                    {{ apiKeyStatus.errorMessage }}
                  </div>
                  
                  <div v-if="apiKeyStatus.valid" class="mb-4 p-4 text-sm bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300 flex items-center shadow-sm">
                    <CheckCircleIcon class="w-5 h-5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" />
                    API ключ успішно підтверджено.
                  </div>
                  
                  <div class="relative rounded-lg shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyIcon class="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <input 
                      type="text" 
                      id="assemblyai-key" 
                      v-model="settings.api.assemblyAI.key"
                      placeholder="Введіть ваш API ключ AssemblyAI"
                      :disabled="apiKeyStatus.loading"
                      class="pl-10 block w-full rounded-lg dark:border-slate-600 dark:bg-slate-700/50 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-base py-3 transition-colors border-transparent outline-none"
                    />
                  </div>
                  
                  <div class="mt-6 flex space-x-3">
                    <button 
                      type="button" 
                      @click="testAndSaveApiKey"
                      :disabled="!settings.api.assemblyAI.key || apiKeyStatus.loading"
                      class="group flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-0 bg-blue-600 text-white shadow-md transition-all duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <svg v-if="apiKeyStatus.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <CheckIcon v-else class="w-4 h-4 mr-2 text-white transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
                      {{ apiKeyStatus.loading ? 'Перевірка...' : 'Перевірити та зберегти' }}
                    </button>
                    <button 
                      v-if="apiKeyStatus.valid"
                      type="button"
                      @click="clearApiKey"
                      class="flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-2 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 dark:focus:ring-slate-700 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <TrashIcon class="w-4 h-4 mr-2 text-slate-500 dark:text-slate-400" />
                      Видалити ключ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Налаштування безпеки - зміна паролю з анімацією -->
          <div 
            v-if="activeTab === 'security'" 
            class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg animate-fade-in" 
            style="animation-delay: 0.2s"
          >
            <div class="p-8">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <ShieldCheckIcon class="w-6 h-6 mr-2 text-blue-500 dark:text-blue-400" />
                Зміна паролю
              </h3>
              
              <div v-if="passwordStatus.success" class="mb-6 p-4 text-sm bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300 flex items-center shadow-sm animate-fade-in">
                <CheckCircleIcon class="w-5 h-5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" />
                Пароль успішно змінено!
              </div>
              
              <div v-if="passwordStatus.error" class="mb-6 p-4 text-sm bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 flex items-center shadow-sm animate-fade-in">
                <ExclamationCircleIcon class="w-5 h-5 mr-2 text-red-500 dark:text-red-400 flex-shrink-0" />
                {{ passwordStatus.errorMessage }}
              </div>
              
              <div class="space-y-5">
                <div>
                  <label for="current-password" class="block text-base font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Поточний пароль
                  </label>
                  <div class="relative rounded-lg shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon class="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <input 
                      :type="showPassword.current ? 'text' : 'password'"
                      id="current-password" 
                      v-model="passwordForm.currentPassword"
                      placeholder="Введіть поточний пароль"
                      class="pl-10 pr-10 block w-full rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-base py-3 transition-colors border-transparent outline-none"
                    />
                    <button 
                      type="button"
                      @click="showPassword.current = !showPassword.current"
                      class="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      <EyeIcon v-if="showPassword.current" class="h-5 w-5" />
                      <EyeSlashIcon v-else class="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <label for="new-password" class="block text-base font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Новий пароль
                  </label>
                  <div class="relative rounded-lg shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyIcon class="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <input 
                      :type="showPassword.new ? 'text' : 'password'"
                      id="new-password" 
                      v-model="passwordForm.newPassword"
                      placeholder="Введіть новий пароль"
                      class="pl-10 pr-10 block w-full rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-base py-3 transition-colors border-transparent outline-none"
                    />
                    <button 
                      type="button"
                      @click="showPassword.new = !showPassword.new"
                      class="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      <EyeIcon v-if="showPassword.new" class="h-5 w-5" />
                      <EyeSlashIcon v-else class="h-5 w-5" />
                    </button>
                  </div>
                  <div class="mt-2">
                    <div class="flex items-center space-x-1">
                      <div 
                        v-for="strength in 4" 
                        :key="strength"
                        :class="[
                          'h-1.5 rounded-full flex-1 transition-all duration-300',
                          passwordStrength >= strength 
                            ? strengthColors[passwordStrength] 
                            : 'bg-slate-200 dark:bg-slate-700'
                        ]"
                      ></div>
                    </div>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                      <span v-if="passwordStrength >= 3" class="text-green-500 dark:text-green-400"><CheckCircleIcon class="w-4 h-4 mr-1 inline" /></span>
                      <span v-else-if="passwordStrength >= 2" class="text-yellow-500 dark:text-yellow-400"><ExclamationCircleIcon class="w-4 h-4 mr-1 inline" /></span>
                      <span v-else class="text-red-500 dark:text-red-400"><ExclamationTriangleIcon class="w-4 h-4 mr-1 inline" /></span>
                      {{ passwordStrengthText }}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label for="confirm-password" class="block text-base font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Підтвердження нового паролю
                  </label>
                  <div class="relative rounded-lg shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CheckBadgeIcon class="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                    <input 
                      :type="showPassword.confirm ? 'text' : 'password'"
                      id="confirm-password" 
                      v-model="passwordForm.confirmPassword"
                      placeholder="Повторіть новий пароль"
                      :class="{'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500': !passwordsMatch && passwordForm.confirmPassword}"
                      class="pl-10 pr-10 block w-full rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-base py-3 transition-colors border-transparent outline-none"
                    />
                    <button 
                      type="button"
                      @click="showPassword.confirm = !showPassword.confirm"
                      class="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      <EyeIcon v-if="showPassword.confirm" class="h-5 w-5" />
                      <EyeSlashIcon v-else class="h-5 w-5" />
                    </button>
                  </div>
                  <p v-if="!passwordsMatch && passwordForm.confirmPassword" class="text-xs text-red-500 dark:text-red-400 mt-2 flex items-center">
                    <ExclamationCircleIcon class="w-4 h-4 mr-1" />
                    Паролі не співпадають
                  </p>
                </div>
              </div>
              
              <div class="mt-8 flex justify-end">
                <button 
                  type="button" 
                  @click="changePassword"
                  :disabled="changePasswordDisabled || passwordStatus.loading"
                  class="group flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg border-0 bg-blue-600 text-white shadow-md transition-all duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  <svg v-if="passwordStatus.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <LockClosedIcon v-else class="w-4 h-4 mr-2 text-white transform transition-transform duration-500 group-hover:scale-110" />
                  {{ passwordStatus.loading ? 'Змінюємо пароль...' : 'Змінити пароль' }}
                </button>
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
  KeyIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  TrashIcon,
  Cog6ToothIcon,
  CheckIcon,
  CheckBadgeIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

// Використовуємо хук для сповіщень
const { 
  addSuccessNotification, 
  addErrorNotification, 
  addWarningNotification,
  addInfoNotification
} = useNotifications();

// Вкладки налаштувань - залишаємо лише API та безпеку
const settingsTabs = [
  { id: 'api', name: 'API та інтеграції', icon: KeyIcon },
  { id: 'security', name: 'Зміна паролю', icon: ShieldCheckIcon },
];

// Активна вкладка
const activeTab = ref('api');

// Налаштування користувача - спрощена структура
const settings = ref({
  api: {
    assemblyAI: {
      key: ''
    }
  }
});

// API ключ статус
const apiKeyStatus = ref({
  valid: false,
  loading: false,
  error: false,
  errorMessage: '',
  balance: null
});

// Форма зміни паролю
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Статус зміни пароля
const passwordStatus = ref({
  loading: false,
  success: false,
  error: false,
  errorMessage: ''
});

// Стан видимості паролів
const showPassword = ref({
  current: false,
  new: false,
  confirm: false
});

// Обчислення сили паролю
const passwordStrength = computed(() => {
  if (!passwordForm.value.newPassword) return 0;
  let strength = 0;
  if (passwordForm.value.newPassword.length >= 8) strength += 1;
  if (passwordForm.value.newPassword.length >= 12) strength += 1;
  if (/[A-Z]/.test(passwordForm.value.newPassword) && /[a-z]/.test(passwordForm.value.newPassword)) strength += 1;
  if (/[0-9]/.test(passwordForm.value.newPassword) || /[^A-Za-z0-9]/.test(passwordForm.value.newPassword)) strength += 1;
  return strength;
});

// Кольори індикатора сили паролю
const strengthColors = [
  'bg-red-500 dark:bg-red-600',         // 0 - не використовується
  'bg-red-500 dark:bg-red-600',         // 1 - дуже слабкий
  'bg-yellow-500 dark:bg-yellow-600',   // 2 - слабкий
  'bg-yellow-500 dark:bg-yellow-600',   // 3 - середній
  'bg-green-500 dark:bg-green-600'      // 4 - сильний
];

// Текст для сили паролю
const passwordStrengthText = computed(() => {
  if (!passwordForm.value.newPassword) return 'Введіть пароль';
  switch(passwordStrength.value) {
    case 0: return 'Дуже слабкий пароль';
    case 1: return 'Слабкий пароль - додайте більше символів';
    case 2: return 'Середній пароль - додайте ще символи, цифри та спеціальні знаки';
    case 3: return 'Хороший пароль';
    case 4: return 'Надійний пароль';
    default: return '';
  }
});

// Перевірка співпадіння паролів
const passwordsMatch = computed(() => {
  return passwordForm.value.newPassword === passwordForm.value.confirmPassword;
});

// Чи можна змінити пароль
const changePasswordDisabled = computed(() => {
  return !passwordForm.value.currentPassword ||
         !passwordForm.value.newPassword ||
         !passwordForm.value.confirmPassword ||
         passwordForm.value.newPassword !== passwordForm.value.confirmPassword ||
         passwordStrength.value < 2;
});

// Метод для тестування та збереження ключа з сповіщеннями
const testAndSaveApiKey = async () => {
  if (!settings.value.api.assemblyAI.key) {
    apiKeyStatus.value = {
      valid: false,
      loading: false,
      error: true,
      errorMessage: 'Введіть API ключ AssemblyAI',
      balance: null
    };
    addErrorNotification('Введіть API ключ AssemblyAI', { 
      playSound: true, 
      autoOpen: false 
    });
    return;
  }

  apiKeyStatus.value = {
    valid: false,
    loading: true,
    error: false,
    errorMessage: '',
    balance: null
  };

  try {
    // Відправка ключа на бекенд для перевірки та збереження
    const response = await api.put('/api/v1/users/api-keys/assemblyai', {
      key: settings.value.api.assemblyAI.key
    });
    
    // Після успішного збереження отримуємо оновлену інформацію про ключ
    const keyDataResponse = await api.get('/api/v1/users/api-keys/assemblyai');
    
    // Оновлюємо статус ключа
    apiKeyStatus.value = {
      valid: keyDataResponse.data.valid,
      loading: false,
      error: false,
      errorMessage: '',
      balance: keyDataResponse.data.balance || 'не визначено'
    };
    
    console.log('API ключ AssemblyAI успішно перевірено і збережено');
    
    // Додаємо сповіщення про успіх
    addSuccessNotification('API ключ AssemblyAI успішно перевірено і збережено', { 
      playSound: true, 
      autoOpen: false 
    });
  } catch (error) {
    console.error('Помилка при перевірці API ключа:', error);
    
    apiKeyStatus.value = {
      valid: false,
      loading: false,
      error: true,
      errorMessage: error.response?.data?.detail || 'Помилка при перевірці ключа',
      balance: null
    };
    
    // Додаємо сповіщення про помилку
    addErrorNotification(error.response?.data?.detail || 'Помилка при перевірці API ключа', { 
      playSound: true, 
      autoOpen: false 
    });
  }
};

// Метод для видалення API ключа з сповіщеннями
const clearApiKey = async () => {
  try {
    // Показуємо індикатор завантаження
    apiKeyStatus.value.loading = true;
    
    // Видалення ключа на бекенді
    await api.delete('/api/v1/users/api-keys/assemblyai');
    
    // Очищаємо ключ і статус
    settings.value.api.assemblyAI.key = '';
    apiKeyStatus.value = {
      valid: false,
      loading: false,
      error: false,
      errorMessage: '',
      balance: null
    };
    
    console.log('API ключ AssemblyAI видалено');
    
    // Додаємо сповіщення про успіх
    addSuccessNotification('API ключ AssemblyAI успішно видалено', { 
      playSound: true, 
      autoOpen: false 
    });
  } catch (error) {
    console.error('Помилка при видаленні API ключа:', error);
    
    if (error.response?.status === 404) {
      // Якщо ключ не знайдено, очищаємо локальний стан
      settings.value.api.assemblyAI.key = '';
      apiKeyStatus.value = {
        valid: false,
        loading: false,
        error: false,
        errorMessage: '',
        balance: null
      };
      
      // Додаємо інформаційне сповіщення
      addInfoNotification('API ключ не знайдено в системі', { 
        playSound: false,
        autoOpen: false 
      });
    } else {
      // Відображення помилки видалення
      apiKeyStatus.value.error = true;
      apiKeyStatus.value.errorMessage = error.response?.data?.detail || 'Помилка при видаленні ключа';
      apiKeyStatus.value.loading = false;
      
      // Додаємо сповіщення про помилку
      addErrorNotification(error.response?.data?.detail || 'Помилка при видаленні API ключа', { 
        playSound: true, 
        autoOpen: false 
      });
    }
  }
};

// Метод для зміни пароля з сповіщеннями
const changePassword = async () => {
  if (changePasswordDisabled.value) return;
  
  passwordStatus.value = {
    loading: true,
    success: false,
    error: false,
    errorMessage: ''
  };
  
  try {
    await api.post('/api/v1/users/change-password', {
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword
    });
    
    passwordStatus.value = {
      loading: false,
      success: true,
      error: false,
      errorMessage: ''
    };
    
    // Очищаємо форму після успіху
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    
    // Скидаємо стани показу паролів
    showPassword.value = {
      current: false,
      new: false,
      confirm: false
    };
    
    // Додаємо сповіщення про успіх
    addSuccessNotification('Пароль успішно змінено', { 
      playSound: true, 
      autoOpen: false 
    });
    
    // Через 3 секунди прибираємо повідомлення про успіх
    setTimeout(() => {
      passwordStatus.value.success = false;
    }, 3000);
    
  } catch (error) {
    console.error('Помилка при зміні пароля:', error);
    
    passwordStatus.value = {
      loading: false,
      success: false,
      error: true,
      errorMessage: error.response?.data?.detail || 'Помилка при зміні пароля'
    };
    
    // Додаємо сповіщення про помилку
    addErrorNotification(error.response?.data?.detail || 'Помилка при зміні пароля', { 
      playSound: true, 
      autoOpen: false 
    });
  }
};

// Завантаження налаштувань при створенні компонента
onMounted(async () => {
  try {
    // Спроба отримати ключ з бекенду
    try {
      const response = await api.get('/api/v1/users/api-keys/assemblyai');
      
      // Оновлюємо вміст поля
      settings.value.api.assemblyAI.key = response.data.key;
      
      // Оновлюємо статус ключа
      apiKeyStatus.value = {
        valid: response.data.valid,
        loading: false,
        error: false,
        errorMessage: '',
        balance: response.data.balance || 'не визначено'
      };
      
      console.log('API ключ AssemblyAI завантажено');
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Помилка при завантаженні API ключа:', error);
      } else {
        console.log('API ключ не знайдено на сервері');
      }
    }
  } catch (error) {
    console.error('Помилка при ініціалізації:', error);
  }
});
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

/* Додаткові стилі переходу для форм */
input, button {
  transition: all 0.3s ease;
}
</style>
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
          <span class="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">Панель керування</span>
        </h1>
        <p class="text-slate-600 dark:text-slate-400">
          Ласкаво просимо, {{ userName }}! Ось загальна статистика та ваші останні проекти.
        </p>
      </div>

      <!-- Картки статистики з покращеним дизайном -->
      <div v-if="statsLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-pulse">
        <div v-for="i in 4" :key="i" class="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-700 transition-all duration-300">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-slate-100 dark:bg-slate-700 w-12 h-12"></div>
            <div class="ml-5 space-y-2">
              <div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-24"></div>
              <div class="h-6 bg-slate-100 dark:bg-slate-700 rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in" style="animation-delay: 0.1s">
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex-shrink-0">
              <DocumentTextIcon class="h-6 w-6" />
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Всього проектів</p>
              <p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ stats.projects }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex-shrink-0">
              <CheckCircleIcon class="h-6 w-6" />
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Завершено</p>
              <p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ stats.completedProjects }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 flex-shrink-0">
              <ClockIcon class="h-6 w-6" />
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">В обробці</p>
              <p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ stats.processingProjects }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform">
          <div class="flex items-center">
            <div class="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <ClockIcon class="h-6 w-6" />
            </div>
            <div class="ml-5">
              <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Загальний час</p>
              <p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ formatProcessingTime(stats.totalProcessingSeconds) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Останні проекти -->
      <div class="mb-8 animate-fade-in" style="animation-delay: 0.2s">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-slate-900 dark:text-white flex items-center">
            <RectangleStackIcon class="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
            Останні проекти
          </h2>
          <router-link to="/my-projects" class="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
            Всі проекти
            <ArrowRightIcon class="ml-1 h-4 w-4" />
          </router-link>
        </div>
        
        <!-- Стан завантаження -->
        <div v-if="projectsLoading" class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-4 animate-pulse">
          <div v-for="i in 3" :key="i" class="mb-4 last:mb-0">
            <div class="flex items-center justify-between">
              <div class="flex items-center min-w-0">
                <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700"></div>
                <div class="ml-4 space-y-2">
                  <div class="h-4 bg-slate-100 dark:bg-slate-700 rounded w-48"></div>
                  <div class="h-3 bg-slate-100 dark:bg-slate-700 rounded w-24"></div>
                </div>
              </div>
              <div class="ml-4 flex-shrink-0 flex items-center space-x-4">
                <div class="h-6 w-20 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                <div class="h-8 w-8 bg-slate-100 dark:bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Список проектів -->
        <div v-else-if="recentProjects.length > 0" class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
          <ul class="divide-y divide-slate-200 dark:divide-slate-700">
            <li v-for="project in recentProjects" :key="project.id" class="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
              <div class="flex items-center justify-between">
                <div class="flex items-center min-w-0">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <DocumentTextIcon class="h-6 w-6" />
                    </div>
                  </div>
                  <div class="ml-4 min-w-0">
                    <p class="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {{ project.originalFilename || 'Проект без назви' }}
                    </p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {{ formatDate(project.createdAt) }}
                    </p>
                  </div>
                </div>
                <div class="ml-4 flex-shrink-0 flex items-center">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                        :class="getStatusClass(project.status)">
                    {{ getStatusText(project.status) }}
                  </span>
                  <router-link 
                    :to="`/projects/${project.id}`" 
                    class="ml-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    <ArrowRightIcon class="h-4 w-4" />
                  </router-link>
                </div>
              </div>
            </li>
          </ul>
        </div>
        
        <!-- Порожній стан -->
        <div v-else class="text-center py-10 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
          <DocumentPlusIcon class="h-12 w-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">Немає проектів</h3>
          <p class="text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-6">
            Ви ще не створили жодного проекту субтитрів. Почніть з завантаження відео або аудіо файлу.
          </p>
          <router-link 
            to="/projects/new" 
            class="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
          >
            <PlusIcon class="h-5 w-5 mr-2" />
            Створити проект
          </router-link>
        </div>
      </div>
      
      <!-- Швидкі дії -->
      <div class="animate-fade-in" style="animation-delay: 0.3s">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
          <BoltIcon class="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
          Швидкі дії
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            @click="navigateToNewProject" 
            class="flex items-center justify-center space-x-3 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <div class="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <PlusIcon class="h-5 w-5" />
            </div>
            <div class="text-left">
              <p class="text-base font-semibold text-slate-900 dark:text-white">Новий проект</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Додати файл для транскрипції</p>
            </div>
          </button>
          
          <button 
            @click="navigateToMyProjects" 
            class="flex items-center justify-center space-x-3 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <div class="p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
              <DocumentDuplicateIcon class="h-5 w-5" />
            </div>
            <div class="text-left">
              <p class="text-base font-semibold text-slate-900 dark:text-white">Мої проекти</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Управління всіма проектами</p>
            </div>
          </button>
          
          <button 
            @click="navigateToSettings"
            class="flex items-center justify-center space-x-3 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <div class="p-3 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
              <Cog6ToothIcon class="h-5 w-5" />
            </div>
            <div class="text-left">
              <p class="text-base font-semibold text-slate-900 dark:text-white">Налаштування</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Змінити конфігурацію</p>
            </div>
          </button>
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
  DocumentTextIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ArrowRightIcon,
  PlusIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  DocumentPlusIcon,
  RectangleStackIcon,
  BoltIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();
const { addErrorNotification } = useNotifications();

// Дані користувача
const userName = computed(() => {
  if (authStore.user?.full_name) return authStore.user.full_name;
  if (authStore.user?.name) return authStore.user.name;
  if (authStore.user?.first_name || authStore.user?.last_name) {
    return `${authStore.user.first_name || ''} ${authStore.user.last_name || ''}`.trim();
  }
  if (authStore.user?.email) return authStore.user.email.split('@')[0];
  return 'користувач';
});

// Стан завантаження даних
const statsLoading = ref(true);
const projectsLoading = ref(true);

// Дані для відображення
const stats = ref({
  projects: 0,
  completedProjects: 0,
  processingProjects: 0,
  totalProcessingSeconds: 0
});

const recentProjects = ref([]);

// Завантаження статистики
const loadUserStats = async () => {
  statsLoading.value = true;
  
  try {
    // Запит на отримання статистики
    const response = await api.get('/api/v1/users/me/stats');
    
    // Оновлюємо дані в stats
    stats.value = {
      projects: response.data.projects || 0,
      completedProjects: response.data.completedProjects || 0,
      processingProjects: calculateProcessingProjects(response.data.projects, response.data.completedProjects),
      totalProcessingSeconds: response.data.totalProcessingSeconds || 0
    };
  } catch (error) {
    console.error('Помилка при завантаженні статистики користувача:', error);
    
    addErrorNotification('Не вдалося завантажити статистику користувача', { 
      playSound: false, 
      autoOpen: false 
    });
  } finally {
    statsLoading.value = false;
  }
};

// Розрахунок кількості проектів в обробці
const calculateProcessingProjects = (total, completed) => {
  // Якщо дані невалідні, повертаємо 0
  if (typeof total !== 'number' || typeof completed !== 'number') {
    return 0;
  }
  
  // Розраховуємо різницю між загальним числом і завершеними
  const processing = total - completed;
  
  // Перевіряємо, щоб значення було невід'ємним
  return Math.max(0, processing);
};

// Завантаження останніх проектів
const loadRecentProjects = async () => {
  projectsLoading.value = true;
  
  try {
    // Запит на отримання списку завдань
    const jobsResponse = await api.get('/api/v1/jobs/');
    const jobsData = jobsResponse.data;
    
    // Для кожного завдання завантажуємо додаткову інформацію про файл
    const fileIds = jobsData.map(job => job.fileId);
    const uniqueFileIds = [...new Set(fileIds)];
    
    // Кешуємо метадані файлів для кожного завдання
    const fileMetadataMap = {};
    
    // Завантажуємо метадані для кожного файлу
    for (const fileId of uniqueFileIds) {
      try {
        const fileResponse = await api.get(`/api/v1/files/${fileId}`);
        fileMetadataMap[fileId] = fileResponse.data;
      } catch (error) {
        console.error(`Помилка при завантаженні метаданих файлу ${fileId}:`, error);
        // Якщо не вдалося завантажити метадані, створюємо порожній об'єкт
        fileMetadataMap[fileId] = {};
      }
    }
    
    // Об'єднуємо дані про завдання з даними про файли
    const projectsWithFileData = jobsData.map(job => {
      const fileData = fileMetadataMap[job.fileId] || {};
      return {
        ...job,
        ...fileData,
        id: job._id, // Гарантуємо, що id завжди присутній
        createdAt: job.createdAt // Пріоритет даті створення завдання
      };
    });
    
    // Сортуємо проекти за датою створення (найновіші спочатку)
    projectsWithFileData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Зберігаємо лише останні 3 проекти
    recentProjects.value = projectsWithFileData.slice(0, 3);
    
  } catch (error) {
    console.error('Помилка при завантаженні проектів:', error);
    
    addErrorNotification('Не вдалося завантажити останні проекти', { 
      playSound: false, 
      autoOpen: false 
    });
    
    recentProjects.value = [];
    
  } finally {
    projectsLoading.value = false;
  }
};

// Допоміжні функції
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  // Переконуємося, що рядок дати має явний маркер UTC
  let utcDateString = dateString;
  if (!dateString.endsWith('Z') && !dateString.includes('+')) {
    utcDateString = dateString + 'Z';
  }
  
  // Створюємо об'єкт Date з UTC часом
  const date = new Date(utcDateString);
  
  // Використовуємо toLocaleString БЕЗ параметра timeZone,
  // щоб використовувати локальний часовий пояс користувача
  return date.toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusText = (status) => {
  switch (status) {
    case 'queued': return 'У черзі';
    case 'processing_online': return 'Обробка';
    case 'processing_local': return 'Обробка';
    case 'completed': return 'Завершено';
    case 'error': return 'Помилка';
    default: return 'Невідомо';
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case 'queued': 
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'processing_online':
    case 'processing_local': 
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'completed': 
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'error': 
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default: 
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

const formatProcessingTime = (seconds) => {
  if (!seconds || seconds === 0) return '0 хв';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours} год ${minutes} хв`;
  } else {
    return `${minutes} хв`;
  }
};

// Функції навігації
const navigateToNewProject = () => {
  router.push('/projects/new');
};

const navigateToMyProjects = () => {
  router.push('/my-projects');
};

const navigateToSettings = () => {
  router.push('/settings');
};

// Завантаження даних при створенні компонента
onMounted(() => {
  // Завантажуємо статистику та останні проекти
  loadUserStats();
  loadRecentProjects();
});
</script>

<style scoped>

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

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
</style>
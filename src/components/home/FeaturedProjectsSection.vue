<template>
  <section class="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <div class="main-container">
      <div class="text-center mb-14 md:mb-20">
        <span class="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-indigo-400 mb-2 block">
          Ваші проекти
        </span>
        <h2 class="section-title">
          Останні <span class="text-blue-600 dark:text-indigo-400">проекти</span> субтитрів
        </h2>
        <p class="section-subtitle mt-4">
          Ваші недавні файли та проекти з субтитрами. Продовжіть роботу або створіть щось нове.
        </p>
      </div>

      <!-- Показуємо карточки з проектами користувача або заглушку -->
      <div v-if="isLoading" class="flex justify-center my-10">
        <div class="animate-spin h-12 w-12 border-4 border-blue-500 dark:border-indigo-500 rounded-full border-t-transparent"></div>
      </div>
      
      <div v-else-if="projects.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Карточки з проектами -->
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white dark:bg-slate-800/70 rounded-xl shadow-lg hover:shadow-xl p-5 transition-all duration-300 transform hover:scale-[1.02] border border-slate-200 dark:border-slate-700/50"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 flex-shrink-0 rounded-lg bg-blue-100 dark:bg-indigo-500/20 text-blue-600 dark:text-indigo-400 flex items-center justify-center">
              <component :is="getFileIcon(project)" class="h-7 w-7" />
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">
              {{ formatDate(project.createdAt) }}
            </div>
          </div>
          
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2 truncate">
            {{ project.originalFilename || 'Проект без назви' }}
          </h3>
          
          <p class="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
            {{ project.description || getDefaultDescription(project) }}
          </p>
          
          <div class="flex items-center justify-between mt-auto pt-3 border-t border-slate-200 dark:border-slate-700/50">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                  :class="getStatusClass(project.status)">
              {{ getStatusText(project.status) }}
            </span>
            
            <button @click="goToProject(project.id)" class="text-blue-600 dark:text-indigo-400 hover:text-blue-800 dark:hover:text-indigo-300 inline-flex items-center text-sm font-medium">
              Відкрити
              <ArrowRightIcon class="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-16">
        <div class="mx-auto w-24 h-24 bg-blue-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Немає проектів</h3>
        <p class="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
          Ви ще не створили жодного проекту субтитрів. Почніть з завантаження відео або аудіо файлу.
        </p>
        <BaseButton variant="primary" size="lg" @click="goToNewProject" class="!px-8">
          Створити перший проект
          <template #iconRight>
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </template>
        </BaseButton>
      </div>

      <!-- Кнопка "Перегляд всіх проектів" відображається тільки якщо є проекти -->
      <div v-if="projects.length > 0" class="text-center mt-12">
        <BaseButton variant="ghost" size="lg" @click="goToAllProjects">
          Переглянути всі проекти
          <template #iconRight>
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </template>
        </BaseButton>
      </div>
      
      <!-- Індикатор обмеження безкоштовного тарифу -->
      <div v-if="projectsCount >= freeProjectsLimit && userTier === 'free'" 
           class="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4 text-center">
        <div class="flex items-center justify-center mb-2">
          <ExclamationTriangleIcon class="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2" />
          <p class="text-yellow-700 dark:text-yellow-300 font-medium">
            Ви досягли ліміту одночасної обробки для безкоштовного тарифу
          </p>
        </div>
        <p class="text-sm text-yellow-600 dark:text-yellow-400">
          Нові проекти будуть поставлені в чергу до завершення поточних або можете оновитися до преміум-тарифу.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseButton from '../ui/BaseButton.vue';
import api from '@/services/api';
import {
  ChatBubbleLeftRightIcon,
  PlusIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  FilmIcon,
  MusicalNoteIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

// Стан компонента
const projects = ref([]);
const isLoading = ref(true);
const errorMessage = ref('');

// Дані про обмеження тарифу
const freeProjectsLimit = 5; // Ліміт для безкоштовного тарифу
const projectsCount = ref(0); // Загальна кількість активних проектів
const userTier = computed(() => authStore.user?.tier || 'free'); // Тариф користувача

// Реальна функція запиту до API для отримання проектів користувача
const fetchProjects = async () => {
  isLoading.value = true;
  
  try {
    // Запит до API для отримання останніх завдань користувача
    const response = await api.get('/api/v1/jobs/', {
      params: {
        limit: 3,    // Кількість завдань для відображення
        offset: 0    // Початок з першого завдання
        // Не потрібно передавати sort_by і sort_dir, оскільки бекенд 
        // вже сортує за createdAt в зворотному порядку
      }
    });
    
    // Отримуємо дані з відповіді
    const jobs = response.data; // Відповідь тепер є масивом
    
    // Зберігаємо загальну кількість активних проектів
    projectsCount.value = jobs.length; // Або можна зробити окремий запит для отримання загальної кількості
    
    // Перевіряємо структуру даних
    if (Array.isArray(jobs)) {
      // Додаткова обробка для отримання повної інформації про файли
      const projectsWithFiles = await Promise.all(
        jobs.map(async (job) => {
          try {
            // Отримуємо інформацію про файл для кожного завдання
            const fileResponse = await api.get(`/api/v1/files/${job.fileId}`);
            const fileData = fileResponse.data;
            
            // Об'єднуємо дані завдання з даними файлу
            return {
              id: job.id,
              fileId: job.fileId,
              originalFilename: fileData.originalFilename || 'Файл без назви',
              contentType: fileData.contentType,
              fileSize: fileData.fileSize,
              createdAt: job.createdAt || fileData.uploadDate, // Зверніть увагу на поле дати
              status: job.status || 'unknown',
              mode: job.mode,
              language: job.language,
              description: job.description
            };
          } catch (fileError) {
            console.warn(`Не вдалося отримати дані файлу для завдання ${job.id}:`, fileError);
            // Повертаємо завдання без додаткової інформації про файл
            return {
              id: job.id,
              fileId: job.fileId,
              originalFilename: 'Файл без назви',
              createdAt: job.createdAt,
              status: job.status || 'unknown',
              mode: job.mode,
              language: job.language,
              description: job.description
            };
          }
        })
      );
      
      // Оновлюємо стан з отриманими проектами
      projects.value = projectsWithFiles;
    } else {
      console.warn('Неочікувана структура даних від API:', jobs);
      projects.value = [];
    }
  } catch (error) {
    console.error('Помилка при завантаженні проектів:', error);
    
    // Деталізація помилки для відладки
    if (error.response) {
      console.error('Відповідь сервера:', error.response.data);
      console.error('Статус:', error.response.status);
      
      if (error.response.status === 401) {
        errorMessage.value = 'Необхідна авторизація для перегляду проектів';
      } else {
        errorMessage.value = error.response.data?.detail || 'Помилка при завантаженні проектів';
      }
    } else if (error.request) {
      console.error('Запит був зроблений, але відповідь не отримана:', error.request);
      errorMessage.value = 'Сервер не відповідає. Перевірте підключення до мережі';
    } else {
      console.error('Помилка при налаштуванні запиту:', error.message);
      errorMessage.value = 'Не вдалося завантажити проекти';
    }
    
    projects.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Визначення відповідної іконки на основі типу файлу
const getFileIcon = (project) => {
  if (!project.contentType) return ChatBubbleLeftRightIcon;
  
  if (project.contentType.startsWith('audio/')) {
    return MusicalNoteIcon;
  } else if (project.contentType.startsWith('video/')) {
    return FilmIcon;
  } else {
    return DocumentTextIcon;
  }
};

// Форматуємо дату для відображення
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = diffMs / (1000 * 60 * 60);
  
  if (diffHours < 24) {
    if (diffHours < 1) {
      return 'Щойно';
    }
    return `${Math.floor(diffHours)} год тому`;
  }
  
  if (diffHours < 48) {
    return 'Вчора';
  }
  
  return date.toLocaleDateString('uk-UA', { 
    day: 'numeric', 
    month: 'short'
  });
};

// Отримуємо текст статусу
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

// Отримуємо класи стилів для статусу
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

// Отримуємо опис проекту за замовчуванням, якщо відсутній
const getDefaultDescription = (project) => {
  // Якщо є contentType, використовуємо його
  if (project.contentType) {
    if (project.contentType.startsWith('audio/')) {
      return 'Аудіофайл для транскрипції';
    } else if (project.contentType.startsWith('video/')) {
      return 'Відеофайл для створення субтитрів';
    }
  }
  
  // Інакше намагаємося визначити за розширенням файлу
  const ext = project.originalFilename?.split('.').pop()?.toLowerCase();
  
  if (ext === 'mp4' || ext === 'mov' || ext === 'avi') {
    return 'Відеофайл для створення субтитрів';
  } 
  if (ext === 'mp3' || ext === 'wav' || ext === 'ogg') {
    return 'Аудіофайл для транскрипції';
  }
  
  return 'Файл для обробки';
};

// Функції для навігації
const goToProject = (projectId) => {
  // Переходимо на сторінку проекту
  router.push(`/projects/${projectId}`);
};

const goToAllProjects = () => {
  router.push('/my-projects');
};

const goToNewProject = () => {
  router.push('/projects/new');
};

// Завантажуємо проекти при створенні компонента
onMounted(() => {
  fetchProjects();
});
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 transition-all duration-300">
    <!-- Декоративний фоновий елемент -->
    <div class="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent dark:from-blue-500/20 dark:to-transparent pointer-events-none"></div>
    
    <div class="absolute top-20 right-10 w-32 h-32 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
    <div class="absolute bottom-20 left-10 w-40 h-40 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
    
    <div class="main-container py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Заголовок сторінки з анімацією -->
      <div class="flex justify-between items-center mb-8 animate-fade-in">
        <div>
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            <span class="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">Мої проекти</span>
          </h1>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Перегляд і керування вашими проектами субтитрів
          </p>
        </div>
        
        <router-link to="/projects/new" class="px-5 py-2.5 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-700 transition flex items-center">
          <PlusIcon class="h-5 w-5 mr-2" />
          Новий проект
        </router-link>
      </div>

      <!-- Фільтри та пошук -->
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6 mb-8 animate-fade-in" style="animation-delay: 0.1s">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div class="flex-grow max-w-md">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon class="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Пошук за назвою файлу..." 
                class="pl-10 pr-4 py-2 w-full rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 border-transparent"
              />
            </div>
          </div>
          
          <div class="flex space-x-3">
            <select 
              v-model="statusFilter" 
              class="rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 border-transparent py-2 pl-3 pr-8"
            >
              <option value="all">Всі статуси</option>
              <option value="queued">У черзі</option>
              <option value="processing">Обробка</option>
              <option value="completed">Завершені</option>
              <option value="error">З помилками</option>
            </select>
            
            <select 
              v-model="sortOrder" 
              class="rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 border-transparent py-2 pl-3 pr-8"
            >
              <option value="newest">Найновіші спочатку</option>
              <option value="oldest">Найстаріші спочатку</option>
              <option value="name-asc">За назвою (А-Я)</option>
              <option value="name-desc">За назвою (Я-А)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Список проектів -->
      <div class="animate-fade-in" style="animation-delay: 0.2s">
        <!-- Стан завантаження -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="text-center">
            <svg class="animate-spin h-12 w-12 text-blue-600 dark:text-indigo-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-lg text-slate-700 dark:text-slate-300">Завантаження проектів...</p>
          </div>
        </div>
        
        <!-- Стан помилки -->
        <div v-else-if="error" class="flex justify-center items-center py-10">
          <div class="text-center max-w-md">
            <ExclamationCircleIcon class="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Сталася помилка</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-6">{{ error }}</p>
            <button 
              @click="loadProjects"
              class="px-5 py-2.5 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-700 transition"
            >
              Спробувати знову
            </button>
          </div>
        </div>
        
        <!-- Порожній стан -->
        <div v-else-if="filteredProjects.length === 0 && !loading" class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-10 text-center">
          <div v-if="searchQuery || statusFilter !== 'all'" class="max-w-md mx-auto">
            <MagnifyingGlassIcon class="h-16 w-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Нічого не знайдено</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
              Немає проектів, які відповідають вашим критеріям пошуку. Спробуйте змінити фільтри.
            </p>
            <button 
              @click="resetFilters"
              class="px-5 py-2.5 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-700 transition"
            >
              Скинути фільтри
            </button>
          </div>
          <div v-else class="max-w-md mx-auto">
            <DocumentPlusIcon class="h-16 w-16 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
            <h2 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Ще немає проектів</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-6">
              Ви ще не створили жодного проекту. Почніть з завантаження файлу для створення субтитрів.
            </p>
            <router-link 
              to="/projects/new"
              class="px-5 py-2.5 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-700 transition inline-flex items-center"
            >
              <PlusIcon class="h-5 w-5 mr-2" />
              Створити перший проект
            </router-link>
          </div>
        </div>
        
        <!-- Список проектів -->
        <div v-else class="space-y-4">
          <div 
            v-for="project in filteredProjects" 
            :key="project.id" 
            class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-5 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            <div class="flex items-start justify-between flex-wrap md:flex-nowrap gap-4">
              <div class="flex items-start flex-grow min-w-0">
                <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0">
                  <DocumentTextIcon class="h-6 w-6" />
                </div>
                <div class="min-w-0 flex-grow">
                  <router-link 
                    :to="`/projects/${project.id}`" 
                    class="block text-lg font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                  >
                    {{ project.originalFilename || 'Проект без назви' }}
                  </router-link>
                  <div class="flex flex-wrap gap-x-4 mt-1 text-sm text-slate-500 dark:text-slate-400">
                    <span>Створено: {{ formatDate(project.createdAt) }}</span>
                    <span v-if="project.fileSize">Розмір: {{ formatFileSize(project.fileSize) }}</span>
                    <span>Режим: {{ project.mode === 'online' ? 'Онлайн' : 'Локально' }}</span>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
                  :class="getStatusClass(project.status)"
                >
                  {{ getStatusText(project.status) }}
                </span>
                
                <router-link 
                  :to="`/projects/${project.id}`"
                  class="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                  title="Переглянути деталі"
                >
                  <ArrowTopRightOnSquareIcon class="h-5 w-5" />
                </router-link>
                
                <button 
                  @click="confirmDeleteProject(project.id)"
                  class="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                  title="Видалити проект"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Пагінація -->
        <div v-if="filteredProjects.length > 0 && totalPages > 1" class="flex justify-center mt-8">
          <nav class="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button 
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-slate-500 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-l-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon class="h-5 w-5" />
            </button>
            <div 
              v-for="page in pageNumbers" 
              :key="page"
              class="relative inline-flex items-center"
            >
              <button 
                v-if="page !== '...'"
                @click="currentPage = page"
                :class="[
                  'relative inline-flex items-center px-4 py-2 text-sm font-medium border border-slate-300 dark:border-slate-600',
                  currentPage === page 
                    ? 'z-10 bg-blue-600 dark:bg-indigo-600 text-white border-blue-600 dark:border-indigo-600' 
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="relative inline-flex items-center px-4 py-2 text-sm font-medium border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                ...
              </span>
            </div>
            <button 
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-slate-500 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-r-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon class="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
    
    <!-- Модальне вікно підтвердження видалення -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all animate-fade-in">
        <div class="text-center mb-6">
          <div class="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
            <ExclamationTriangleIcon class="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-2">Підтвердження видалення</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Ви впевнені, що хочете видалити цей проект? Ця дія не може бути скасована.
          </p>
        </div>
        <div class="flex justify-end space-x-3">
          <button 
            @click="cancelDelete"
            class="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
          >
            Скасувати
          </button>
          <button 
            @click="deleteProject"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
          >
            <TrashIcon class="h-5 w-5 mr-2" />
            Видалити
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotifications } from '@/composables/useNotifications';
import api from '@/services/api';
import {
  PlusIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentPlusIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();
const { addSuccessNotification, addErrorNotification } = useNotifications();

// Стан сторінки
const loading = ref(true);
const error = ref('');
const projects = ref([]);
const fileMetadata = ref({});

// Фільтри та сортування
const searchQuery = ref('');
const statusFilter = ref('all');
const sortOrder = ref('newest');

// Пагінація
const itemsPerPage = 10;
const currentPage = ref(1);

// Видалення проекту
const showDeleteConfirm = ref(false);
const projectToDelete = ref(null);

// Завантаження проектів користувача
const loadProjects = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    // Завантажуємо список завдань
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
    
    // Зберігаємо метадані файлів
    fileMetadata.value = fileMetadataMap;
    
    // Об'єднуємо дані про завдання з даними про файли
    const projectsWithFileData = jobsData.map(job => {
      const fileData = fileMetadataMap[job.fileId] || {};
      return {
        ...job,
        ...fileData,
        id: job._id, // Гарантуємо, що id завжди присутній та відповідає _id
        createdAt: job.createdAt // Пріоритет даті створення завдання
      };
    });
    
    // Сортуємо проекти за датою створення (найновіші спочатку)
    projectsWithFileData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Зберігаємо проекти
    projects.value = projectsWithFileData;
    
  } catch (error) {
    console.error('Помилка при завантаженні проектів:', error);
    
    let errorMessage = 'Не вдалося завантажити проекти';
    
    if (error.response) {
      errorMessage = error.response.data.detail || errorMessage;
    } else if (error.request) {
      errorMessage = 'Сервер не відповідає. Перевірте з\'єднання з інтернетом';
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    error.value = errorMessage;
    
  } finally {
    loading.value = false;
  }
};

// Фільтрація та сортування проектів
const filteredProjects = computed(() => {
  let result = [...projects.value];
  
  // Фільтрація за пошуковим запитом
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(project => {
      const filename = (project.originalFilename || '').toLowerCase();
      return filename.includes(query);
    });
  }
  
  // Фільтрація за статусом
  if (statusFilter.value !== 'all') {
    if (statusFilter.value === 'processing') {
      // Обробка включає всі статуси з обробкою
      result = result.filter(project => 
        project.status === 'queued' || 
        project.status === 'processing_online' || 
        project.status === 'processing_local'
      );
    } else {
      // Інші статуси фільтруємо напряму
      result = result.filter(project => project.status === statusFilter.value);
    }
  }
  
  // Сортування
  result.sort((a, b) => {
    switch (sortOrder.value) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'name-asc':
        return (a.originalFilename || '').localeCompare(b.originalFilename || '');
      case 'name-desc':
        return (b.originalFilename || '').localeCompare(a.originalFilename || '');
      default:
        return 0;
    }
  });
  
  return result;
});

// Пагіновані проекти
const paginatedProjects = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredProjects.value.slice(startIndex, endIndex);
});

// Загальна кількість сторінок
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredProjects.value.length / itemsPerPage));
});

// Номери сторінок для пагінації
const pageNumbers = computed(() => {
  const pages = [];
  const maxPagesToShow = 7; // Максимальна кількість кнопок пагінації
  
  if (totalPages.value <= maxPagesToShow) {
    // Якщо загальна кількість сторінок менша або дорівнює максимальній кількості кнопок,
    // показуємо всі сторінки
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Інакше показуємо частину сторінок з '...'
    const leftBoundary = Math.max(1, currentPage.value - 1);
    const rightBoundary = Math.min(totalPages.value, currentPage.value + 1);
    
    // Завжди показуємо першу сторінку
    pages.push(1);
    
    // Додаємо '...', якщо поточна сторінка достатньо далеко від початку
    if (leftBoundary > 2) {
      pages.push('...');
    }
    
    // Додаємо сторінки навколо поточної
    for (let i = leftBoundary; i <= rightBoundary; i++) {
      if (i !== 1 && i !== totalPages.value) {
        pages.push(i);
      }
    }
    
    // Додаємо '...', якщо поточна сторінка достатньо далеко від кінця
    if (rightBoundary < totalPages.value - 1) {
      pages.push('...');
    }
    
    // Завжди показуємо останню сторінку
    pages.push(totalPages.value);
  }
  
  return pages;
});

// Скидання фільтрів
const resetFilters = () => {
  searchQuery.value = '';
  statusFilter.value = 'all';
  sortOrder.value = 'newest';
  currentPage.value = 1;
};

// Підтвердження видалення проекту
const confirmDeleteProject = (projectId) => {
  projectToDelete.value = projectId;
  showDeleteConfirm.value = true;
};

// Скасування видалення
const cancelDelete = () => {
  projectToDelete.value = null;
  showDeleteConfirm.value = false;
};

// Видалення проекту
const deleteProject = async () => {
  if (!projectToDelete.value) {
    cancelDelete();
    return;
  }
  
  try {
    await api.delete(`/api/v1/jobs/${projectToDelete.value}`);
    
    // Оновлюємо список проектів
    projects.value = projects.value.filter(project => project.id !== projectToDelete.value);
    
    // Показуємо сповіщення
    addSuccessNotification('Проект успішно видалено', { 
      playSound: true, 
      autoOpen: false 
    });
    
    // Закриваємо модальне вікно
    cancelDelete();
    
  } catch (error) {
    console.error('Помилка при видаленні проекту:', error);
    
    // Показуємо повідомлення про помилку
    let errorMessage = 'Не вдалося видалити проект';
    
    if (error.response) {
      errorMessage = error.response.data.detail || errorMessage;
    } else if (error.request) {
      errorMessage = 'Сервер не відповідає. Перевірте з\'єднання з інтернетом';
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    addErrorNotification(errorMessage, { 
      playSound: true, 
      autoOpen: false 
    });
    
    // Закриваємо модальне вікно
    cancelDelete();
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

const formatFileSize = (bytes) => {
  if (!bytes) return '';
  if (bytes === 0) return '0 байтів';
  
  const k = 1024;
  const sizes = ['байтів', 'КБ', 'МБ', 'ГБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

// Вебхуки для відстеження змін
watch([searchQuery, statusFilter, sortOrder], () => {
  currentPage.value = 1; // Скидаємо сторінку при зміні фільтрів
});

// Завантаження проектів при створенні компонента
onMounted(() => {
  loadProjects();
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
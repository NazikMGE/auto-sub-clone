<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 transition-all duration-300">
    <!-- Декоративний фоновий елемент -->
    <div class="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent dark:from-blue-500/20 dark:to-transparent pointer-events-none"></div>
    
    <div class="absolute top-20 right-10 w-32 h-32 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
    <div class="absolute bottom-20 left-10 w-40 h-40 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
    
    <div class="main-container py-10 px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Заголовок сторінки з навігацією назад з анімацією -->
      <div class="mb-8 animate-fade-in">
        <div class="flex items-center mb-4">
          <button 
            @click="router.back()" 
            class="mr-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400  p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transform transition-transform hover:scale-105"
          >
            <ArrowLeftIcon class="h-5 w-5" />
          </button>
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center">
            <span class="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">Деталі проекту</span>
            <span class="ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 transform transition-transform hover:scale-105">
              Субтитри
            </span>
          </h1>
        </div>
        <p class="text-slate-600 dark:text-slate-400 ml-9">
          Перегляд та керування проектом субтитрів
        </p>
      </div>

      <!-- Вміст для завантаження з покращеною анімацією -->
      <div v-if="loading" class="flex justify-center items-center py-20 animate-fade-in">
        <div class="text-center bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 p-10">
          <svg class="animate-spin h-12 w-12 text-blue-600 dark:text-indigo-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-lg text-slate-700 dark:text-slate-300">Завантаження інформації про проект...</p>
        </div>
      </div>

      <!-- Вміст для помилки з покращеним дизайном -->
      <div v-else-if="error" class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-8 max-w-3xl mx-auto animate-fade-in transition-all duration-300 hover:shadow-lg">
        <div class="text-center">
          <div class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <ExclamationCircleIcon class="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Помилка завантаження проекту</h2>
          <p class="text-slate-600 dark:text-slate-400 mb-6">{{ error }}</p>
          <div class="flex justify-center space-x-4">
            <button 
              @click="router.push('/my-projects')" 
              class="flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 dark:focus:ring-slate-700 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <DocumentTextIcon class="w-4 h-4 mr-2 text-slate-500 dark:text-slate-400" />
              Всі проекти
            </button>
            <button 
              @click="loadProjectData()" 
              class="group flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-0 bg-blue-600 text-white shadow-md transition-all duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowPathIcon class="w-4 h-4 mr-2 text-white transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
              Спробувати знову
            </button>
          </div>
        </div>
      </div>

      <!-- Основний вміст з покращеним дизайном -->
      <div v-else-if="project" class="animate-fade-in">
        <div class="grid gap-8 lg:grid-cols-3">
          <!-- Інформація про проект -->
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-8 mb-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style="animation-delay: 0.1s">
              <div class="flex items-start justify-between mb-6">
                <div class="flex items-center">
                  <div class="w-14 h-14 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4 transform transition-all duration-300 group-hover:scale-110 shadow-sm">
                    <DocumentTextIcon class="h-7 w-7" />
                  </div>
                  <div>
                    <h2 class="text-xl font-semibold text-slate-900 dark:text-white">
                      {{ project.originalFilename || 'Проект без назви' }}
                    </h2>
                    <p class="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                      <CalendarIcon class="w-4 h-4 mr-1 text-blue-500 dark:text-blue-400" />
                      Створено: {{ formatDate(project.createdAt) }}
                    </p>
                  </div>
                </div>
                
                <div>
                  <span 
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm transform transition-transform hover:scale-105"
                    :class="getStatusClass(project.status)"
                  >
                    {{ getStatusText(project.status) }}
                  </span>
                </div>
              </div>
              
              <div class="mb-6 space-y-4">
                <div class="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5 transition-all duration-300 hover:shadow-md hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transform hover:-translate-y-1">
                  <h3 class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                    <InformationCircleIcon class="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
                    Інформація про файл
                  </h3>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="group">
                      <p class="text-slate-500 dark:text-slate-400">Тип файлу:</p>
                      <p class="font-medium text-slate-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ getFileType(project.contentType) }}</p>
                    </div>
                    <div class="group">
                      <p class="text-slate-500 dark:text-slate-400">Розмір:</p>
                      <p class="font-medium text-slate-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ formatFileSize(project.fileSize) }}</p>
                    </div>
                    <div class="group">
                      <p class="text-slate-500 dark:text-slate-400">Режим обробки:</p>
                      <p class="font-medium text-slate-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ project.mode === 'online' ? 'Онлайн (AssemblyAI)' : 'Локально' }}</p>
                    </div>
                  </div>
                </div>
                
                <div v-if="isProcessing" class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 flex items-start transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                  <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0">
                    <InformationCircleIcon class="h-6 w-6" />
                  </div>
                  <div>
                    <p class="text-sm text-blue-800 dark:text-blue-300 font-medium">Обробка в процесі</p>
                    <p class="text-sm text-blue-700 dark:text-blue-400 mt-1">
                      Будь ласка, зачекайте, поки ваш файл буде оброблено. Цей процес може зайняти кілька хвилин, залежно від розміру файлу.
                    </p>
                  </div>
                </div>
                
                <div v-if="isError" class="bg-red-50 dark:bg-red-900/20 rounded-lg p-5 flex items-start transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
                  <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center text-red-500 dark:text-red-400 mr-3 flex-shrink-0">
                    <ExclamationCircleIcon class="h-6 w-6" />
                  </div>
                  <div>
                    <p class="text-sm text-red-800 dark:text-red-300 font-medium">Помилка обробки</p>
                    <p class="text-sm text-red-700 dark:text-red-400 mt-1">
                      {{ project.errorMessage || 'Виникла помилка під час обробки файлу. Будь ласка, спробуйте знову.' }}
                    </p>
                  </div>
                </div>
              </div>
              
              <div v-if="isCompleted && subtitlesContent" class="mb-6">
                <h3 class="text-lg font-medium text-slate-900 dark:text-white mb-4 flex items-center">
                  <DocumentTextIcon class="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
                  Попередній перегляд субтитрів
                </h3>
                <div class="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5 h-64 overflow-y-auto font-mono text-sm transition-all duration-300 hover:shadow-md hover:bg-blue-50/50 dark:hover:bg-blue-900/20">
                  <pre class="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{{ subtitlesContent }}</pre>
                </div>
              </div>
              
              <div class="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button 
                  v-if="isCompleted"
                  @click="downloadSubtitles"
                  class="group flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-0 bg-blue-600 text-white shadow-md transition-all duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ArrowDownTrayIcon class="w-4 h-4 mr-2 text-white transform transition-transform duration-500 group-hover:scale-110" />
                  Завантажити субтитри
                </button>
                
                <!-- Покращена кнопка для завантаження оригінального файлу -->
                <button 
                  @click="downloadOriginalFile"
                  class="group flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md transition-all duration-300 hover:shadow-lg dark:from-purple-700 dark:to-indigo-600 dark:hover:from-purple-800 dark:hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-400 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <FilmIcon class="w-4 h-4 mr-2 text-white transform transition-transform duration-500 group-hover:scale-110" />
                  Завантажити медіафайл
                </button>
                
                <button 
                  v-if="isProcessing"
                  @click="checkProcessingStatus"
                  class="flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-2 border-blue-200 dark:border-blue-900/50 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 shadow-sm transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 dark:focus:ring-blue-700 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ArrowPathIcon class="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400 animate-spin" />
                  Оновити статус
                </button>
                
                <button 
                  v-if="isError"
                  @click="restartProcessing"
                  class="flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-2 border-yellow-200 dark:border-yellow-900/50 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 shadow-sm transition-all duration-300 hover:border-yellow-300 dark:hover:border-yellow-800 hover:bg-yellow-200 dark:hover:bg-yellow-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 dark:focus:ring-yellow-700 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <ArrowPathIcon class="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                  Спробувати знову
                </button>
                
                <button 
                  @click="showDeleteConfirm = true"
                  class="flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-2 border-red-200 dark:border-red-900/50 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 shadow-sm transition-all duration-300 hover:border-red-300 dark:hover:border-red-800 hover:bg-red-200 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 dark:focus:ring-red-700 transform hover:-translate-y-0.5 active:translate-y-0 ml-auto"
                >
                  <TrashIcon class="w-4 h-4 mr-2 text-red-600 dark:text-red-400" />
                  Видалити проект
                </button>
              </div>
            </div>
          </div>
          
          <!-- Бокова панель з налаштуваннями/інформацією -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6 mb-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style="animation-delay: 0.2s">
              <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <Cog6ToothIcon class="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                Налаштування
              </h3>
              
              <div class="space-y-5">
                <div v-if="isCompleted" class="group bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5 transition-all duration-300 hover:shadow-md hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transform hover:-translate-y-1">
                  <label for="subtitle-format" class=" text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                    <DocumentTextIcon class="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110" />
                    Формат субтитрів
                  </label>
                  <select 
                    id="subtitle-format" 
                    v-model="subtitleFormat" 
                    class="block w-full rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 border border-slate-300 dark:border-slate-600 py-2 px-3 transition-colors"
                  >
                    <option value="srt">SubRip (.srt)</option>
                    <option value="vtt">WebVTT (.vtt)</option>
                  </select>
                </div>
                
                <div class="group bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5 transition-all duration-300 hover:shadow-md hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transform hover:-translate-y-1">
                  <label class=" text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                    <ClockIcon class="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-all duration-300 group-hover:scale-110" />
                    Стан обробки
                  </label>
                  <div class="text-sm mt-3">
                    <div v-if="isCompleted" class="flex items-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                      <CheckCircleIcon class="h-5 w-5 mr-2" />
                      <span>Обробка завершена</span>
                    </div>
                    <div v-else-if="isProcessing" class="flex items-center text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                      <ClockIcon class="h-5 w-5 mr-2" />
                      <span>В процесі обробки</span>
                    </div>
                    <div v-else-if="isError" class="flex items-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                      <ExclamationCircleIcon class="h-5 w-5 mr-2" />
                      <span>Помилка обробки</span>
                    </div>
                  </div>
                </div>
                
                <!-- Покращений блок з інформацією про визначену мову -->
                <div v-if="project.resultStats && project.resultStats.detected_language" class="group bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5 transition-all duration-300 hover:shadow-md hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transform hover:-translate-y-1">
                  <label class=" text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                    <InformationCircleIcon class="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-all duration-300 group-hover:scale-110" />
                    Параметри розпізнавання
                  </label>
                  <div class="space-y-2 mt-2 text-sm">
                    <div class="flex justify-between items-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                      <span class="text-slate-500 dark:text-slate-400">Визначена мова:</span>
                      <span class="font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
                        {{ getLanguageName(project.resultStats.detected_language) }}
                      </span>
                    </div>
                    <div v-if="project.resultStats.language_confidence" class="flex justify-between items-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                      <span class="text-slate-500 dark:text-slate-400">Впевненість визначення мови:</span>
                      <span class="font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
                        {{ Math.round(project.resultStats.language_confidence * 100) }}%
                      </span>
                    </div>
                    <div v-if="project.resultStats.confidence_score" class="flex justify-between items-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                      <span class="text-slate-500 dark:text-slate-400">Точність розпізнавання:</span>
                      <span class="font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
                        {{ Math.round(project.resultStats.confidence_score * 100) }}%
                      </span>
                    </div>
                    <div v-if="project.resultStats.model_used" class="flex justify-between items-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                      <span class="text-slate-500 dark:text-slate-400">Використана модель:</span>
                      <span class="font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
                        {{ getModelName(project.resultStats.model_used) }}
                      </span>
                    </div>
                    <div v-if="project.resultStats.words_count" class="flex justify-between items-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                      <span class="text-slate-500 dark:text-slate-400">Слів розпізнано:</span>
                      <span class="font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
                        {{ project.resultStats.words_count }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div v-if="project.processingDurationSeconds" class="group bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5 transition-all duration-300 hover:shadow-md hover:bg-green-50/50 dark:hover:bg-green-900/20 transform hover:-translate-y-1">
                  <label class=" text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                    <ClockIcon class="w-4 h-4 mr-2 text-green-500 dark:text-green-400 group-hover:text-green-600 dark:group-hover:text-green-300 transition-all duration-300 group-hover:scale-110" />
                    Час обробки
                  </label>
                  <div class="text-lg font-semibold text-slate-900 dark:text-white px-2 py-1 bg-white dark:bg-slate-800 rounded-lg text-center">
                    {{ formatProcessingTime(project.processingDurationSeconds) }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Покращений блок з підказками або допомогою -->
            <div class="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style="animation-delay: 0.3s">
              <h3 class="text-sm font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 flex items-center">
                <div class="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-500 mr-2">
                  <LightBulbIcon class="h-5 w-5" />
                </div>
                Підказки
              </h3>
              <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li class="flex items-start bg-white dark:bg-slate-800/50 rounded-lg p-3 transition-all duration-300 hover:shadow-sm hover:bg-blue-50 dark:hover:bg-blue-900/10">
                  <CheckIcon class="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                  <span>Ви можете завантажити субтитри в різних форматах</span>
                </li>
                <li class="flex items-start bg-white dark:bg-slate-800/50 rounded-lg p-3 transition-all duration-300 hover:shadow-sm hover:bg-blue-50 dark:hover:bg-blue-900/10">
                  <CheckIcon class="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                  <span>Завантажте оригінальний медіафайл щоб використати його з субтитрами</span>
                </li>
                <li class="flex items-start bg-white dark:bg-slate-800/50 rounded-lg p-3 transition-all duration-300 hover:shadow-sm hover:bg-blue-50 dark:hover:bg-blue-900/10">
                  <CheckIcon class="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                  <span>Для локального використання завантажте субтитри у форматі SRT</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Покращене модальне вікно підтвердження видалення -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all animate-fade-in scale-100 hover:scale-100">
        <div class="text-center mb-6">
          <div class="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 shadow-inner">
            <ExclamationTriangleIcon class="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Підтвердження видалення</h3>
          <p class="text-slate-600 dark:text-slate-400">
            Ви впевнені, що хочете видалити цей проект? Ця дія не може бути скасована.
          </p>
        </div>
        <div class="flex justify-end space-x-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button 
            @click="showDeleteConfirm = false"
            class="flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 dark:focus:ring-slate-700 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowPathIcon class="w-4 h-4 mr-2 text-slate-500 dark:text-slate-400" />
            Скасувати
          </button>
          <button 
            @click="deleteProject"
            class="group flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-lg border-0 bg-red-600 text-white shadow-md transition-all duration-300 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <TrashIcon class="w-4 h-4 mr-2 text-white transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
            Видалити
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotifications } from '@/composables/useNotifications';
import api from '@/services/api';
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  TrashIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  ClockIcon,
  LightBulbIcon,
  CheckIcon,
  FilmIcon,
  CalendarIcon,
  UserIcon
} from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { addSuccessNotification, addErrorNotification, addInfoNotification } = useNotifications();

// Стан сторінки
const loading = ref(true);
const error = ref('');
const project = ref(null);
const subtitlesContent = ref('');
const subtitleFormat = ref('srt');
const showDeleteConfirm = ref(false);

// ID проекту з параметрів маршруту
const projectId = computed(() => route.params.id);

// Обчислювані властивості для стану проекту
const isCompleted = computed(() => project.value?.status === 'completed');
const isProcessing = computed(() => {
  const status = project.value?.status;
  return status === 'queued' || status === 'processing_online' || status === 'processing_local';
});
const isError = computed(() => project.value?.status === 'error');

// Нові обчислювані властивості для типу файлу
const isAudioFile = computed(() => {
  return project.value?.contentType?.startsWith('audio/');
});
const isVideoFile = computed(() => {
  return project.value?.contentType?.startsWith('video/');
});
const isAudioOrVideoFile = computed(() => {
  return isAudioFile.value || isVideoFile.value;
});

// Завантаження даних проекту
const loadProjectData = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    // Завантажуємо деталі завдання
    const jobResponse = await api.get(`/api/v1/jobs/${projectId.value}`);
    const jobData = jobResponse.data;
    
    // Завантажуємо деталі файлу
    const fileResponse = await api.get(`/api/v1/files/${jobData.fileId}`);
    const fileData = fileResponse.data;
    
    // Об'єднуємо дані для відображення
    project.value = {
      ...jobData,
      ...fileData,
      createdAt: jobData.createdAt
    };
    
    // Якщо проект завершено, завантажуємо результат (субтитри)
    if (isCompleted.value) {
      await loadSubtitlesContent();
      // Також завантажуємо статистику розпізнавання
      await loadProjectStats();
    }
    
  } catch (error) {
    console.error('Помилка при завантаженні даних проекту:', error);
    
    let errorMessage = 'Не вдалося завантажити дані проекту';
    
    if (error.response) {
      if (error.response.status === 404) {
        errorMessage = 'Проект не знайдено';
      } else {
        errorMessage = error.response.data.detail || errorMessage;
      }
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

// Завантаження вмісту субтитрів
const loadSubtitlesContent = async () => {
  if (!projectId.value || !isCompleted.value) return;
  
  try {
    const response = await api.get(`/api/v1/jobs/${projectId.value}/result`);
    subtitlesContent.value = response.data.content;
  } catch (error) {
    console.error('Помилка при завантаженні субтитрів:', error);
    addErrorNotification('Не вдалося завантажити вміст субтитрів', { 
      playSound: true, 
      autoOpen: false 
    });
  }
};

// Оновлена функція для завантаження оригінального файлу
const downloadOriginalFile = async () => {
  if (!project.value || !project.value.fileId) {
    addErrorNotification('Ідентифікатор файлу не знайдено', { 
      playSound: true, 
      autoOpen: false 
    });
    return;
  }
  
  try {
    // Показуємо сповіщення про початок завантаження
    addInfoNotification('Підготовка до завантаження файлу...', { 
      playSound: false, 
      autoOpen: false,
      timeout: 2000
    });
    
    // Варіант 1: Використання axios для прямого завантаження з правильними заголовками
    const response = await api.get(`/api/v1/files/download/${project.value.fileId}`, {
      responseType: 'blob', // Важливо для бінарних даних
      headers: {
        'Accept': '*/*', // Приймаємо будь-який тип контенту
      }
    });
    
    // Отримуємо тип контенту з відповіді
    const contentType = response.headers['content-type'] || 'application/octet-stream';
    const contentDisposition = response.headers['content-disposition'] || '';
    
    // Намагаємося визначити ім'я файлу з заголовків, якщо можливо
    let fileName = project.value.originalFilename || 'media_file';
    const fileNameMatch = contentDisposition.match(/filename=["']?([^"']+)["']?/);
    if (fileNameMatch && fileNameMatch[1]) {
      fileName = fileNameMatch[1];
    }
    
    // Створюємо Blob з правильним типом контенту
    const blob = new Blob([response.data], { type: contentType });
    
    // Створюємо URL і посилання для завантаження
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    
    // Додаємо до документа, імітуємо клік і видаляємо
    document.body.appendChild(link);
    link.click();
    
    // Затримка перед очищенням для гарантованого початку завантаження
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
    
    addSuccessNotification('Завантаження медіафайлу почалося', { 
      playSound: true, 
      autoOpen: false 
    });
    
  } catch (error) {
    console.error('Помилка при завантаженні файлу:', error);
    
    // Детальніша обробка помилок
    let errorMessage = 'Не вдалося завантажити медіафайл';
    
    if (error.response) {
      // Помилка відповіді сервера
      const status = error.response.status;
      if (status === 404) {
        errorMessage = 'Файл не знайдено на сервері';
      } else if (status === 403) {
        errorMessage = 'Немає доступу до файлу';
      } else if (status === 401) {
        errorMessage = 'Потрібна авторизація для завантаження файлу';
        // Можна додати перенаправлення на сторінку авторизації
        // router.push('/login');
      }
    } else if (error.request) {
      // Запит був відправлений, але відповідь не отримана
      errorMessage = 'Сервер не відповідає. Перевірте з\'єднання з мережею';
    }
    
    addErrorNotification(errorMessage, { 
      playSound: true, 
      autoOpen: true 
    });
  }
};

// Додаємо функцію для отримання назви моделі
const getModelName = (modelStr) => {
  if (!modelStr) return 'Стандартна';
  
  if (modelStr.includes('slam_1')) {
    return 'Висока точність (Slam-1)';
  } else if (modelStr.includes('universal')) {
    return 'Середня точність (Universal)';
  } else if (modelStr.includes('nano')) {
    return 'Низька точність (Nano)';
  }
  
  return modelStr;
};

const LANGUAGE_NAMES = {
  "af": "Африкаанс",
  "am": "Амхарська",
  "ar": "Арабська",
  "as": "Ассамська",
  "auto": "Автоматичне визначення",
  "az": "Азербайджанська",
  "ba": "Башкирська",
  "be": "Білоруська",
  "bg": "Болгарська",
  "bn": "Бенгальська",
  "bo": "Тибетська",
  "br": "Бретонська",
  "bs": "Боснійська",
  "ca": "Каталонська",
  "cs": "Чеська",
  "cy": "Валлійська",
  "da": "Данська",
  "de": "Німецька",
  "el": "Грецька",
  "en": "Англійська",
  "en_au": "Англійська (Австралія)",
  "en_uk": "Англійська (Великобританія)",
  "en_us": "Англійська (США)",
  "es": "Іспанська",
  "et": "Естонська",
  "eu": "Баскська",
  "fa": "Перська",
  "fi": "Фінська",
  "fo": "Фарерська",
  "fr": "Французька",
  "gl": "Галісійська",
  "gu": "Гуджараті",
  "ha": "Хауса",
  "haw": "Гавайська",
  "he": "Іврит",
  "hi": "Хінді",
  "hr": "Хорватська",
  "ht": "Гаїтянська креольська",
  "hu": "Угорська",
  "hy": "Вірменська",
  "id": "Індонезійська",
  "is": "Ісландська",
  "it": "Італійська",
  "ja": "Японська",
  "jw": "Яванська",
  "ka": "Грузинська",
  "kk": "Казахська",
  "km": "Кхмерська",
  "kn": "Каннада",
  "ko": "Корейська",
  "la": "Латинська",
  "lb": "Люксембурзька",
  "ln": "Лінгала",
  "lo": "Лаоська",
  "lt": "Литовська",
  "lv": "Латиська",
  "mg": "Малагасійська",
  "mi": "Маорі",
  "mk": "Македонська",
  "ml": "Малаялам",
  "mn": "Монгольська",
  "mr": "Маратхі",
  "ms": "Малайська",
  "mt": "Мальтійська",
  "my": "Бірманська",
  "ne": "Непальська",
  "nl": "Нідерландська",
  "nn": "Норвезька (Нюнорськ)",
  "no": "Норвезька",
  "oc": "Окситанська",
  "pa": "Панджабі",
  "pl": "Польська",
  "ps": "Пушту",
  "pt": "Португальська",
  "ro": "Румунська",
  "ru": "Російська",
  "sa": "Санскрит",
  "sd": "Сіндхі",
  "si": "Сингальська",
  "sk": "Словацька",
  "sl": "Словенська",
  "sn": "Шона",
  "so": "Сомалійська",
  "sq": "Албанська",
  "sr": "Сербська",
  "su": "Сунданська",
  "sv": "Шведська",
  "sw": "Суахілі",
  "ta": "Тамільська",
  "te": "Телугу",
  "tg": "Таджицька",
  "th": "Тайська",
  "tk": "Туркменська",
  "tl": "Тагальська",
  "tr": "Турецька",
  "tt": "Татарська",
  "uk": "Українська",
  "ur": "Урду",
  "uz": "Узбецька",
  "vi": "В'єтнамська",
  "yi": "Їдиш",
  "yo": "Йоруба",
  "zh": "Китайська"
};

const getLanguageName = (languageCode) => {
  return LANGUAGE_NAMES[languageCode] || languageCode || 'Українська';
};

const displayLanguage = computed(() => {
  // Якщо мова була "auto" і проект завершено успішно
  if (project.value?.language === 'auto' && 
      isCompleted.value && 
      project.value?.resultStats?.detected_language) {
    // Повертаємо визначену мову та додаємо інформацію про впевненість
    const detectedLang = project.value.resultStats.detected_language;
    const confidence = project.value.resultStats.language_confidence;
    
    // Повертаємо рядок з інформацією про визначену мову та впевненість
    return {
      code: detectedLang,
      confidence: confidence,
      isDetected: true
    };
  }
  
  // Інакше повертаємо вихідну мову
  return {
    code: project.value?.language || 'uk',
    confidence: null,
    isDetected: false
  };
});

const getLanguageDisplay = (languageInfo) => {
  if (!languageInfo) return 'Українська';
  
  const languageName = LANGUAGE_NAMES[languageInfo.code] || languageInfo.code || 'Українська';
  
  // Якщо це визначена мова, додаємо інформацію про впевненість
  if (languageInfo.isDetected && languageInfo.confidence) {
    // Форматуємо впевненість як відсоток
    const confidencePercent = Math.round(languageInfo.confidence * 100);
    return `${languageName} (визначено, ${confidencePercent}% впевненості)`;
  }
  
  return languageName;
};

const loadProjectStats = async () => {
  if (!projectId.value) return;
  
  try {
    const statsResponse = await api.get(`/api/v1/jobs/${projectId.value}/stats`);
    if (statsResponse.data && statsResponse.data.resultStats) {
      // Оновлюємо проект даними про статистику
      project.value.resultStats = statsResponse.data.resultStats;
      console.log("Updated stats:", project.value.resultStats);
    }
  } catch (error) {
    console.warn("Не вдалося оновити статистику:", error);
    // Не показуємо користувачу помилку, тихо продовжуємо
  }
};

// Додайте ці змінні на рівні компонента після оголошення інших ref
const statsUpdateInterval = ref(null);
const updateIntervalDuration = 5000; // 5 секунд між оновленнями

// Функція для запуску автоматичного оновлення статистики
const startStatsUpdater = () => {
  // Очищаємо попередній інтервал, якщо він існує
  if (statsUpdateInterval.value) {
    clearInterval(statsUpdateInterval.value);
  }
  
  // Встановлюємо новий інтервал, якщо проект знаходиться в обробці
  if (isProcessing.value) {
    console.log("Початок автоматичного оновлення статистики");
    // Спочатку завантажуємо один раз
    loadProjectStats();
    
    // Потім встановлюємо інтервал для регулярного оновлення
    statsUpdateInterval.value = setInterval(() => {
      // Перевіряємо статус обробки перед кожним оновленням
      checkProcessingStatus();
      // Оновлюємо статистику
      loadProjectStats();
    }, updateIntervalDuration);
  }
};

// Функція для зупинки автоматичного оновлення
const stopStatsUpdater = () => {
  if (statsUpdateInterval.value) {
    console.log("Зупинка автоматичного оновлення статистики");
    clearInterval(statsUpdateInterval.value);
    statsUpdateInterval.value = null;
  }
};

// Оновлена функція перевірки статусу
const checkProcessingStatus = async () => {
  if (!projectId.value) return;
  
  try {
    const response = await api.get(`/api/v1/jobs/${projectId.value}/status`);
    const currentStatus = response.data.status;
    
    // Зберігаємо попередній статус для порівняння
    const previousStatus = project.value?.status;
    
    // Оновлюємо статус у об'єкті проекту
    if (project.value) {
      project.value.status = currentStatus;
    }
    
    // Якщо статус змінився з "обробки" на "завершено"
    if (previousStatus !== currentStatus) {
      console.log(`Статус змінився: ${previousStatus} -> ${currentStatus}`);
      
      if (currentStatus === 'completed') {
        await loadProjectData(); // Повне перезавантаження даних проєкту
        addSuccessNotification('Обробка завершена! Субтитри готові до завантаження', { 
          playSound: true, 
          autoOpen: true 
        });
        // Зупиняємо автоматичне оновлення, оскільки проєкт завершений
        stopStatsUpdater();
      } else if (currentStatus === 'error') {
        await loadProjectData();
        addErrorNotification('Помилка обробки. Перевірте деталі проекту', { 
          playSound: true, 
          autoOpen: true 
        });
        // Зупиняємо автоматичне оновлення, оскільки проєкт має помилку
        stopStatsUpdater();
      } else if (currentStatus.includes('processing') && !previousStatus.includes('processing')) {
        // Якщо статус змінився на "processing", починаємо автоматичне оновлення
        startStatsUpdater();
        addInfoNotification('Розпочато обробку проєкту. Статус буде оновлюватися автоматично', { 
          playSound: false, 
          autoOpen: false 
        });
      }
    }
    
  } catch (error) {
    console.error('Помилка при перевірці статусу:', error);
    // Не показуємо користувачу помилку, просто логуємо
  }
};


// Перезапуск обробки (для статусу "error")
const restartProcessing = async () => {
  if (!projectId.value) return;
  
  try {
    // Викликаємо API для перезапуску
    const response = await api.post(`/api/v1/transcribe/restart/${projectId.value}`);
    
    if (response.data && response.data.success) {
      // Оновлюємо дані проекту
      await loadProjectData();
      
      // Показуємо повідомлення про успіх
      addSuccessNotification('Обробку перезапущено успішно', { 
        playSound: true, 
        autoOpen: true 
      });
      
      // Запускаємо оновлення статистики
      startStatsUpdater();
    }
  } catch (error) {
    console.error('Помилка при перезапуску обробки:', error);
    
    let errorMessage = 'Не вдалося перезапустити обробку проекту';
    
    if (error.response) {
      errorMessage = error.response.data.detail || errorMessage;
    }
    
    addErrorNotification(errorMessage, { 
      playSound: true, 
      autoOpen: true 
    });
  }
};

// Завантаження субтитрів
const downloadSubtitles = async () => {
  if (!projectId.value || !isCompleted.value) return;
  
  try {
    const response = await api.get(`/api/v1/jobs/${projectId.value}/result`);
    const content = response.data.content;
    
    // Створюємо blob з вмісту субтитрів
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    // Створюємо тимчасове посилання для завантаження
    const link = document.createElement('a');
    link.href = url;
    
    // Ім'я файлу
    const fileName = project.value.originalFilename || 'subtitles';
    const baseName = fileName.split('.')[0];
    link.download = `${baseName}.${subtitleFormat.value}`;
    
    // Імітуємо клік для завантаження
    document.body.appendChild(link);
    link.click();
    
    // Очищаємо
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
    
    addSuccessNotification(`Субтитри у форматі ${subtitleFormat.value.toUpperCase()} успішно завантажено`, { 
      playSound: true, 
      autoOpen: false 
    });
    
  } catch (error) {
    console.error('Помилка при завантаженні субтитрів:', error);
    addErrorNotification('Не вдалося завантажити субтитри', { 
      playSound: true, 
      autoOpen: false 
    });
  }
};

// Видалення проекту
const deleteProject = async () => {
  if (!projectId.value) return;
  
  try {
    await api.delete(`/api/v1/jobs/${projectId.value}`);
    
    // Закриваємо модальне вікно
    showDeleteConfirm.value = false;
    
    // Показуємо сповіщення
    addSuccessNotification('Проект успішно видалено', { 
      playSound: true, 
      autoOpen: false 
    });
    
    // Перенаправляємо на сторінку з проектами
    router.push('/my-projects');
    
  } catch (error) {
    console.error('Помилка при видаленні проекту:', error);
    
    // Закриваємо модальне вікно
    showDeleteConfirm.value = false;
    
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
  if (!bytes) return 'Невідомо';
  if (bytes === 0) return '0 байтів';
  
  const k = 1024;
  const sizes = ['байтів', 'КБ', 'МБ', 'ГБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatProcessingTime = (seconds) => {
  if (!seconds) return 'Невідомо';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes} хв ${remainingSeconds} сек`;
  } else {
    return `${remainingSeconds} сек`;
  }
};

const getFileType = (contentType) => {
  if (!contentType) return 'Невідомо';
  
  if (contentType.startsWith('audio/')) {
    return 'Аудіо (' + contentType.split('/')[1] + ')';
  } else if (contentType.startsWith('video/')) {
    return 'Відео (' + contentType.split('/')[1] + ')';
  } else {
    return contentType;
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'queued': return 'У черзі';
    case 'processing_online': return 'Обробка (онлайн)';
    case 'processing_local': return 'Обробка (локально)';
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

// Очищаємо інтервал при видаленні компонента
const cleanupBeforeUnmount = () => {
  stopStatsUpdater();
};

// Завантаження даних при створенні компонента
onMounted(() => {
  loadProjectData();
  
  // Встановлюємо обробник події beforeUnmount для очищення інтервалу
  const unload = () => {
    cleanupBeforeUnmount();
  };
  
  window.addEventListener('beforeunload', unload);
  // Повертаємо функцію, яка буде викликана при unmount
  return () => {
    window.removeEventListener('beforeunload', unload);
    cleanupBeforeUnmount();
  };
});

// Відстеження зміни параметра id у URL
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadProjectData();
  }
});

// Відстеження зміни стану проекту для автоматичного завантаження вмісту субтитрів
watch(() => project.value?.status, (newStatus) => {
  if (newStatus === 'completed') {
    loadSubtitlesContent();
  }
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
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
          <span class="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">Новий проект</span>
          <span class="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 transform transition-transform hover:scale-105">
            Створення субтитрів
          </span>
        </h1>
        <p class="text-slate-600 dark:text-slate-400">
          Завантажте відео або аудіо файл для створення субтитрів
        </p>
      </div>

      <!-- Основний вміст -->
      <div class="max-w-4xl mx-auto">
        <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-lg animate-fade-in" style="animation-delay: 0.1s">
          <div class="p-8">
            <!-- Покрокова індикація процесу (модернізована) -->
            <div class="mb-10">
              <div class="flex items-center justify-between">
                <div class="flex flex-col items-center">
                  <div :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md transition-all duration-300',
                    currentStep >= 1 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 scale-110' 
                      : 'bg-slate-300 dark:bg-slate-700'
                  ]">
                    1
                  </div>
                  <div class="text-sm mt-2 font-medium" :class="currentStep >= 1 ? 'text-blue-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'">
                    Завантаження
                  </div>
                </div>
                
                <div class="w-24 sm:w-32 h-1 flex-grow mx-2 rounded-full transition-all duration-700" 
                  :class="currentStep >= 2 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700' 
                    : 'bg-slate-200 dark:bg-slate-700'"></div>
                
                <div class="flex flex-col items-center">
                  <div :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md transition-all duration-300',
                    currentStep >= 2 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 scale-110' 
                      : 'bg-slate-300 dark:bg-slate-700'
                  ]">
                    2
                  </div>
                  <div class="text-sm mt-2 font-medium" :class="currentStep >= 2 ? 'text-blue-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'">
                    Налаштування
                  </div>
                </div>
                
                <div class="w-24 sm:w-32 h-1 flex-grow mx-2 rounded-full transition-all duration-700" 
                  :class="currentStep >= 3 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700' 
                    : 'bg-slate-200 dark:bg-slate-700'"></div>
                
                <div class="flex flex-col items-center">
                  <div :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md transition-all duration-300',
                    currentStep >= 3 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 scale-110' 
                      : 'bg-slate-300 dark:bg-slate-700'
                  ]">
                    3
                  </div>
                  <div class="text-sm mt-2 font-medium" :class="currentStep >= 3 ? 'text-blue-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'">
                    Завершення
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Крок 1: Завантаження файлу (покращений) -->
            <div v-if="currentStep === 1" class="animate-fade-in">
              <div 
                class="border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-all duration-300"
                :class="isDragover 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 transform scale-[1.02] shadow-lg' 
                  : 'border-slate-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/30 dark:hover:bg-blue-900/10'"
                @dragover.prevent="handleDragover"
                @dragleave.prevent="handleDragleave"
                @drop.prevent="handleDrop"
              >
                <div v-if="uploadingFile">
                  <!-- Індикатор завантаження (покращений) -->
                  <div class="relative mb-6">
                    <svg class="animate-spin h-16 w-16 text-blue-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="text-sm font-semibold text-blue-700 dark:text-blue-300">{{ uploadProgress }}%</span>
                    </div>
                  </div>
                  <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Завантаження...</h3>
                  <p class="text-slate-600 dark:text-slate-400">{{ uploadProgressText }}</p>
                </div>
                <div v-else-if="uploadError">
                  <!-- Повідомлення про помилку (покращене) -->
                  <div class="mb-4 text-red-600 dark:text-red-400 animate-pulse">
                    <div class="p-4 bg-red-100 dark:bg-red-900/20 rounded-full inline-flex">
                      <ExclamationCircleIcon class="h-12 w-12" />
                    </div>
                  </div>
                  <h3 class="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Помилка завантаження</h3>
                  <p class="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">{{ uploadError }}</p>
                  <button 
                    @click="resetFileUpload" 
                    class="px-6 py-3 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-700 transition shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
                  >
                    Спробувати знову
                  </button>
                </div>
                <div v-else>
                  <!-- Зона перетягування (покращена) -->
                  <div class="mb-5 text-blue-600 dark:text-indigo-400 transition-transform duration-500 hover:scale-110 transform">
                    <div class="p-6 bg-blue-100 dark:bg-blue-900/30 rounded-full inline-flex shadow-md">
                      <CloudArrowUpIcon class="h-14 w-14" />
                    </div>
                  </div>
                  <h3 class="text-2xl font-semibold text-slate-900 dark:text-white mb-3">Перетягніть файл сюди</h3>
                  <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                    Підтримуються аудіо та відео формати (.mp3, .wav, .mp4, .avi, .mov та інші)
                  </p>
                  <input 
                    ref="fileInput"
                    type="file" 
                    class="hidden" 
                    accept="audio/*,video/*" 
                    @change="handleFileSelect"
                  />
                  <div class="flex items-center gap-4">
                    <div class="w-full h-px bg-slate-200 dark:bg-slate-700"></div>
                    <span class="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">або</span>
                    <div class="w-full h-px bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                  <button 
                    @click="$refs.fileInput.click()" 
                    class="mt-8 px-8 py-3 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-700 transition flex items-center mx-auto shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
                  >
                    <DocumentPlusIcon class="h-5 w-5 mr-2" />
                    Виберіть файл
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Крок 2: Налаштування обробки (покращений) -->
            <div v-if="currentStep === 2" class="animate-fade-in">
              <div class="mb-8">
                <div class="flex items-center bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
                  <CheckCircleIcon class="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <span class="text-lg font-medium text-green-800 dark:text-green-300">Файл успішно завантажено</span>
                    <p class="text-sm text-green-700 dark:text-green-400 mt-0.5">Ваш файл готовий для обробки</p>
                  </div>
                </div>
                <div class="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-5 flex items-center shadow-inner hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                  <div class="w-14 h-14 flex-shrink-0 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <DocumentIcon class="h-8 w-8" />
                  </div>
                  <div class="ml-4 flex-grow">
                    <p class="font-medium text-slate-900 dark:text-white">{{ uploadedFile.filename }}</p>
                    <p class="text-sm text-slate-500 dark:text-slate-400">{{ formatFileSize(uploadedFile.size) }}</p>
                  </div>
                  <button 
                    @click="resetFileUpload" 
                    class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    title="Скасувати та завантажити інший файл"
                  >
                    <TrashIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div class="mb-8">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-5 flex items-center">
                  <CpuChipIcon class="w-6 h-6 mr-2 text-blue-500 dark:text-blue-400" />
                  Виберіть режим обробки
                </h3>
                
                <div class="grid gap-5 md:grid-cols-2">
                  <!-- Режим Онлайн (покращений) -->
                  <div 
                    @click="processingMode = 'online'"
                    class="cursor-pointer rounded-xl p-6 transition-all duration-300 transform flex flex-col"
                    :class="processingMode === 'online' 
                      ? 'border-2 border-blue-500 dark:border-indigo-500 shadow-lg bg-blue-50 dark:bg-indigo-900/10 hover:-translate-y-1' 
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 hover:-translate-y-1 hover:shadow-md'"
                  >
                    <div class="flex items-start mb-4">
                      <div class="w-6 h-6 rounded-full border-2 flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center transition-all duration-300" 
                           :class="processingMode === 'online' 
                             ? 'border-blue-500 dark:border-indigo-500 bg-blue-500/10 dark:bg-indigo-500/10' 
                             : 'border-slate-300 dark:border-slate-600'"
                      >
                        <div v-if="processingMode === 'online'" class="w-3 h-3 rounded-full bg-blue-500 dark:bg-indigo-500"></div>
                      </div>
                      <div>
                        <div class="flex items-center">
                          <h4 class="text-lg font-semibold text-slate-900 dark:text-white">Онлайн обробка</h4>
                          <div class="ml-2 px-2 py-0.5 text-xs font-medium text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-900/30 rounded-full shadow-sm">
                            Рекомендовано
                          </div>
                        </div>
                        <p class="text-slate-600 dark:text-slate-300 text-sm mt-1">
                          Використовуємо AssemblyAI для транскрипції. Найкраща якість та підтримка багатьох мов.
                        </p>
                      </div>
                    </div>
                    
                    <div v-if="!hasAssemblyAIKey && processingMode === 'online'" class="mt-3 text-sm text-amber-600 dark:text-amber-400 flex items-center p-2 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                      <ExclamationTriangleIcon class="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>Потрібно додати API-ключ AssemblyAI в налаштуваннях</span>
                    </div>
                    
                    <!-- Логотип AssemblyAI -->
                    <div class="flex justify-end mt-auto pt-3">
                      <img src="@/assets/assemblyai.svg" alt="AssemblyAI" class="h-5 opacity-70 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  
                  <!-- Режим Офлайн (покращений) -->
                  <div 
                    @click="handleOfflineSelect"
                    class="cursor-pointer rounded-xl p-6 transition-all duration-300 transform flex flex-col"
                    :class="[
                      processingMode === 'offline' 
                        ? 'border-2 border-purple-500 dark:border-purple-500 shadow-lg bg-purple-50 dark:bg-purple-900/10 hover:-translate-y-1' 
                        : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 hover:-translate-y-1 hover:shadow-md',
                      {'opacity-60 cursor-not-allowed': !isOfflineEnabled}
                    ]"
                  >
                    <div class="flex items-start mb-4">
                      <div class="w-6 h-6 rounded-full border-2 flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center transition-all duration-300" 
                           :class="processingMode === 'offline' 
                             ? 'border-purple-500 dark:border-purple-500 bg-purple-500/10 dark:bg-purple-500/10' 
                             : 'border-slate-300 dark:border-slate-600'"
                      >
                        <div v-if="processingMode === 'offline'" class="w-3 h-3 rounded-full bg-purple-500 dark:bg-purple-500"></div>
                      </div>
                      <div>
                        <div class="flex items-center">
                          <h4 class="text-lg font-semibold text-slate-900 dark:text-white">Локальна обробка</h4>
                          <div class="ml-2 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/30 rounded-full shadow-sm">
                            Незабаром
                          </div>
                        </div>
                        <p class="text-slate-600 dark:text-slate-300 text-sm mt-1">
                          Використання локальних ресурсів вашого комп'ютера для обробки з FasterWhisper.
                        </p>
                      </div>
                    </div>
                    
                    <!-- Іконка локальної обробки -->
                    <div class="flex justify-end mt-auto pt-3">
                      <ComputerDesktopIcon class="h-5 w-5 text-slate-400 dark:text-slate-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Додаткові налаштування (мова, точність, тощо) - оновлений дизайн -->
              <div class="mb-8" v-if="processingMode === 'online'">
                <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 p-6 transition-all duration-300 hover:shadow-lg">
                  <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                    <AdjustmentsHorizontalIcon class="w-6 h-6 mr-2 text-blue-500 dark:text-blue-400" />
                    Додаткові налаштування
                  </h3>
                  
                  <div class="space-y-6">
                    <!-- Селектор мови (оновлений) -->
                    <div class="group bg-slate-50 dark:bg-slate-700/30 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 transform">
                      <label for="language" class="text-base font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                        <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3 text-blue-600 dark:text-blue-400">
                          <LanguageIcon class="w-5 h-5" />
                        </div>
                        Мова оригіналу
                      </label>
                      <div class="relative">
                        <select 
                          id="language" 
                          v-model="language" 
                          class="block w-full rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 border border-slate-200 dark:border-slate-600 py-3 px-4 appearance-none"
                        >
                          <option 
                            v-for="lang in availableLanguages" 
                            :key="lang.code" 
                            :value="lang.code"
                          >
                            {{ lang.name }}
                          </option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                          <ChevronDownIcon class="h-5 w-5" />
                        </div>
                      </div>
                      <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <InformationCircleIcon class="w-4 h-4 inline mr-1" />
                        Виберіть основну мову вашого аудіо або відео файлу для підвищення точності
                      </p>
                      
                      <!-- Попередження про несумісність мови з моделлю -->
                      <div 
                        v-if="showLanguageWarning" 
                        class="mt-3 py-2 px-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-700 dark:text-amber-300 text-sm animate-fade-in"
                      >
                        <div class="flex items-start">
                          <ExclamationTriangleIcon class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{{ languageWarningMessage }}</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Налаштування точності (значно покращене) -->
                    <div class="group bg-slate-50 dark:bg-slate-700/30 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1 transform">
                        <label for="accuracy" class=" text-base font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center">
                            <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3 text-indigo-600 dark:text-indigo-400">
                            <ScaleIcon class="w-5 h-5" />
                            </div>
                            Модель транскрипції
                        </label>
                        <div class="relative">
                            <select 
                            id="accuracy" 
                            v-model="accuracy" 
                            class=" w-full rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 border border-slate-200 dark:border-slate-600 py-3 px-4 appearance-none"
                            >
                            <option value="high">Slam-1 (найвища точність, тільки англійська)</option>
                            <option value="medium">Universal (рекомендовано, багатомовна)</option>
                            <option value="low">Nano (економна, найбільше мов)</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                            <ChevronDownIcon class="h-5 w-5" />
                            </div>
                        </div>
                        
                        <div class="mt-4 text-sm text-slate-600 dark:text-slate-400">
                            <div v-if="accuracy === 'high'" class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <p class="font-medium mb-1 text-blue-700 dark:text-blue-300 flex items-center">
                                <InformationCircleIcon class="w-4 h-4 mr-1" />
                                Модель Slam-1
                              </p>
                              <p class="mb-2">Найбільш точна модель для контенту англійською мовою. Підтримує тонке налаштування та персоналізацію через промпти.</p>
                              <p class="text-xs flex items-center text-amber-600 dark:text-amber-400">
                                <ExclamationTriangleIcon class="w-4 h-4 mr-1" />
                                Увага: Ця модель підтримує тільки англійську мову.
                              </p>
                            </div>
                            
                            <div v-else-if="accuracy === 'medium'" class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <p class="font-medium mb-1 text-green-700 dark:text-green-300 flex items-center">
                                <InformationCircleIcon class="w-4 h-4 mr-1" />
                                Модель Universal
                              </p>
                              <p>Найкраще співвідношення точності до затримки з підтримкою багатьох мов. Швидка та надійна з відмінними результатами для більшості мов, включаючи українську.</p>
                              <p class="text-xs mt-2">Підтримує близько 20 мов, включаючи: українську, англійську, іспанську, французьку, німецьку, італійську, португальську, російську, китайську та інші.</p>
                            </div>
                            
                            <div v-else-if="accuracy === 'low'" class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                              <p class="font-medium mb-1 text-purple-700 dark:text-purple-300 flex items-center">
                                <InformationCircleIcon class="w-4 h-4 mr-1" />
                                Модель Nano
                              </p>
                              <p>Найбільш економічний варіант з найширшою підтримкою мов (понад 90 мов). Підходить для проектів, де важливе охоплення різних мов та економічність.</p>
                            </div>
                        </div>
                        
                        <p class="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center">
                            <InformationCircleIcon class="w-4 h-4 mr-1" />
                            Виберіть модель відповідно до ваших потреб щодо точності, швидкості та підтримки мов
                        </p>
                        </div>
                  </div>
                </div>
              </div>
              
              <!-- Повідомлення про необхідність ключа AssemblyAI (покращене) -->
              <div 
                v-if="processingMode === 'online' && !hasAssemblyAIKey" 
                class="mb-8 p-5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-800 dark:text-amber-300 flex shadow-sm"
              >
                <div class="p-2 rounded-full bg-amber-100 dark:bg-amber-800/40 mr-3 h-fit">
                  <ExclamationTriangleIcon class="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p class="font-medium">Відсутній API-ключ AssemblyAI</p>
                  <p class="text-sm mt-1">Для використання онлайн-обробки потрібно додати ключ API в налаштуваннях.</p>
                  <router-link 
                    to="/settings"
                    class="inline-block mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline px-4 py-1.5 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <CogIcon class="w-4 h-4 inline mr-1" />
                    Перейти до налаштувань
                  </router-link>
                </div>
              </div>
              
              <div class="flex justify-between space-x-4 pt-2">
                <button 
                  @click="currentStep = 1"
                  class="px-5 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition flex items-center shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <ArrowLeftIcon class="h-5 w-5 mr-2" />
                  Назад
                </button>
                
                <button 
                  @click="handleProcessing"
                  :disabled="processingDisabled"
                  class="group px-6 py-3 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-700 transition flex items-center disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 disabled:hover:transform-none"
                >
                  <span>Розпочати обробку</span>
                  <ArrowRightIcon class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <!-- Крок 3: Завершення та перенаправлення (покращений) -->
            <div v-if="currentStep === 3" class="animate-fade-in">
              <div class="text-center py-12">
                <div v-if="processingError" class="mb-8">
                  <div class="mb-6 flex justify-center">
                    <div class="p-5 bg-red-100 dark:bg-red-900/20 rounded-full inline-flex items-center justify-center animate-pulse">
                      <ExclamationCircleIcon class="h-16 w-16 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <h3 class="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">Виникла помилка</h3>
                  <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">{{ processingError }}</p>
                  <div class="flex justify-center space-x-4">
                    <button 
                      @click="currentStep = 2"
                      class="px-5 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition flex items-center shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    >
                      <ArrowLeftIcon class="h-5 w-5 mr-2" />
                      Назад
                    </button>
                    <button 
                      @click="resetProcess"
                      class="px-5 py-2.5 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <ArrowPathIcon class="h-5 w-5 mr-2 inline" />
                      Спробувати знову
                    </button>
                  </div>
                </div>
                <div v-else-if="jobCreated" class="mb-4">
                  <div class="mb-6 flex justify-center">
                    <div class="p-5 bg-green-100 dark:bg-green-900/20 rounded-full inline-flex items-center justify-center">
                      <CheckCircleIcon class="h-16 w-16 text-green-500 dark:text-green-400 animate-bounce" />
                    </div>
                  </div>
                  <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">Проект створено!</h3>
                  <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">Ваш файл успішно завантажено та поставлено в чергу на обробку.</p>
                  <div class="flex justify-center space-x-4">
                    <button 
                      @click="navigateToAllProjects"
                      class="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                    >
                      <DocumentDuplicateIcon class="h-5 w-5 mr-2 inline" />
                      Всі проекти
                    </button>
                    <button 
                      @click="navigateToJobDetails"
                      class="px-6 py-3 bg-blue-600 dark:bg-indigo-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <ArrowRightCircleIcon class="h-5 w-5 mr-2 inline" />
                      Перейти до деталей проекту
                    </button>
                  </div>
                </div>
                <div v-else>
                  <div class="mb-8 flex justify-center">
                    <div class="relative">
                      <svg class="animate-spin h-20 w-20 text-blue-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <div class="h-10 w-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
                          <span class="text-sm font-semibold text-blue-600 dark:text-indigo-400">
                            <CpuChipIcon class="h-5 w-5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">Обробка...</h3>
                  <p class="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Створюємо проект та налаштовуємо обробку файлу. Це може зайняти кілька секунд.
                  </p>
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
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotifications } from '@/composables/useNotifications';
import api from '@/services/api';
import {
  CloudArrowUpIcon,
  DocumentPlusIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  DocumentIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ComputerDesktopIcon,
  ArrowPathIcon,
  ArrowRightCircleIcon,
  AdjustmentsHorizontalIcon,
  CpuChipIcon,
  LanguageIcon,
  ScaleIcon,
  CogIcon,
  DocumentDuplicateIcon,
  InformationCircleIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();
const { addSuccessNotification, addErrorNotification, addInfoNotification } = useNotifications();

// Стан процесу
const currentStep = ref(1);
const fileInput = ref(null);

// Стан завантаження файлу
const isDragover = ref(false);
const uploadingFile = ref(false);
const uploadProgress = ref(0);
const uploadError = ref('');
const uploadedFile = ref(null);
const uploadedFileMetadata = ref(null);

// Стан налаштувань
const processingMode = ref('online');
const language = ref('uk');
const accuracy = ref('medium');
const hasAssemblyAIKey = ref(false);
const isOfflineEnabled = ref(false); // Відключено, поки не реалізовано

// Підтримувані мови для кожної моделі
const SLAM_1_SUPPORTED_LANGUAGES = ["en", "en_au", "en_uk", "en_us"];

const UNIVERSAL_SUPPORTED_LANGUAGES = [
  "en", "en_au", "en_uk", "en_us", "es", "fr", "de", "it", "pt", "nl", 
  "hi", "ja", "zh", "fi", "ko", "pl", "ru", "tr", "uk", "vi", "auto"
];

const NANO_SUPPORTED_LANGUAGES = [
  "en", "en_au", "en_uk", "en_us", "es", "fr", "de", "it", "pt", "nl", "af", "sq", "am", "ar", "hy", "as",
  "az", "ba", "eu", "be", "bn", "bs", "br", "bg", "my", "ca", "zh", "hr", "cs",
  "da", "et", "fo", "fi", "gl", "ka", "el", "gu", "ht", "ha", "haw", "he", "hi",
  "hu", "is", "id", "ja", "jw", "kn", "kk", "km", "ko", "lo", "la", "lv", "ln",
  "lt", "lb", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn", "ne", "no", "nn",
  "oc", "pa", "ps", "fa", "pl", "ro", "ru", "sa", "sr", "sn", "sd", "si", "sk",
  "sl", "so", "su", "sw", "sv", "tl", "tg", "ta", "tt", "te", "th", "bo", "tr",
  "tk", "uk", "ur", "uz", "vi", "cy", "yi", "yo", "auto"
];

// Відображення кодів мов на назви мов українською
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
// Головні мови, які варто показувати у верхній частині списку
const MAIN_LANGUAGES = ["uk", "en", "pl", "de", "fr", "es", "ru", "auto"];

// Реактивні змінні для списку мов та модальності попередження
const availableLanguages = ref([]);
const showLanguageWarning = ref(false);
const languageWarningMessage = ref('');

// Стан створення завдання
const jobCreated = ref(false);
const processingError = ref('');
const createdJobId = ref(null);

// Змінна для відстеження інтервалу автоматичного очищення
let cleanupInterval = null;

// Функція, яка оновлює список доступних мов на основі обраної моделі
const updateAvailableLanguages = () => {
  let supportedLanguages = [];
  
  // Визначаємо список підтримуваних мов для обраної моделі
  if (accuracy.value === "high") {
    supportedLanguages = SLAM_1_SUPPORTED_LANGUAGES;
  } else if (accuracy.value === "medium") {
    supportedLanguages = UNIVERSAL_SUPPORTED_LANGUAGES;
  } else if (accuracy.value === "low") {
    supportedLanguages = NANO_SUPPORTED_LANGUAGES;
  }
  
  // Перевіряємо, чи обрана мова підтримується новою моделлю
  if (!supportedLanguages.includes(language.value)) {
    // Показуємо попередження та змінюємо обрану мову на підтримувану
    showLanguageWarning.value = true;
    const oldLanguageName = LANGUAGE_NAMES[language.value] || language.value;
    
    // Змінюємо на автоматичне визначення, яке підтримують всі моделі
    language.value = "auto";
    
    languageWarningMessage.value = `Мова "${oldLanguageName}" не підтримується обраною моделлю. Вибір мови змінено на "Автоматичне визначення".`;
    
    // Ховаємо попередження після 2 секунд
    setTimeout(() => {
      showLanguageWarning.value = false;
    }, 2000);
  }
  
  // Створюємо масив об'єктів для селекту мов
  // Спочатку додаємо головні мови у верхній частині списку
  availableLanguages.value = [];
  
  // Додаємо головні мови, якщо вони підтримуються
  MAIN_LANGUAGES.forEach(code => {
    if (supportedLanguages.includes(code)) {
      availableLanguages.value.push({
        code,
        name: LANGUAGE_NAMES[code] || code
      });
    }
  });
  
  // Додаємо роздільник, якщо є інші мови
  const otherLanguages = supportedLanguages.filter(
    code => !MAIN_LANGUAGES.includes(code) && code !== "auto"
  );
  
  if (otherLanguages.length > 0) {
    // Додаємо інші мови в алфавітному порядку
    otherLanguages.sort((a, b) => {
      const nameA = LANGUAGE_NAMES[a] || a;
      const nameB = LANGUAGE_NAMES[b] || b;
      return nameA.localeCompare(nameB);
    }).forEach(code => {
      availableLanguages.value.push({
        code,
        name: LANGUAGE_NAMES[code] || code
      });
    });
  }
};

// Текст прогресу завантаження
const uploadProgressText = computed(() => {
  if (uploadProgress.value === 0) return 'Підготовка...';
  if (uploadProgress.value === 100) return 'Завершення...';
  return `${uploadProgress.value}% завантажено`;
});

// Чи можна розпочати обробку
const processingDisabled = computed(() => {
  if (processingMode.value === 'online' && !hasAssemblyAIKey.value) return true;
  if (processingMode.value === 'offline' && !isOfflineEnabled.value) return true;
  return false;
});

// Обробники для перетягування
const handleDragover = (event) => {
  isDragover.value = true;
};

const handleDragleave = (event) => {
  isDragover.value = false;
};

const handleDrop = (event) => {
  isDragover.value = false;
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    handleFileUpload(files[0]);
  }
};

// Обробник вибору файлу через діалог
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    handleFileUpload(file);
  }
};

// Обробка завантаження файлу
const handleFileUpload = async (file) => {
  // Перевірка типу файлу
  if (!file.type.startsWith('audio/') && !file.type.startsWith('video/')) {
    uploadError.value = 'Дозволені тільки аудіо та відео файли';
    return;
  }
  
  // Перевірка розміру файлу (обмежимо 500MB)
  const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
  if (file.size > MAX_FILE_SIZE) {
    uploadError.value = 'Розмір файлу не повинен перевищувати 500MB';
    return;
  }
  
  // Спочатку очищаємо невикористані файли перед завантаженням нового
  await cleanupUnusedFiles();
  
  // Почати завантаження
  uploadingFile.value = true;
  uploadProgress.value = 0;
  uploadError.value = '';
  
  try {
    // Створення FormData для відправки файлу
    const formData = new FormData();
    formData.append('file', file);
    
    // Відправка файлу з відстеженням прогресу
    const response = await api.post('/api/v1/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
      }
    });
    
    // Зберігаємо дані файлу та метадані
    uploadedFile.value = {
      filename: file.name,
      type: file.type,
      size: file.size
    };
    
    uploadedFileMetadata.value = response.data;
    
    // Переходимо до наступного кроку
    currentStep.value = 2;
    
    // Показуємо сповіщення про успіх
    addSuccessNotification('Файл успішно завантажено', { 
      playSound: true, 
      autoOpen: false 
    });
    
  } catch (error) {
    console.error('Помилка при завантаженні файлу:', error);
    
    // Формуємо повідомлення про помилку
    let errorMessage = 'Не вдалося завантажити файл';
    
    if (error.response) {
      errorMessage = error.response.data.detail || errorMessage;
    } else if (error.request) {
      errorMessage = 'Сервер не відповідає. Перевірте з\'єднання з інтернетом';
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    uploadError.value = errorMessage;
    addErrorNotification(errorMessage, { 
      playSound: true, 
      autoOpen: false 
    });
  } finally {
    uploadingFile.value = false;
  }
};

// Обробник натискання на режим "офлайн"
const handleOfflineSelect = () => {
  if (!isOfflineEnabled.value) {
    addInfoNotification('Локальна обробка буде доступна у наступних оновленнях', { 
      playSound: true, 
      autoOpen: false 
    });
  } else {
    processingMode.value = 'offline';
  }
};

// Функція для очищення невикористаних файлів
const cleanupUnusedFiles = async () => {
  try {
    console.log('Очищення невикористаних файлів...');
    const response = await api.post('/api/v1/files/cleanup-unused');
    
    if (response.data.deleted_count > 0) {
      console.log(`Видалено ${response.data.deleted_count} невикористаних файлів`);
    } else {
      console.log('Невикористаних файлів не знайдено');
    }
    
    return response.data;
  } catch (error) {
    console.error('Помилка при очищенні невикористаних файлів:', error);
    return { deleted_count: 0 };
  }
};

// Скидання завантаження файлу
const resetFileUpload = async () => {
  // Запускаємо очищення перед скиданням стану
  if (uploadedFileMetadata.value) {
    uploadingFile.value = true;
    try {
      const result = await cleanupUnusedFiles();
      if (result.deleted_count > 0) {
        addInfoNotification(`Видалено невикористані файли (${result.deleted_count})`, {
          playSound: false,
          autoOpen: false
        });
      }
    } catch (error) {
      console.error('Помилка при очищенні невикористаних файлів:', error);
    } finally {
      uploadingFile.value = false;
    }
  }
  
  // Скидаємо стан компонента
  uploadedFile.value = null;
  uploadedFileMetadata.value = null;
  uploadProgress.value = 0;
  uploadError.value = '';
  currentStep.value = 1;
  
  // Очищаємо input файл
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

// Запуск обробки файлу
const handleProcessing = async () => {
  if (!uploadedFileMetadata.value) {
    addErrorNotification('Помилка: файл не завантажено', { 
      playSound: true,
      autoOpen: false 
    });
    return;
  }
  
  // Переходимо до третього кроку
  currentStep.value = 3;
  jobCreated.value = false;
  processingError.value = '';
  
  try {
    // Створюємо завдання на обробку
    const jobData = {
      fileId: uploadedFileMetadata.value._id,
      mode: processingMode.value,
      language: language.value, // Додаємо мову до запиту
      accuracy: accuracy.value // Додаємо точність до запиту
    };
    
    const response = await api.post('/api/v1/jobs/', jobData);
    
    // Зберігаємо ID створеного завдання
    createdJobId.value = response.data._id;
    jobCreated.value = true;
    
    // Показуємо сповіщення про успіх
    addSuccessNotification('Проект успішно створено', { 
      playSound: true, 
      autoOpen: false 
    });
    
  } catch (error) {
    console.error('Помилка при створенні завдання:', error);
    
    // Формуємо повідомлення про помилку
    let errorMessage = 'Не вдалося створити завдання';
    
    if (error.response) {
      errorMessage = error.response.data.detail || errorMessage;
    } else if (error.request) {
      errorMessage = 'Сервер не відповідає. Перевірте з\'єднання з інтернетом';
    } else {
      errorMessage = error.message || errorMessage;
    }
    
    processingError.value = errorMessage;
    addErrorNotification(errorMessage, { 
      playSound: true, 
      autoOpen: false 
    });
    
    // Очищення невикористаного файлу у випадку помилки
    try {
      await cleanupUnusedFiles();
    } catch (cleanupError) {
      console.error('Помилка очищення файлу після невдачі:', cleanupError);
    }
  }
};

// Форматування розміру файлу
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 байтів';
  
  const k = 1024;
  const sizes = ['байтів', 'КБ', 'МБ', 'ГБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Скидання всього процесу
const resetProcess = async () => {
  await resetFileUpload();
  processingMode.value = 'online';
  language.value = 'uk';
  accuracy.value = 'medium';
  jobCreated.value = false;
  processingError.value = '';
  createdJobId.value = null;
  currentStep.value = 1;
};

// Навігація до списку всіх проектів
const navigateToAllProjects = () => {
  router.push('/my-projects');
};

// Навігація до створеного проекту
const navigateToJobDetails = () => {
  if (createdJobId.value) {
    router.push(`/projects/${createdJobId.value}`);
  } else {
    navigateToAllProjects();
  }
};

// Перевірка наявності API ключа AssemblyAI
const checkAssemblyAIKey = async () => {
  try {
    const response = await api.get('/api/v1/users/api-keys/assemblyai');
    hasAssemblyAIKey.value = response.data.valid;
  } catch (error) {
    // Якщо отримали 404, ключа немає
    if (error.response && error.response.status === 404) {
      hasAssemblyAIKey.value = false;
    } else {
      console.error('Помилка при перевірці API ключа:', error);
      hasAssemblyAIKey.value = false;
    }
  }
};

// Функція для автоматичного очищення невикористаних файлів
const startPeriodicCleanup = () => {
  // Очищаємо кожні 5 хвилин, якщо сторінка відкрита і є завантажений файл
  cleanupInterval = setInterval(async () => {
    if (uploadedFileMetadata.value && !jobCreated.value) {
      try {
        const response = await cleanupUnusedFiles();
        if (response.deleted_count > 0) {
          console.log(`Періодичне очищення: видалено ${response.deleted_count} файлів`);
        }
      } catch (error) {
        console.error('Помилка періодичного очищення:', error);
      }
    }
  }, 300000); // 5 хвилин = 300000 мс
};

// Обробник події beforeUnload
const setupBeforeUnloadHandler = () => {
  window.addEventListener('beforeunload', cleanupBeforeUnload);
};

const cleanupBeforeUnload = (event) => {
  // Якщо є завантажений файл, але не створено job, потрібно викликати очищення
  // Але в обробнику beforeUnload не можна виконувати асинхронні запити
  // Тому просто встановлюємо маркер, що сторінка закривається
  // А через такий прапорець можна передати інформацію на сервер
  if (uploadedFileMetadata.value && !jobCreated.value) {
    try {
      // Створюємо синхронний XMLHttpRequest
      const request = new XMLHttpRequest();
      request.open('POST', '/api/v1/files/cleanup-unused', false); // 'false' робить запит синхронним
      
      // Додаємо заголовок авторизації
      const token = localStorage.getItem('token');
      if (token) {
        request.setRequestHeader('Authorization', `Bearer ${token}`);
      }
      
      request.setRequestHeader('Content-Type', 'application/json');
      request.send();
      
      console.log('Відправлено запит на очищення файлів перед закриттям сторінки');
    } catch (error) {
      console.error('Помилка при відправці запиту очищення файлів:', error);
    }
  }
};

// Додаємо watcher для відстеження змін моделі (accuracy)
watch(accuracy, () => {
  updateAvailableLanguages();
});

// Ініціалізація компонента
onMounted(async () => {
  // Перевіряємо наявність API ключа
  await checkAssemblyAIKey();
  
  // Початкове очищення невикористаних файлів
  await cleanupUnusedFiles();
  
  // Встановлюємо обробник beforeUnload
  setupBeforeUnloadHandler();
  
  // Запускаємо періодичне очищення
  startPeriodicCleanup();

  // Ініціалізуємо список доступних мов
  updateAvailableLanguages();
});

// Очищення при unmount компонента
onBeforeUnmount(() => {
  console.log('onBeforeUnmount: очищення ресурсів компонента NewProjectView');
  
  // Зупиняємо інтервал очищення
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
  
  // Видаляємо обробник beforeUnload
  window.removeEventListener('beforeunload', cleanupBeforeUnload);
  
  // Якщо є невикористаний файл - очищуємо
  if (uploadedFileMetadata.value && !jobCreated.value) {
    cleanupUnusedFiles().catch(error => 
      console.error('Помилка фінального очищення при unmount:', error)
    );
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

/* Анімація для кнопок */
button:not(:disabled):active {
  transform: translateY(1px);
}

/* Стилізація для радіо-кнопок опцій */
input[type="radio"]:checked + label {
  background-color: rgba(37, 99, 235, 0.1);
  border-color: rgba(37, 99, 235);
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>
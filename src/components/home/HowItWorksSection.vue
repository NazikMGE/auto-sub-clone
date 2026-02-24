<template>
  <section id="how-it-works-section" class="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <div class="main-container">
      <div class="text-center mb-14 md:mb-20">
        <span class="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-indigo-400 mb-2 block">Як Це Працює</span>
        <h2 class="section-title">
          Два <span class="text-blue-600 dark:text-indigo-400">інноваційних</span> підходи до створення субтитрів
        </h2>
        <p class="section-subtitle mt-4">
          Оберіть той, що найкраще відповідає вашим потребам: швидкість та зручність хмарних технологій або повний контроль та потужність локальної обробки.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        <div class="bg-white dark:bg-slate-800/70 rounded-xl shadow-2xl p-6 md:p-10 flex flex-col transform transition-all hover:scale-[1.03] duration-300 border border-transparent hover:border-blue-500 dark:hover:border-indigo-500">
          <div class="mb-5 flex flex-col items-center text-center md:items-start md:text-left"> <img :src="assemblyAiLogoUrl" alt="AssemblyAI Logo" class="h-12 w-auto mb-4"> <h3 class="text-2xl font-bold text-slate-900 dark:text-white">Онлайн з AssemblyAI</h3>
          </div>
          <p class="text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
            Інтеграція з передовим API AssemblyAI для максимально точного та швидкого розпізнавання мови. Ідеально для миттєвої обробки ваших файлів безпосередньо на сайті.
          </p>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>Найвища точність транскрипції</li>
            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>Підтримка широкого спектру мов</li>
            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>Простий інтерфейс: завантажуйте або надавайте URL</li>
          </ul>
        </div>

        <div class="bg-white dark:bg-slate-800/70 rounded-xl shadow-2xl p-6 md:p-10 flex flex-col transform transition-all hover:scale-[1.03] duration-300 border border-transparent hover:border-purple-500 dark:hover:border-purple-500">
           <div class="mb-5 flex flex-col items-center text-center md:items-start md:text-left"> <div class="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white mb-4 shadow-lg">
                <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white">Локально з FasterWhisper
              <span class="ml-2 inline-block text-xs uppercase font-bold bg-yellow-400 text-yellow-800 dark:bg-yellow-500 dark:text-yellow-900 px-2.5 py-1 rounded-full align-middle">Незабаром</span>
            </h3>
          </div>
          <p class="text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
            Для тих, хто цінує максимальну продуктивність та приватність, ми готуємо десктопний додаток. Він використовуватиме потужність вашого CPU/GPU для генерації субтитрів.
          </p>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>Повний контроль над даними</li>
            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>Оптимізовано для GPU прискорення</li>
            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>Зручне керування через веб-інтерфейс</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import assemblyAiLogoUrl from '@/assets/assemblyai.svg';
</script>
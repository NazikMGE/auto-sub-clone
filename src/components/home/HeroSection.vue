<template>
  <section class="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 dark:from-blue-700 dark:via-indigo-800 dark:to-purple-900 text-white overflow-hidden">
    <div class="absolute inset-0 opacity-5 mix-blend-overlay">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="subtleGrid" patternUnits="userSpaceOnUse" width="30" height="30" patternTransform="scale(1) rotate(0)">
            <path d="M0 10h30M10 0v30" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subtleGrid)"/>
      </svg>
    </div>
    <div class="main-container text-center relative z-10">
      <!-- Різний заголовок для авторизованих та неавторизованих користувачів -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter mb-6 leading-tight animate-fade-in-down" style="animation-delay: 0.2s;">
        <template v-if="isLoggedIn">
          Вітаємо, <span class="text-yellow-300">{{ userName }}</span>!
        </template>
        <template v-else>
          Субтитри <span class="text-yellow-300">просто</span> як ніколи.
        </template>
      </h1>

      <!-- Різний підзаголовок для авторизованих та неавторизованих користувачів -->
      <p class="text-lg sm:text-xl lg:text-2xl text-blue-100 dark:text-indigo-100 max-w-3xl mx-auto mb-10 animate-fade-in-up" style="animation-delay: 0.4s;">
        <template v-if="isLoggedIn">
          Продовжуйте роботу з вашими проектами або створіть новий проект для автоматичного створення субтитрів.
        </template>
        <template v-else>
          З AutoSubtitles ваш відео та аудіо контент стане доступним для всіх. Швидко, точно та сучасно.
        </template>
      </p>

      <!-- Різні кнопки дій для авторизованих та неавторизованих користувачів -->
      <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up" style="animation-delay: 0.6s;">
        <template v-if="isLoggedIn">
          <BaseButton variant="primary" size="lg" @click="navigateToDashboard" class="bg-white hover:bg-slate-100 text-blue-700 dark:text-indigo-700 dark:bg-slate-50 dark:hover:bg-slate-200 shadow-xl !px-10 !py-4 text-lg">
            Панель керування
            <template #iconRight>
              <ArrowRightIcon class="ml-2 -mr-1 h-5 w-5" />
            </template>
          </BaseButton>
          <BaseButton variant="primary" size="lg" @click="navigateToNewProject" class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl !px-10 !py-4 text-lg">
            Новий проект
            <template #iconRight>
              <PlusIcon class="ml-2 -mr-1 h-5 w-5" />
            </template>
          </BaseButton>
        </template>
        <template v-else>
          <BaseButton variant="primary" size="lg" @click="navigateToRegister" class="bg-white hover:bg-slate-100 text-blue-700 dark:text-indigo-700 dark:bg-slate-50 dark:hover:bg-slate-200 shadow-xl !px-10 !py-4 text-lg">
            Почати Зараз
            <template #iconRight>
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 -mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </template>
          </BaseButton>
          <BaseButton variant="ghost" size="lg" @click="scrollToHowItWorks" class="text-white hover:bg-white/10 dark:hover:bg-white/5 !px-10 !py-4 text-lg border border-white/30 hover:border-white/50">
            Дізнатися більше
          </BaseButton>
        </template>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent z-0"></div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseButton from '../ui/BaseButton.vue';
import {
  ArrowRightIcon,
  PlusIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

// Обчислювані властивості для перевірки авторизації та отримання імені користувача
const isLoggedIn = computed(() => authStore.isAuthenticated);
const userName = computed(() => {
  if (authStore.user?.first_name) return authStore.user.first_name;
  if (authStore.user?.full_name) return authStore.user.full_name;
  if (authStore.user?.name) return authStore.user.name;
  if (authStore.user?.email) return authStore.user.email.split('@')[0];
  return 'користувач';
});

// Функції для навігації
const navigateToRegister = () => {
  router.push('/register');
};

const navigateToDashboard = () => {
  router.push('/dashboard');
};

const navigateToNewProject = () => {
  router.push('/projects/new');
};

const scrollToHowItWorks = () => {
  const element = document.getElementById('how-it-works-section');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<style scoped>
/* Прості анімації для появи */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; }
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
</style>
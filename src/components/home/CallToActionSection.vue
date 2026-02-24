<template>
  <section class="bg-gradient-to-r from-slate-800 via-slate-900 to-black dark:from-slate-900 dark:via-black dark:to-black py-16 md:py-24">
    <div class="main-container text-center">
      <!-- Різний заголовок для авторизованих та неавторизованих користувачів -->
      <h2 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
        <template v-if="isLoggedIn">
          Готові Оптимізувати Ваш Робочий Процес?
        </template>
        <template v-else>
          Готові Трансформувати Ваш Контент?
        </template>
      </h2>

      <!-- Різний підзаголовок для авторизованих та неавторизованих користувачів -->
      <p class="text-lg md:text-xl text-slate-300 dark:text-slate-400 max-w-2xl mx-auto mb-10">
        <template v-if="isLoggedIn">
          Використовуйте всі можливості AutoSubtitles для підвищення ефективності вашого контенту.
          Створюйте субтитри швидко, легко та ефективно.
        </template>
        <template v-else>
          Приєднуйтесь до AutoSubtitles сьогодні та почніть створювати субтитри, які справді працюють.
          Швидко, легко та ефективно.
        </template>
      </p>

      <!-- Різні кнопки дій для авторизованих та неавторизованих користувачів -->
      <template v-if="isLoggedIn">
        <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <BaseButton variant="primary" size="lg" @click="navigateToNewProject" class="!bg-gradient-to-r !from-blue-500 !to-indigo-600 hover:!from-blue-600 hover:!to-indigo-700 !border-none !text-white !px-12 !py-4 text-lg shadow-2xl">
            Створити Новий Проект
            <template #iconRight>
              <PlusIcon class="ml-2 h-5 w-5" />
            </template>
          </BaseButton>
          <BaseButton variant="secondary" size="lg" @click="navigateToMyProjects" class="!bg-white/10 !text-white !border-white/20 !px-12 !py-4 text-lg">
            Мої Проекти
            <template #iconRight>
              <DocumentTextIcon class="ml-2 h-5 w-5" />
            </template>
          </BaseButton>
        </div>
      </template>
      <template v-else>
        <BaseButton variant="primary" size="lg" @click="navigateToRegister" class="!bg-gradient-to-r !from-blue-500 !to-indigo-600 hover:!from-blue-600 hover:!to-indigo-700 !border-none !text-white !px-12 !py-4 text-lg shadow-2xl">
          Створити Акаунт Безкоштовно
          <template #iconRight>
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </template>
        </BaseButton>
        <p class="mt-6 text-sm text-slate-400 dark:text-slate-500">Проста реєстрація, миттєвий доступ.</p>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import BaseButton from '../ui/BaseButton.vue';
import {
  PlusIcon,
  CheckCircleIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

// Перевіряємо, чи авторизований користувач
const isLoggedIn = computed(() => authStore.isAuthenticated);

// Функції для навігації
const navigateToRegister = () => {
  router.push('/register');
};

const navigateToNewProject = () => {
  router.push('/projects/new');
};

const navigateToMyProjects = () => {
  router.push('/my-projects');
};
</script>
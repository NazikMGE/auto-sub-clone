<template>
  <section class="py-16 md:py-24 bg-white dark:bg-slate-800/30 transition-colors duration-300">
    <div class="main-container">
      <div class="text-center mb-14 md:mb-20">
         <span class="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-indigo-400 mb-2 block">Переваги</span>
        <h2 class="section-title">
          Розкрийте <span class="text-blue-600 dark:text-indigo-400">потенціал</span> вашого контенту
        </h2>
        <p class="section-subtitle mt-4">
          AutoSubtitles – це більше, ніж просто субтитри. Це інструмент для зростання вашої аудиторії та покращення взаємодії.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard title="Максимальна Доступність">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </template>
          Зробіть ваш контент зрозумілим для людей з порушеннями слуху, тих, хто дивиться відео без звуку, або для іноземної аудиторії.
        </FeatureCard>

        <FeatureCard title="Покращене SEO">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </template>
          Текстовий контент субтитрів індексується пошуковими системами, що значно підвищує видимість ваших відео та аудіо.
        </FeatureCard>

        <FeatureCard title="Збільшення Залученості">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
          Дослідження показують, що відео з субтитрами мають вищий рівень переглядів до кінця та краще утримують увагу глядачів.
        </FeatureCard>

         <FeatureCard title="Економія Часу">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
          Забудьте про години ручного транскрибування. Наша система робить це за лічені хвилини, дозволяючи вам сфокусуватися на творчості.
        </FeatureCard>

        <FeatureCard title="Професійний Вигляд">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
               <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
          Якісні та точні субтитри додають вашому контенту професіоналізму та показують турботу про вашу аудиторію.
        </FeatureCard>

        <FeatureCard title="Гнучкість та Інтеграція">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </template>
          Вибирайте між хмарною обробкою та локальним додатком. Експортуйте субтитри у популярних форматах.
        </FeatureCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureCard from '../ui/FeatureCard.vue';
// Logic
</script>
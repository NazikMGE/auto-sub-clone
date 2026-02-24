// views/NotFoundView.vue
<template>
  <div class="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center px-4 py-16 bg-primary">
    <div class="w-full max-w-sm md:max-w-md mx-auto mb-8 animate-fadeInUp" style="animation-delay: 100ms;">
      <img
        src="@/assets/404-illustration.svg" alt="Сторінку не знайдено"
        class="w-full h-auto"
      />
      </div>
    <h1 class="text-4xl sm:text-5xl font-extrabold text-primary mb-3 animate-fadeInUp" style="animation-delay: 300ms;">404 - Загубились?</h1>
    <p class="text-lg text-secondary mb-8 max-w-md animate-fadeInUp" style="animation-delay: 450ms;">
      Сторінка, яку ви шукали, не знайдена. Можливо, вона була переміщена або видалена.
    </p>
    <router-link
      to="/"
      class="btn btn-brand py-3 px-8 text-base animate-fadeInUp transform hover:scale-105"
      style="animation-delay: 600ms;"
    >
      На Головну
    </router-link>
  </div>
</template>
<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow pt-16 md:pt-20"> <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <div :key="route.path"> <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { onMounted, onUnmounted } from 'vue';
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });

onMounted(() => {
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});
onUnmounted(() => {
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.unobserve(el));
});
</script>
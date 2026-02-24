<template>
  <div class="particle-container" ref="containerRef">
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const containerRef = ref(null);
const particlesArray = []; // Перейменував для уникнення конфлікту з DOM 'particles'
const numParticles = 100; // Кількість частинок, можна налаштувати

const createParticle = () => {
  const particle = document.createElement('div');
  particle.classList.add('particle-item'); // Змінив ім'я класу

  // Початкова позиція
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `-${Math.random() * 30 + 10}px`; // З'являються трохи вище

  // Розмір
  const size = Math.random() * 4 + 1.5; // Розмір від 1.5px до 5.5px
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Прозорість
  particle.style.opacity = Math.random() * 0.4 + 0.2; // Від 0.2 до 0.6

  // Тривалість CSS анімації падіння
  particle.style.animationDuration = `${Math.random() * 8 + 7}s`; // Від 7 до 15 секунд

  // Горизонтальне коливання (додамо через CSS transform в анімації)
  particle.dataset.sway = (Math.random() - 0.5) * 40; // +/- 20px коливання

  return particle;
};

onMounted(() => {
  // console.log('FallingParticles mounted');
  if (containerRef.value) {
    // console.log('Particle container ref found:', containerRef.value);
    for (let i = 0; i < numParticles; i++) {
      const particleElement = createParticle();
      particlesArray.push(particleElement);
      containerRef.value.appendChild(particleElement);
    }
    // console.log(particlesArray.length + ' particles created.');
  } else {
    console.error('Particle container ref NOT found!');
  }
});

onUnmounted(() => {
  // console.log('FallingParticles unmounted');
  if (containerRef.value) {
    containerRef.value.innerHTML = ''; // Очищення DOM
  }
  particlesArray.length = 0; // Очищення масиву
});
</script>

<style>
/* Глобальні стилі для частинок, оскільки <style scoped> тут не підійде для динамічно створених елементів */
.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none; /* Дуже важливо! */
  z-index: 0; /* Має бути нижче форми, але вище статичного фону сторінки, якщо такий є */
}

.particle-item {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3); /* Світлі напівпрозорі частинки */
  border-radius: 50%;
  will-change: transform; /* Оптимізація анімації */

  /* CSS анімація падіння */
  animation-name: fall-and-sway;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

html.dark .particle-item {
  background-color: rgba(100, 116, 139, 0.25); /* Темніші частинки для темної теми */
}

@keyframes fall-and-sway {
  0% {
    transform: translateY(0px) translateX(0px);
  }
  25% {
    transform: translateX(var(--sway-amount, 10px)); /* Використовуємо змінну, або можна видалити translateX */
  }
  50% {
    transform: translateX(calc(var(--sway-amount, 10px) * -0.5));
  }
  75% {
    transform: translateX(var(--sway-amount, 10px));
  }
  100% {
    /* Падають трохи нижче видимої частини, щоб точно зникнути */
    transform: translateY(calc(100vh + 50px)) translateX(0px);
  }
}
</style>
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Лейзі-завантаження сторінок
const HomeView = () => import('@/views/HomeView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

// Захищені сторінки (вимагають авторизації)
const DashboardView = () => import('@/views/DashboardView.vue')
const MyProjectsView = () => import('@/views/MyProjectsView.vue')
const ProjectView = () => import('@/views/ProjectView.vue')
const NewProjectView = () => import('@/views/NewProjectView.vue')
const ProfileView = () => import('@/views/ProfileView.vue')
const SettingsView = () => import('@/views/SettingsView.vue')
// const AnalyticsView = () => import('@/views/AnalyticsView.vue')

const routes = [
  // Публічні маршрути
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'AutoSubtitles - Автоматичне створення субтитрів'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Вхід - AutoSubtitles',
      requiresGuest: true // Тільки для неавторизованих
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Реєстрація - AutoSubtitles',
      requiresGuest: true // Тільки для неавторизованих
    }
  },
 
  // Захищені маршрути (вимагають авторизації)
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      title: 'Панель керування - AutoSubtitles',
      requiresAuth: true // Вимагає авторизації
    }
  },
  {
    path: '/my-projects',
    name: 'my-projects',
    component: MyProjectsView,
    meta: {
      title: 'Мої проекти - AutoSubtitles',
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: 'Профіль - AutoSubtitles',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      title: 'Налаштування - AutoSubtitles',
      requiresAuth: true
    }
  },
  {
    path: '/projects/new',
    name: 'new-project',
    component: NewProjectView,
    meta: {
      title: 'Новий проект - AutoSubtitles',
      requiresAuth: true
    }
  },
  {
    path: '/projects/:id',
    name: 'project-details',
    component: ProjectView,
    meta: {
      title: 'Деталі проекту - AutoSubtitles',
      requiresAuth: true
    }
  },
  // Маршрут для неіснуючих сторінок (завжди останній)
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Сторінку не знайдено - AutoSubtitles'
    }
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Навігаційний захисник для перевірки авторизації
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  let isAuthenticated = authStore.isAuthenticated;
  
  // Якщо є токен, але стан не ініціалізовано
  if (localStorage.getItem('token') && !authStore.user) {
    try {
      // Спроба завантажити дані користувача
      await authStore.loadUserProfile();
      isAuthenticated = authStore.isAuthenticated;
    } catch (error) {
      // Якщо виникла помилка при завантаженні профілю, вважаємо користувача неавторизованим
      console.error('Error loading user profile:', error);
      isAuthenticated = false;
    }
  }
  
  // Перевіряємо, чи маршрут вимагає авторизації
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Зберігаємо шлях, щоб повернутися після входу
    next({ 
      name: 'login', 
      query: { redirect: to.fullPath } 
    });
  } 
  // Перевіряємо, чи маршрут лише для гостей (неавторизованих)
  else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'dashboard' });
  } 
  // В інших випадках дозволяємо перехід
  else {
    next();
  }
});

// Динамічна зміна заголовку сторінки
router.afterEach((to) => {
  document.title = to.meta.title || 'AutoSubtitles - Автоматичне створення субтитрів'
})

export default router
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores/auth';

// Мокаємо authService
vi.mock('@/services/authService', () => ({
  default: {
    login: vi.fn(),
    register: vi.fn(),
    getCurrentUser: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: vi.fn(),
  },
}));

// Мокаємо localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Створюємо маршрути для тестування (спрощена версія оригінальних)
const DummyComponent = { template: '<div>Page</div>' };

function createTestRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'home', component: DummyComponent },
      {
        path: '/login',
        name: 'login',
        component: DummyComponent,
        meta: { requiresGuest: true },
      },
      {
        path: '/register',
        name: 'register',
        component: DummyComponent,
        meta: { requiresGuest: true },
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: DummyComponent,
        meta: { requiresAuth: true },
      },
      {
        path: '/profile',
        name: 'profile',
        component: DummyComponent,
        meta: { requiresAuth: true },
      },
      {
        path: '/settings',
        name: 'settings',
        component: DummyComponent,
        meta: { requiresAuth: true },
      },
    ],
  });
}

describe('Router', () => {
  let router;
  let authStore;

  beforeEach(async () => {
    setActivePinia(createPinia());
    localStorageMock.clear();
    vi.clearAllMocks();

    authStore = useAuthStore();
    router = createTestRouter();

    // Додаємо навігаційний захисник (як в оригінальному роутері)
    router.beforeEach(async (to, from, next) => {
      const store = useAuthStore();
      const isAuthenticated = store.isAuthenticated;

      if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'login', query: { redirect: to.fullPath } });
      } else if (to.meta.requiresGuest && isAuthenticated) {
        next({ name: 'dashboard' });
      } else {
        next();
      }
    });

    // Ініціалізуємо роутер
    router.push('/');
    await router.isReady();
  });

  describe('публічні маршрути', () => {
    it('дозволяє доступ до домашньої сторінки', async () => {
      await router.push('/');
      expect(router.currentRoute.value.name).toBe('home');
    });

    it('дозволяє неавторизованому доступ до login', async () => {
      await router.push('/login');
      expect(router.currentRoute.value.name).toBe('login');
    });

    it('дозволяє неавторизованому доступ до register', async () => {
      await router.push('/register');
      expect(router.currentRoute.value.name).toBe('register');
    });
  });

  describe('захищені маршрути', () => {
    it('перенаправляє на login при спробі доступу до dashboard без авторизації', async () => {
      await router.push('/dashboard');
      expect(router.currentRoute.value.name).toBe('login');
      expect(router.currentRoute.value.query.redirect).toBe('/dashboard');
    });

    it('перенаправляє на login при спробі доступу до profile без авторизації', async () => {
      await router.push('/profile');
      expect(router.currentRoute.value.name).toBe('login');
      expect(router.currentRoute.value.query.redirect).toBe('/profile');
    });

    it('перенаправляє на login при спробі доступу до settings без авторизації', async () => {
      await router.push('/settings');
      expect(router.currentRoute.value.name).toBe('login');
    });

    it('дозволяє авторизованому доступ до dashboard', async () => {
      authStore.authStatus = true;

      await router.push('/dashboard');
      expect(router.currentRoute.value.name).toBe('dashboard');
    });

    it('дозволяє авторизованому доступ до profile', async () => {
      authStore.authStatus = true;

      await router.push('/profile');
      expect(router.currentRoute.value.name).toBe('profile');
    });
  });

  describe('гостьові маршрути', () => {
    it('перенаправляє авторизованого з login на dashboard', async () => {
      authStore.authStatus = true;

      await router.push('/login');
      expect(router.currentRoute.value.name).toBe('dashboard');
    });

    it('перенаправляє авторизованого з register на dashboard', async () => {
      authStore.authStatus = true;

      await router.push('/register');
      expect(router.currentRoute.value.name).toBe('dashboard');
    });
  });

  describe('redirect після авторизації', () => {
    it('зберігає redirect шлях у query при перенаправленні на login', async () => {
      await router.push('/settings');
      expect(router.currentRoute.value.name).toBe('login');
      expect(router.currentRoute.value.query.redirect).toBe('/settings');
    });
  });
});

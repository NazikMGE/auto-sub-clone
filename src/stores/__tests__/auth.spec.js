import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../auth';

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
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Імпортуємо мок для authService
import authService from '@/services/authService';

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('починає з неавторизованого стану', () => {
      const store = useAuthStore();
      expect(store.user).toBeNull();
      expect(store.loading).toBe(false);
      expect(store.error).toBeNull();
      expect(store.isAuthenticated).toBe(false);
    });

    it('userInitials повертає порожній рядок без користувача', () => {
      const store = useAuthStore();
      expect(store.userInitials).toBe('');
    });
  });

  describe('userInitials', () => {
    it('обчислює ініціали з full_name', () => {
      const store = useAuthStore();
      store.user = { full_name: 'Іван Петренко' };
      expect(store.userInitials).toBe('ІП');
    });

    it('обчислює ініціали з name', () => {
      const store = useAuthStore();
      store.user = { name: 'Олена Коваль' };
      expect(store.userInitials).toBe('ОК');
    });

    it('обмежує ініціали до 2 символів', () => {
      const store = useAuthStore();
      store.user = { full_name: 'Іван Петрович Коваленко' };
      expect(store.userInitials).toBe('ІП');
    });
  });

  describe('login', () => {
    it('успішний вхід оновлює стан', async () => {
      const store = useAuthStore();
      const mockResponse = { access_token: 'test-token' };
      authService.login.mockResolvedValue(mockResponse);
      authService.getCurrentUser.mockResolvedValue({
        full_name: 'Тест Юзер',
        email: 'test@example.com',
      });

      const result = await store.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
      expect(store.isAuthenticated).toBe(true);
      expect(store.error).toBeNull();
    });

    it('невдалий вхід зберігає помилку', async () => {
      const store = useAuthStore();
      authService.login.mockRejectedValue({
        response: {
          data: { detail: 'Невірні дані для входу' },
        },
      });

      const result = await store.login({
        email: 'wrong@example.com',
        password: 'wrong',
      });

      expect(result.success).toBe(false);
      expect(store.error).toBe('Невірні дані для входу');
    });

    it('помилка мережі повертає відповідне повідомлення', async () => {
      const store = useAuthStore();
      authService.login.mockRejectedValue(new Error('Network Error'));

      const result = await store.login({
        email: 'test@example.com',
        password: 'pass',
      });

      expect(result.success).toBe(false);
      expect(store.error).toBe('Сервер недоступний. Спробуйте пізніше.');
    });
  });

  describe('register', () => {
    it('успішна реєстрація з токеном авторизує користувача', async () => {
      const store = useAuthStore();
      authService.register.mockResolvedValue({ access_token: 'new-token' });
      authService.getCurrentUser.mockResolvedValue({
        full_name: 'Новий Юзер',
        email: 'new@example.com',
      });

      const result = await store.register({
        email: 'new@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
      expect(store.isAuthenticated).toBe(true);
    });

    it('дублікат email повертає відповідну помилку', async () => {
      const store = useAuthStore();
      authService.register.mockRejectedValue({
        response: {
          status: 400,
          data: { detail: 'Email already registered' },
        },
      });

      const result = await store.register({
        email: 'existing@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(false);
      expect(result.code).toBe('EMAIL_EXISTS');
      expect(store.error).toContain('вже зареєстрований');
    });
  });

  describe('logout', () => {
    it('очищує стан та викликає authService.logout', async () => {
      const store = useAuthStore();

      // Імітуємо авторизований стан
      store.user = { name: 'Test' };
      store.authStatus = true;

      await store.logout();

      expect(store.user).toBeNull();
      expect(store.error).toBeNull();
      expect(store.isAuthenticated).toBe(false);
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('updateUserAvatar', () => {
    it('оновлює аватар користувача', async () => {
      const store = useAuthStore();
      store.user = { name: 'Test', avatarUrl: null };

      const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

      const result = await store.updateUserAvatar('https://example.com/avatar.jpg');

      expect(result).toBe(true);
      expect(store.user.avatarUrl).toBe('https://example.com/avatar.jpg');
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'user-avatar-updated' }),
      );

      dispatchSpy.mockRestore();
    });

    it('повертає true навіть якщо user === null', async () => {
      const store = useAuthStore();
      store.user = null;

      const result = await store.updateUserAvatar('https://example.com/avatar.jpg');

      expect(result).toBe(true);
    });
  });

  describe('init', () => {
    it('завантажує профіль якщо є токен', async () => {
      localStorageMock.getItem.mockReturnValue('stored-token');
      authService.getCurrentUser.mockResolvedValue({
        full_name: 'Stored User',
        email: 'stored@example.com',
      });

      const store = useAuthStore();
      await store.init();

      expect(store.isAuthenticated).toBe(true);
      expect(store.user).toEqual({
        full_name: 'Stored User',
        email: 'stored@example.com',
      });
    });

    it('очищає стан якщо профіль не завантажується', async () => {
      localStorageMock.getItem.mockReturnValue('invalid-token');
      authService.getCurrentUser.mockRejectedValue({
        response: { status: 401 },
      });

      const store = useAuthStore();
      await store.init();

      expect(store.isAuthenticated).toBe(false);
    });

    it('нічого не робить без токена', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const store = useAuthStore();
      await store.init();

      expect(store.isAuthenticated).toBe(false);
      expect(authService.getCurrentUser).not.toHaveBeenCalled();
    });
  });
});

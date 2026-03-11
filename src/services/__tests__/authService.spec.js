import { describe, it, expect, beforeEach, vi } from 'vitest';

// Мокаємо api модуль
vi.mock('../api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    defaults: { baseURL: 'http://localhost:8000' },
  },
}));

// Мокаємо axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
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

import api from '../api';
import axios from 'axios';
import authService from '../authService';

describe('authService', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('register', () => {
    it('надсилає запит з даними користувача та аватаром', async () => {
      api.post.mockResolvedValue({
        data: { access_token: 'new-token', email: 'test@test.com' },
      });

      const result = await authService.register({
        email: 'test@test.com',
        password: 'password123',
      });

      expect(api.post).toHaveBeenCalledWith(
        '/api/v1/users/register',
        expect.objectContaining({
          email: 'test@test.com',
          password: 'password123',
          avatarUrl: expect.stringContaining('ui-avatars.com'),
        }),
      );
      expect(result.access_token).toBe('new-token');
    });

    it('зберігає токен в localStorage при отриманні', async () => {
      api.post.mockResolvedValue({
        data: { access_token: 'my-token' },
      });

      await authService.register({
        email: 'test@test.com',
        password: 'pass',
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'my-token');
    });

    it('не зберігає токен якщо його немає у відповіді', async () => {
      api.post.mockResolvedValue({
        data: { message: 'Registered successfully' },
      });

      await authService.register({
        email: 'test@test.com',
        password: 'pass',
      });

      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('генерує аватар URL з email', async () => {
      api.post.mockResolvedValue({ data: {} });

      await authService.register({
        email: 'john.doe@example.com',
        password: 'pass',
      });

      const callArgs = api.post.mock.calls[0][1];
      expect(callArgs.avatarUrl).toContain('john.doe');
    });
  });

  describe('login', () => {
    it('надсилає дані у форматі x-www-form-urlencoded', async () => {
      axios.post.mockResolvedValue({
        data: { access_token: 'login-token' },
      });

      await authService.login({
        email: 'user@test.com',
        password: 'mypassword',
      });

      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/users/login',
        expect.stringContaining('username=user%40test.com'),
        expect.objectContaining({
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      );
    });

    it('зберігає токен після успішного входу', async () => {
      axios.post.mockResolvedValue({
        data: { access_token: 'login-token' },
      });

      await authService.login({
        email: 'user@test.com',
        password: 'pass',
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'login-token');
    });

    it('підтримує username замість email', async () => {
      axios.post.mockResolvedValue({
        data: { access_token: 'token' },
      });

      await authService.login({
        username: 'myuser',
        password: 'pass',
      });

      const sentData = axios.post.mock.calls[0][1];
      expect(sentData).toContain('username=myuser');
    });
  });

  describe('getCurrentUser', () => {
    it('повертає дані користувача з API', async () => {
      const userData = { full_name: 'Тест Юзер', email: 'test@test.com' };
      api.get.mockResolvedValue({ data: userData });

      const result = await authService.getCurrentUser();

      expect(api.get).toHaveBeenCalledWith('/api/v1/users/me');
      expect(result).toEqual(userData);
    });
  });

  describe('logout', () => {
    it('видаляє токен з localStorage', () => {
      localStorageMock.setItem('token', 'some-token');

      authService.logout();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    });
  });

  describe('isAuthenticated', () => {
    it('повертає true якщо є токен', () => {
      localStorageMock.getItem.mockReturnValue('some-token');
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('повертає false якщо немає токена', () => {
      localStorageMock.getItem.mockReturnValue(null);
      expect(authService.isAuthenticated()).toBe(false);
    });
  });
});

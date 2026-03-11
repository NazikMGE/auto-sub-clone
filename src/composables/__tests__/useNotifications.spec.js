import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { useNotifications } from '../useNotifications';

// useNotifications використовує onMounted та watch, тому потрібен компонент-обгортка
function withSetup(composable) {
  let result;
  const wrapper = mount(
    defineComponent({
      setup() {
        result = composable();
        return {};
      },
      template: '<div></div>',
    }),
  );
  return { result, wrapper };
}

// Глобальні notifications зберігаються між викликами useNotifications,
// тому перед кожним тестом потрібно очищати їх
function clearNotifications(result) {
  result.notifications.value = [];
  result.unreadCount.value = 0;
}

describe('useNotifications', () => {
  let result;

  beforeEach(() => {
    vi.restoreAllMocks();
    ({ result } = withSetup(() => useNotifications()));
    clearNotifications(result);
  });

  describe('addNotification', () => {
    it('додає сповіщення до списку', async () => {
      const notification = await result.addNotification('Тестове повідомлення', 'info');

      expect(notification).not.toBeNull();
      expect(notification.message).toBe('Тестове повідомлення');
      expect(notification.type).toBe('info');
      expect(notification.read).toBe(false);
      expect(result.notifications.value).toHaveLength(1);
    });

    it('додає нове сповіщення на початок списку', async () => {
      await result.addNotification('Перше', 'info');
      await result.addNotification('Друге', 'success');

      expect(result.notifications.value[0].message).toBe('Друге');
      expect(result.notifications.value[1].message).toBe('Перше');
    });

    it('збільшує лічильник непрочитаних', async () => {
      await result.addNotification('Тест 1', 'info');
      await result.addNotification('Тест 2', 'info');

      expect(result.unreadCount.value).toBe(2);
    });

    it('диспатчить custom event new-notification', async () => {
      const handler = vi.fn();
      window.addEventListener('new-notification', handler);

      await result.addNotification('Тест', 'info');

      expect(handler).toHaveBeenCalledTimes(1);
      const event = handler.mock.calls[0][0];
      expect(event.detail.notification.message).toBe('Тест');

      window.removeEventListener('new-notification', handler);
    });
  });

  describe('спеціалізовані функції додавання', () => {
    it('addSuccessNotification створює тип success', async () => {
      await result.addSuccessNotification('Успіх!');
      expect(result.notifications.value[0].type).toBe('success');
    });

    it('addErrorNotification створює тип error', async () => {
      await result.addErrorNotification('Помилка!');
      expect(result.notifications.value[0].type).toBe('error');
    });

    it('addWarningNotification створює тип warning', async () => {
      await result.addWarningNotification('Увага!');
      expect(result.notifications.value[0].type).toBe('warning');
    });

    it('addInfoNotification створює тип info', async () => {
      await result.addInfoNotification('Інфо');
      expect(result.notifications.value[0].type).toBe('info');
    });
  });

  describe('markAsRead', () => {
    it('позначає сповіщення як прочитане', async () => {
      const notification = await result.addNotification('Тест', 'info');
      expect(result.unreadCount.value).toBe(1);

      await result.markAsRead(notification.id);

      expect(result.notifications.value[0].read).toBe(true);
      expect(result.unreadCount.value).toBe(0);
    });

    it('повертає false якщо сповіщення не знайдено', async () => {
      await result.markAsRead(999999);
      expect(result.unreadCount.value).toBe(0);
    });
  });

  describe('markAllAsRead', () => {
    it('позначає всі сповіщення як прочитані', async () => {
      await result.addNotification('Тест 1', 'info');
      await result.addNotification('Тест 2', 'error');
      await result.addNotification('Тест 3', 'success');

      expect(result.unreadCount.value).toBe(3);

      await result.markAllAsRead();

      expect(result.unreadCount.value).toBe(0);
      result.notifications.value.forEach((n) => {
        expect(n.read).toBe(true);
      });
    });
  });

  describe('removeNotification', () => {
    it('видаляє сповіщення зі списку', async () => {
      const n1 = await result.addNotification('Тест 1', 'info');
      // Додаємо затримку щоб Date.now() повернув інший ID
      n1.id = 1;
      const n2 = await result.addNotification('Тест 2', 'info');
      n2.id = 2;

      expect(result.notifications.value).toHaveLength(2);

      await result.removeNotification(1);

      expect(result.notifications.value).toHaveLength(1);
      expect(result.notifications.value[0].message).toBe('Тест 2');
    });

    it('оновлює лічильник непрочитаних після видалення', async () => {
      const n1 = await result.addNotification('Тест', 'info');
      expect(result.unreadCount.value).toBe(1);

      await result.removeNotification(n1.id);

      expect(result.unreadCount.value).toBe(0);
    });
  });

  describe('formatNotificationTime', () => {
    it('повертає "щойно" для нещодавніх сповіщень', () => {
      const now = new Date();
      expect(result.formatNotificationTime(now)).toBe('щойно');
    });

    it('повертає хвилини для сповіщень молодших за годину', () => {
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
      expect(result.formatNotificationTime(fiveMinAgo)).toBe('5 хвилин тому');
    });

    it('правильно склоняє "хвилину"', () => {
      const oneMinAgo = new Date(Date.now() - 1 * 60 * 1000);
      expect(result.formatNotificationTime(oneMinAgo)).toBe('1 хвилину тому');
    });

    it('правильно склоняє "хвилини"', () => {
      const threeMinAgo = new Date(Date.now() - 3 * 60 * 1000);
      expect(result.formatNotificationTime(threeMinAgo)).toBe('3 хвилини тому');
    });

    it('повертає години для сповіщень молодших за добу', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      expect(result.formatNotificationTime(twoHoursAgo)).toBe('2 години тому');
    });

    it('повертає дні для сповіщень молодших за тиждень', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      expect(result.formatNotificationTime(threeDaysAgo)).toBe('3 дні тому');
    });

    it('повертає дату для старіших сповіщень', () => {
      const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
      const formatted = result.formatNotificationTime(twoWeeksAgo);
      // Перевіряємо що це дата у форматі "25 лют." або подібному
      expect(formatted).not.toContain('тому');
    });
  });

  describe('getNotificationTypeClasses', () => {
    it('повертає зелені класи для success', () => {
      const classes = result.getNotificationTypeClasses('success');
      expect(classes).toContain('bg-green-100');
      expect(classes).toContain('text-green-800');
    });

    it('повертає червоні класи для error', () => {
      const classes = result.getNotificationTypeClasses('error');
      expect(classes).toContain('bg-red-100');
      expect(classes).toContain('text-red-800');
    });

    it('повертає жовті класи для warning', () => {
      const classes = result.getNotificationTypeClasses('warning');
      expect(classes).toContain('bg-yellow-100');
      expect(classes).toContain('text-yellow-800');
    });

    it('повертає сині класи для info (та default)', () => {
      const classes = result.getNotificationTypeClasses('info');
      expect(classes).toContain('bg-blue-100');
      expect(classes).toContain('text-blue-800');

      const defaultClasses = result.getNotificationTypeClasses('unknown');
      expect(defaultClasses).toContain('bg-blue-100');
    });
  });
});

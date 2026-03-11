import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../BaseButton.vue';

describe('BaseButton', () => {
  describe('рендеринг', () => {
    it('рендерить кнопку зі слотом за замовчуванням', () => {
      const wrapper = mount(BaseButton, {
        slots: { default: 'Натисни мене' },
      });
      expect(wrapper.text()).toContain('Натисни мене');
      expect(wrapper.element.tagName).toBe('BUTTON');
    });

    it('за замовчуванням type="button"', () => {
      const wrapper = mount(BaseButton);
      expect(wrapper.attributes('type')).toBe('button');
    });

    it('підтримує type="submit"', () => {
      const wrapper = mount(BaseButton, {
        props: { type: 'submit' },
      });
      expect(wrapper.attributes('type')).toBe('submit');
    });
  });

  describe('варіанти', () => {
    it('primary — сині класи', () => {
      const wrapper = mount(BaseButton, { props: { variant: 'primary' } });
      expect(wrapper.classes()).toEqual(expect.arrayContaining([expect.stringContaining('')]));
      expect(wrapper.html()).toContain('bg-blue-600');
    });

    it('secondary — світлосині класи', () => {
      const wrapper = mount(BaseButton, { props: { variant: 'secondary' } });
      expect(wrapper.html()).toContain('bg-blue-100');
    });

    it('danger — червоні класи', () => {
      const wrapper = mount(BaseButton, { props: { variant: 'danger' } });
      expect(wrapper.html()).toContain('bg-red-600');
    });

    it('ghost — прозорі класи', () => {
      const wrapper = mount(BaseButton, { props: { variant: 'ghost' } });
      expect(wrapper.html()).toContain('text-slate-700');
    });

    it('link — стиль посилання', () => {
      const wrapper = mount(BaseButton, { props: { variant: 'link' } });
      expect(wrapper.html()).toContain('text-blue-600');
      expect(wrapper.html()).toContain('hover:underline');
    });
  });

  describe('розміри', () => {
    it('sm — маленький розмір', () => {
      const wrapper = mount(BaseButton, { props: { size: 'sm' } });
      expect(wrapper.html()).toContain('px-4');
      expect(wrapper.html()).toContain('py-2');
      expect(wrapper.html()).toContain('text-sm');
    });

    it('md — середній розмір (за замовчуванням)', () => {
      const wrapper = mount(BaseButton, { props: { size: 'md' } });
      expect(wrapper.html()).toContain('px-6');
      expect(wrapper.html()).toContain('text-base');
    });

    it('lg — великий розмір', () => {
      const wrapper = mount(BaseButton, { props: { size: 'lg' } });
      expect(wrapper.html()).toContain('px-8');
      expect(wrapper.html()).toContain('py-3');
      expect(wrapper.html()).toContain('text-lg');
    });
  });

  describe('стани', () => {
    it('disabled додає атрибут та класи', () => {
      const wrapper = mount(BaseButton, { props: { disabled: true } });
      expect(wrapper.attributes('disabled')).toBeDefined();
      expect(wrapper.html()).toContain('opacity-60');
      expect(wrapper.html()).toContain('cursor-not-allowed');
    });

    it('loading показує спінер та додає стилі disabled', () => {
      const wrapper = mount(BaseButton, { props: { loading: true } });
      expect(wrapper.find('svg.animate-spin').exists()).toBe(true);
      expect(wrapper.html()).toContain('opacity-60');
    });

    it('без loading спінер прихований', () => {
      const wrapper = mount(BaseButton, { props: { loading: false } });
      expect(wrapper.find('svg.animate-spin').exists()).toBe(false);
    });
  });

  describe('block', () => {
    it('block додає w-full клас', () => {
      const wrapper = mount(BaseButton, { props: { block: true } });
      expect(wrapper.classes()).toContain('w-full');
    });

    it('без block немає w-full', () => {
      const wrapper = mount(BaseButton, { props: { block: false } });
      expect(wrapper.classes()).not.toContain('w-full');
    });
  });

  describe('iconOnly', () => {
    it('iconOnly рендерить тільки icon слот', () => {
      const wrapper = mount(BaseButton, {
        props: { iconOnly: true },
        slots: {
          default: 'Text',
          icon: '<span class="test-icon">★</span>',
        },
      });
      expect(wrapper.text()).not.toContain('Text');
      expect(wrapper.find('.test-icon').exists()).toBe(true);
    });

    it('iconOnly sm — менший padding', () => {
      const wrapper = mount(BaseButton, {
        props: { iconOnly: true, size: 'sm' },
      });
      expect(wrapper.html()).toContain('p-2');
    });

    it('iconOnly lg — більший padding', () => {
      const wrapper = mount(BaseButton, {
        props: { iconOnly: true, size: 'lg' },
      });
      expect(wrapper.html()).toContain('p-3.5');
    });
  });

  describe('слоти', () => {
    it('рендерить iconLeft слот', () => {
      const wrapper = mount(BaseButton, {
        slots: {
          iconLeft: '<span class="left-icon">←</span>',
          default: 'Текст',
        },
      });
      expect(wrapper.find('.left-icon').exists()).toBe(true);
      expect(wrapper.text()).toContain('Текст');
    });

    it('рендерить iconRight слот', () => {
      const wrapper = mount(BaseButton, {
        slots: {
          iconRight: '<span class="right-icon">→</span>',
          default: 'Текст',
        },
      });
      expect(wrapper.find('.right-icon').exists()).toBe(true);
    });
  });

  describe('події', () => {
    it('генерує click подію', async () => {
      const wrapper = mount(BaseButton);
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toHaveLength(1);
    });
  });
});

<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-lg shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]',
      sizeClasses,
      variantClasses,
      { 'w-full': block }
    ]"
    :disabled="disabled"
  >
    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot v-if="!iconOnly && $slots.iconLeft" name="iconLeft"></slot>
    <slot v-if="!iconOnly"></slot> <slot v-if="!iconOnly && $slots.iconRight" name="iconRight"></slot>
    <slot v-if="iconOnly" name="icon"></slot> </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary', // primary, secondary, danger, ghost, link
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  block: { // If button should take full width
    type: Boolean,
    default: false,
  },
  iconOnly: { // If button only contains an icon
    type: Boolean,
    default: false,
  }
})

const sizeClasses = computed(() => {
  if (props.iconOnly) {
    switch (props.size) {
      case 'sm': return 'p-2';
      case 'lg': return 'p-3.5';
      default: return 'p-2.5'; // md
    }
  }
  switch (props.size) {
    case 'sm': return 'px-4 py-2 text-sm';
    case 'lg': return 'px-8 py-3 text-lg';
    default: return 'px-6 py-2.5 text-base'; // md
  }
})

const variantClasses = computed(() => {
  let classes = '';
  if (props.disabled || props.loading) {
    classes += ' opacity-60 cursor-not-allowed';
  }

  switch (props.variant) {
    case 'primary':
      return classes + ' text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus-visible:ring-blue-500 dark:focus-visible:ring-indigo-500';
    case 'secondary':
      return classes + ' text-blue-700 dark:text-indigo-400 bg-blue-100 dark:bg-indigo-500/20 hover:bg-blue-200 dark:hover:bg-indigo-500/30 focus-visible:ring-blue-500 dark:focus-visible:ring-indigo-500';
    case 'danger':
      return classes + ' text-white bg-red-600 hover:bg-red-700 focus-visible:ring-red-500';
    case 'ghost':
      return classes + ' text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:ring-slate-500';
    case 'link':
      return classes + ' text-blue-600 dark:text-indigo-400 hover:underline focus-visible:ring-blue-500 dark:focus-visible:ring-indigo-500 !p-0 !shadow-none'; // Override padding for link
    default:
      return classes + ' text-white bg-blue-600 hover:bg-blue-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus-visible:ring-blue-500 dark:focus-visible:ring-indigo-500';
  }
})
</script>
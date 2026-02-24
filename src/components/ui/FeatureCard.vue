<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div class="flex items-start space-x-4">
      <div v-if="$slots.icon" class="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-indigo-500/20 text-blue-600 dark:text-indigo-400 flex items-center justify-center">
        <slot name="icon"></slot>
      </div>
      <div>
        <h3 v-if="title" class="text-xl font-semibold text-slate-900 dark:text-white mb-2">{{ title }}</h3>
        <p v-if="$slots.default" class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          <slot></slot>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
})
</script>
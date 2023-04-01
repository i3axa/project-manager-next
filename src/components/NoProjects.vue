<script setup lang="ts"></script>

<template>
  <div
    class="w-full flex flex-col items-center justify-center text-2xl text-error"
  >
    <p class="max-w-md text-center">
      {{ $t('dashboard.noProjects.message') }}
    </p>
    <RouterLink class="hover:underline mt-12" to="/">
      {{ $t('dashboard.noProjects.goMain') }}
    </RouterLink>
  </div>
</template>

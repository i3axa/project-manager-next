<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-5">
    <input class="form-control" type="email" :placeholder="$t('auth.email')" />
    <input
      class="form-control"
      type="password"
      :placeholder="$t('auth.password')"
    />
    <button class="btn-flat-secondary">{{ $t('auth.logIn') }}</button>
  </div>
</template>

<style scoped lang="scss"></style>

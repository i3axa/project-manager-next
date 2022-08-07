<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-5">
    <input class="form-control" type="email" :placeholder="$t('auth.email')" />
    <input
      class="form-control"
      type="password"
      :placeholder="$t('auth.password')"
    />
    <input
      class="form-control"
      type="password"
      :placeholder="$t('auth.confirmPassword')"
    />
    <div class="separator"></div>
    <input class="form-control" type="text" :placeholder="$t('auth.name')" />
    <input class="form-control" type="text" :placeholder="$t('auth.surname')" />
    <button class="btn-flat-secondary">{{ $t('auth.signUp') }}</button>
  </div>
</template>

<style scoped lang="scss">
.separator {
  background-color: gray;
  opacity: 0.2;
  height: 1px;
}
</style>

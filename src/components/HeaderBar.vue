<script setup lang="ts">
import { useStyleStore } from '@/store/style';
import { BIconList, BIconArrowClockwise, BIconBell } from 'bootstrap-icons-vue';

const styleStore = useStyleStore();
</script>

<template>
  <div class="header bg-gray-100 dark:bg-gray-800">
    <button
      class="btn text-4xl text-dark dark:text-light shadow-none"
      id="navbar-toggle-btn"
      @click="styleStore.toggleNavigationBar()"
    >
      <b-icon-list />
    </button>

    <span
      class="sync-indicator text-xl text-gray-500"
      v-show="styleStore.isSyncIndicatorToggled"
    >
      <b-icon-arrow-clockwise class="animate-spin" />
    </span>

    <!-- <button class="btn text-2xl text-dark dark:text-light shadow-none">
      <b-icon-bell />
    </button> -->

    <router-link
      class="link flex-none hover:opacity-50 text-black dark:text-light"
      to="/auth"
      >{{ $t('headerBar.logIn') }}</router-link
    >
  </div>
</template>

<style scoped lang="scss">
#navbar-toggle-btn {
  padding: 0.25rem;
  border: none !important;
}

.link {
  font-weight: 500;
  font-size: large;
  transition: opacity 0.3s ease-in;
}

.header {
  position: sticky;
  top: 0;
  bottom: 0;
  padding: 5px 20px 5px 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  z-index: 1;
}

.sync-indicator {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
</style>

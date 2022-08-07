<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import store from '@/store';
import { StyleActions } from '@/store/modules/style';
</script>

<template>
  <HeaderBar></HeaderBar>
  <NavigationBar></NavigationBar>

  <div id="content">
    <RouterView class="mt-16 mb-2 mx-5"></RouterView>
  </div>

  <div
    id="global-overlay"
    class="bg-dark/70"
    @click="
      store.state.style.isNavbarHidden
        ? undefined
        : store.dispatch(StyleActions.toggleNavigationBar)
    "
  ></div>

  <LoadingSpinner id="global-spinner" />
</template>

<style lang="scss">
@import '@/assets/base.scss';

#content {
  min-height: 100vh;
  display: flex;
}

#global-spinner {
  display: none;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#global-overlay {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
</style>

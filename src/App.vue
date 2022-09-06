<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import store from '@/store';
import { StyleActions } from '@/store/modules/style';
</script>

<template>
  <NavigationBar></NavigationBar>
  <HeaderBar></HeaderBar>

  <div id="content">
    <RouterView class="mt-3 mx-5"></RouterView>
  </div>

  <div
    v-show="store.state.style.isGlobalSpinnerShown"
    id="global-overlay"
    class="bg-dark/70"
    @click="
      store.state.style.isNavbarHidden
        ? undefined
        : store.dispatch(StyleActions.toggleNavigationBar)
    "
  ></div>

  <LoadingSpinner
    id="global-spinner"
    v-show="store.state.style.isGlobalSpinnerShown"
  />
</template>

<style lang="scss">
@import '@/assets/base.scss';

#content {
  min-height: 90vh;
  display: flex;
}

#global-spinner {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#global-overlay {
  display: block;
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

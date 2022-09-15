<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useStyleStore } from '@/store/style';

const styleStore = useStyleStore();
const authStore = useAuthStore();

let isNavBarExpanded = true;

const expand = () => {
  const navBar = document.getElementById('navbar');

  if (!navBar) {
    return;
  }

  if (isNavBarExpanded) {
    navBar.classList.add('no-text');
    isNavBarExpanded = false;
  } else {
    navBar.classList.remove('no-text');
    isNavBarExpanded = true;
  }
};
</script>

<template>
  <nav class="bg-light dark:bg-dark navbar py-2 px-2" id="navbar">
    <div class="flex flex-row items-center mb-5">
      <button
        class="btn btn-outline-dark dark:btn-outline-light max-w-min !border-none !shadow-none self-center"
        @click="styleStore.toggleNavigationBar()"
      >
        <b-icon-list class="text-2xl" />
      </button>
      <router-link
        class="navbar-brand nav-link text-dark dark:text-light"
        to="/"
        >Project manager</router-link
      >
    </div>
    <button
      class="expand-btn btn-outline-dark dark:btn-outline-light"
      @click="expand"
    >
      <b-icon-arrow-bar-left class="text-2xl" />
    </button>
    <ul class="nav-buttons mt-5">
      <li class="nav-item home-nav">
        <router-link class="btn-primary nav-link" to="/">
          <b-icon-house class="mr-1" />
          <div class="nav-link-title">{{ $t('navigationBar.home') }}</div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="btn-primary nav-link" to="/me">
          <b-icon-person-circle class="mr-1" />
          <div class="nav-link-title">{{ $t('navigationBar.me') }}</div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="btn-primary nav-link" to="/admin">
          <b-icon-grid class="mr-1" />
          <div class="nav-link-title">
            {{ $t('navigationBar.dashboard') }} Admin
          </div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="btn-primary nav-link" to="/user">
          <b-icon-grid class="mr-1" />
          <div class="nav-link-title">
            {{ $t('navigationBar.dashboard') }} User
          </div>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="btn-primary nav-link" to="/settings">
          <b-icon-gear class="mr-1" />
          <div class="nav-link-title">{{ $t('navigationBar.settings') }}</div>
        </router-link>
      </li>
      <li class="nav-item">
        <button class="btn-primary nav-link" @click="authStore.logout()">
          <b-icon-arrow-right-circle class="mr-1" />
          <div class="nav-link-title">{{ $t('navigationBar.logOut') }}</div>
        </button>
      </li>
    </ul>
    <div class="about">
      <a href="https://google.com" target="_blank" class="hover:underline"
        >About
      </a>

      <a href="https://google.com" target="_blank" class="hover:underline"
        >Version 2.0</a
      >
    </div>
  </nav>
</template>

<style scoped lang="scss">
a {
  opacity: 1 !important;
}

.about {
  margin-top: auto;
  display: flex;
  justify-content: space-evenly;
  gap: 5px;
  transition: font-size 0.3s linear 0.4s;
}

.navbar.no-text .about {
  font-size: 0;
  transition: font-size 0.3s linear;
}

.navbar {
  position: fixed;
  left: -100%;
  align-content: flex-start;
  transition: left 0.5s ease-in-out;
  height: -webkit-fill-available;
  z-index: 3;
  display: flex;
  flex-direction: column;
}

.nav-link {
  width: 100%;
}

.nav-item {
  margin-bottom: 10px;
  line-height: 40px;
}

.navbar-brand {
  font-weight: 800;
  font-size: large;
}

.home-nav {
  margin-bottom: 20px;
}

.home-nav > .nav-link > svg {
  animation: none !important;
}

.expand-btn {
  display: none !important;
  justify-content: center;
  margin-bottom: 15px;
}

.navbar-brand {
  transition: all 0.7s linear;
  margin-left: 8px;
}

@media only screen and (max-width: 1200px) {
  .navbar.no-text .navbar-brand {
    font-size: 0;
    margin-left: 0px;
  }

  .navbar.no-text .nav-link-title {
    font-size: 0;
  }

  .navbar.no-text .nav-link > svg {
    margin-left: 20%;
    margin-right: 0;
  }

  .expand-btn {
    display: flex !important;
  }

  .home-nav {
    display: block !important;
  }
}

.expand-btn > svg {
  transition: transform 0.7s linear !important;
}

.navbar.no-text .expand-btn > svg {
  transform: rotate(180deg);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.nav-link:focus > svg,
.nav-link:hover > svg {
  animation: spin 1s linear infinite;
}

.navbar.no-text .nav-link > svg {
  transition: all 0.3s linear 0.4s;
}

.navbar.no-text .nav-link-title {
  transition: all 0.3s linear 0.1s;
}

.navbar:not(.no-text) .nav-link > svg {
  transition: all 0.3s linear 0.1s;
}

.navbar:not(.no-text) .nav-link-title {
  transition: all 0.3s linear 0.4s;
}
</style>

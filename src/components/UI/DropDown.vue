<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

interface IProps {
  items: Array<unknown>;
}

interface IEmits {
  (eventName: 'action', element: unknown): void;
}

defineEmits<IEmits>();
defineProps<IProps>();
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="menu-btn inline-flex justify-center w-full rounded-xl border border-gray-400 border-opacity-60 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 focus:ring-offset-gray-100 focus:ring-primary"
      >
        <slot name="title"></slot>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition-transform ease-out duration-100"
      enter-from-class="transition-transform opacity-0 scale-95"
      enter-to-class="transition-transform opacity-100 scale-100"
      leave-active-class="transition-transform ease-in duration-75"
      leave-from-class="transition-transform opacity-100 scale-100"
      leave-to-class="transition-transform opacity-0 scale-95"
    >
      <MenuItems
        class="z-20 rounded-2xl origin-top-right absolute mt-2 w-40 shadow-lg bg-white dark:bg-dark ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem
          v-for="(element, index) in items"
          v-slot="{ active }"
          @click="$emit('action', element)"
        >
          <div
            class="unselectable cursor-pointer block px-4 py-2 text-sm"
            :class="[
              active
                ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-200 '
                : 'text-gray-700 dark:text-gray-400',
              index === 0 ? 'rounded-t-2xl' : '',
              index === items.length - 1 ? 'rounded-b-2xl' : '',
            ]"
          >
            <slot
              name="item"
              v-bind="{ element, index, active, length: items.length }"
            >
              {{ element }}
            </slot>
          </div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<style scoped lang="scss">
.menu-btn {
  line-height: 1.2;
  transition: background-color 0.3s ease-in-out;
}
</style>

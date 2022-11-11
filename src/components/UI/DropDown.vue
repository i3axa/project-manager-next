<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
import { onMounted, ref, watch } from 'vue';

type Position = 'upLeft' | 'upRight' | 'downLeft' | 'downRight';

interface IProps {
  position: Position;
}

defineProps<IProps>();

const getClassFromPosition = (position: Position) => {
  if (position === 'downLeft') {
    return '';
  }

  if (position === 'downRight') {
    return 'translate-x-full';
  }

  if (position === 'upLeft') {
    return '-translate-y-full -top-2';
  }

  if (position === 'upRight') {
    return '-translate-y-full translate-x-full -top-2';
  }

  return '';
};

// const position = ref<Position>(
//   props.forceUpPosition ? Position.upLeft : Position.downLeft
// );

// const isPositionUp = () => {
//   return props.forceUpPosition || position.value < 2;
// };

const onOpen = (event: Event, isOpened: boolean) => {
  // if (isOpened) {
  //   return;
  // }
  // const rect = (event.target as Element).getBoundingClientRect();
  // const isUp = isPositionUp();
  // if (rect.x < 160) {
  //   if (isUp) {
  //     position.value = Position.upRight;
  //   } else {
  //     position.value = Position.downRight;
  //   }
  // } else {
  //   if (isUp) {
  //     position.value = Position.upLeft;
  //   } else {
  //     position.value = Position.downLeft;
  //   }
  // }
  // console.log((event.target as Element).getBoundingClientRect());
};
</script>

<template>
  <Menu v-slot="{ open }" as="div" class="menu">
    <div class="flex content-center">
      <MenuButton @click="onOpen($event, open)">
        <slot name="title">
          <b-icon-chevron-down />
        </slot>
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
        class="menu-items shadow-lg bg-white dark:bg-dark ring-1 ring-black ring-opacity-5 focus:outline-none"
        :class="getClassFromPosition(position)"
        ref="menuItems"
      >
        <slot name="items"></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>

<style scoped lang="scss">
.menu {
  position: relative;
  display: inline-block;
  text-align: left;
}

.menu-items {
  right: 0px;
  border-radius: 1rem;
  transform-origin: top right;
  position: absolute;
  width: 10rem;
  margin-top: 0.5rem;
  z-index: 1;
}
</style>

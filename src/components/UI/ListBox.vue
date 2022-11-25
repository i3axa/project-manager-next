<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { BIconChevronExpand, BIconCheckLg } from 'bootstrap-icons-vue';
import { ref } from 'vue';

interface IProps {
  items: Array<string>;
  modelValue?: string;
}

interface IEmits {
  (eventName: 'update:modelValue', value: string): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const modelValue = ref(props.modelValue);

const update = (item: string) => {
  emit('update:modelValue', item);
};
</script>

<template>
  <Listbox v-model="modelValue">
    <div class="relative mt-1">
      <ListboxButton
        class="listbox-btn relative w-full cursor-pointer rounded-xl bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <span class="block truncate"
          ><slot name="title" v-bind="{ modelValue }">{{
            modelValue
          }}</slot></span
        >
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <b-icon-chevron-expand class="h-5 w-5 text-gray-400" />
        </span>
      </ListboxButton>

      <transition
        enter-active-class="transition-transform ease-out duration-100"
        enter-from-class="transition-transform opacity-0 scale-95"
        enter-to-class="transition-transform opacity-100 scale-100"
        leave-active-class="transition-transform ease-in duration-75"
        leave-from-class="transition-transform opacity-100 scale-100"
        leave-to-class="transition-transform opacity-0 scale-95"
      >
        <ListboxOptions
          class="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-2xl bg-white dark:bg-dark text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="(item, index) in items"
            :value="item"
            :key="item"
            as="template"
            @click="update(item)"
          >
            <li
              class="unselectable cursor-pointer relative py-2 pl-10 pr-4"
              :class="[
                active
                  ? 'bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-200 '
                  : 'text-gray-700 dark:text-gray-400',
                index === 0 ? 'rounded-t-2xl' : '',
                index === items.length - 1 ? 'rounded-b-2xl' : '',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                ><slot name="item" v-bind="{ item }">{{ item }}</slot></span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary"
              >
                <b-icon-check-lg class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<style scoped lang="scss">
.listbox-btn {
  transition: background-color 0.3s ease-in-out;
}
</style>

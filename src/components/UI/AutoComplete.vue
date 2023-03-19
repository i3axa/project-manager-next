<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';
import { BIconCheckLg, BIconChevronExpand } from 'bootstrap-icons-vue';

interface IProps {
  items: unknown[];
  displayValue: (item: unknown) => string;
  itemKey: string;
  modelValue: any;
  query: string;
}

interface IEmits {
  (eventName: 'update:modelValue', modelValue: any): void;
  (eventName: 'update:query', query: string): void;
}

const props = defineProps<IProps>();
defineEmits<IEmits>();

const filtered = computed<any[]>(() =>
  props.query === ''
    ? props.items
    : props.items.filter((item) =>
        props
          .displayValue(item)
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(props.query.toLowerCase().replace(/\s+/g, ''))
      )
);
</script>

<template>
  <Combobox
    :model-value="modelValue"
    @update:model-value="(_value) => $emit('update:modelValue', _value)"
  >
    <div class="relative">
      <div class="relative w-full cursor-default form-control">
        <ComboboxInput
          class="form-control w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
          :displayValue="displayValue"
          @change="$emit('update:query', $event.target.value)"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <BIconChevronExpand
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="$emit('update:query', '')"
      >
        <ComboboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="filtered.length === 0 && query !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-white"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="item in filtered"
            as="template"
            :key="item[itemKey]"
            :value="item"
            v-slot="{ selected, active }"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4 dark:text-gray-300"
              :class="{
                'bg-secondary text-white': active,
                'text-gray-900': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ displayValue(item) }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-secondary': !active }"
              >
                <BIconCheckLg class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

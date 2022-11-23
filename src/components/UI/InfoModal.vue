<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';

interface IProps {
  isOpen: boolean;
}

interface IEmits {
  close: () => void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="$emit('close')" class="relative z-30">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-3xl bg-white dark:bg-dark p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
              >
                <slot name="header"></slot>
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  <slot name="content"></slot>
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="btn-info text-sm focus:ring-0"
                  @click="$emit('close')"
                >
                  <slot name="close-button">{{ $t('modal.close') }}</slot>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped lang="scss"></style>

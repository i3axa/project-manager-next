<script setup lang="ts">
import ProjectService from '@/services/ProjectService';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import { reactive } from 'vue';
import { useStyleStore } from '@/store/style';
import EmployeesService from '@/services/EmployeesService';
import { EmployeeSpeciality } from '@/types/API';

interface IProps {
  isOpen: boolean;
}

interface IEmits {
  (eventName: 'update:isOpen', isOpen: boolean): void;
}

defineProps<IProps>();
defineEmits<IEmits>();

const styleStore = useStyleStore();

const model = reactive({ description: '', title: '' });

const onSubmit = async () => {
  styleStore.setIsGlobalSpinnerShown(true);

  const projectResponse = await ProjectService.createProject({
    ...model,
    isPrivate: false,
  });

  await EmployeesService.createEmployee({
    project: projectResponse.data.project._id,
    speciality: EmployeeSpeciality.MANAGER,
  });

  styleStore.setIsGlobalSpinnerShown(false);
};
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog
      as="div"
      @close="$emit('update:isOpen', false)"
      class="relative z-10"
    >
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
          class="flex min-h-full items-center justify-center p-3 text-center"
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
              class="w-full max-w-md transform rounded-3xl bg-white dark:bg-dark p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
              >
                {{ $t('project.create') }}
              </DialogTitle>
              <form
                class="mt-5 flex flex-col items-center gap-2"
                @submit.prevent="onSubmit"
              >
                <input
                  class="form-control w-full"
                  type="text"
                  :placeholder="$t('project.title')"
                  v-model="model.title"
                />
                <input
                  class="form-control w-full"
                  type="text"
                  :placeholder="$t('project.description')"
                  v-model="model.description"
                />

                <button class="btn-info mt-2 mb-6" type="submit">
                  {{ $t('project.submit') }}
                </button>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

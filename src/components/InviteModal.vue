<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import { watchDebounced } from '@vueuse/core';
import type IProject from '@/models/IProject';
import InvitationsService from '@/services/InvitationsService';
import { EmployeeSpeciality } from '@/types/API';
import { reactive, ref, computed } from 'vue';
import AutoComplete from './UI/AutoComplete.vue';
import useUsers from '@/hooks/useUsers';
import type IUserDto from '@/models/dto/IUserDto';
import useEmployees from '@/hooks/useEmployees';
import MiniLoadingSpinner from './UI/MiniLoadingSpinner.vue';
import { useStyleStore } from '@/store/style';

interface IProps {
  project: IProject;
  isOpen: boolean;
}

interface IEmits {
  (eventName: 'update:isOpen', isOpen: boolean): void;
}

const props = defineProps<IProps>();
defineEmits<IEmits>();

const styleStore = useStyleStore();

const { users: usersData, refetch } = useUsers({ _limit: 10 });
const { employees, isLoading: isEmployeesLoading } = useEmployees({
  project: props.project._id,
});

const users = computed(() =>
  usersData.value.filter(
    (u) => !employees.value.find((e) => e.user._id === u._id)
  )
);

const model = reactive({
  user: users.value[0],
  speciality: EmployeeSpeciality.EXECUTOR,
});

const searchQuery = ref('');

watchDebounced(
  searchQuery,
  () => {
    refetch({ _limit: 5, searchEmail: searchQuery.value });
  },
  { debounce: 1000, maxWait: 5000 }
);

const onSubmit = async () => {
  if (!model.user) {
    return;
  }

  styleStore.setIsGlobalSpinnerShown(true);

  await InvitationsService.createInvitation({
    speciality: model.speciality,
    user: model.user._id,
    project: props.project._id,
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
                {{ $t('project.invite') }}
              </DialogTitle>
              <MiniLoadingSpinner v-if="isEmployeesLoading" />
              <form
                v-else
                class="mt-5 flex flex-col items-center gap-2"
                @submit.prevent="onSubmit"
              >
                <AutoComplete
                  class="w-full"
                  :items="users"
                  :display-value="(user) => (user as IUserDto).email"
                  :item-key="'_id'"
                  v-model:query="searchQuery"
                  v-model="model.user"
                />

                <select class="form-control w-full" v-model="model.speciality">
                  <option
                    v-for="key in EmployeeSpeciality"
                    :key="key"
                    :value="key"
                  >
                    {{ $t(`speciality.${key}`) }}
                  </option>
                </select>

                <button class="btn-info mt-12" type="submit">
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

<style scoped lang="scss"></style>

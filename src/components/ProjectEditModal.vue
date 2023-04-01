<script setup lang="ts">
import {
  useDeleteEmployee,
  useDeleteProject,
  useEmployees,
  usePatchProject,
  useProject,
} from '@/api';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import { BIconPersonX, BIconTrash } from 'bootstrap-icons-vue';
import { reactive, watch, ref, computed } from 'vue';
import ConfirmModal from '@/components/UI/ConfirmModal.vue';
import { EmployeeSpeciality, type EmployeesQuery, type Id } from '@/types/API';
import { useStyleStore } from '@/store/style';

interface IProps {
  isOpen: boolean;
  projectId: string;
}

interface IEmits {
  (eventName: 'update:isOpen', isOpen: boolean): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const styleStore = useStyleStore();

const employeesQuery: [string, EmployeesQuery] = [
  'employees',
  {
    project: props.projectId,
    speciality: EmployeeSpeciality.EXECUTOR,
  },
];

const { data: project, isLoading } = useProject(['projects', props.projectId]);
const { data: employees } = useEmployees(employeesQuery);

const { mutateAsync: deleteEmployee } = useDeleteEmployee(employeesQuery);

const { mutateAsync: patchProject } = usePatchProject();
const { mutateAsync: deleteProject } = useDeleteProject();

let model = reactive({ description: '', title: '' });
watch(
  project,
  () => {
    if (project) {
      model = { ...model, ...project.value };
    }
  },
  { immediate: true }
);

const onSubmit = async () => {
  if (!project.value) {
    return;
  }

  styleStore.setIsGlobalSpinnerShown(true);

  await patchProject({ id: project.value._id, data: model });

  styleStore.setIsGlobalSpinnerShown(false);
};

const isDeleteEmployeeModalOpen = ref(false);
const isDeleteProjectModalOpen = ref(false);
const selectedEmployee = ref<Id | null>(null);

const onDeleteEmployee = computed(() => async () => {
  if (selectedEmployee.value === null) {
    return null;
  }

  styleStore.setIsGlobalSpinnerShown(true);

  await deleteEmployee(selectedEmployee.value);

  styleStore.setIsGlobalSpinnerShown(false);

  isDeleteEmployeeModalOpen.value = false;
});

const onProjectDelete = async () => {
  styleStore.setIsGlobalSpinnerShown(true);

  await deleteProject(props.projectId);

  styleStore.setIsGlobalSpinnerShown(false);

  isDeleteProjectModalOpen.value = false;
  emit('update:isOpen', false);
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
                {{ $t('project.edit') }}
              </DialogTitle>
              <form
                class="mt-5 flex flex-col items-center gap-2"
                v-if="!isLoading && project"
                @submit.prevent="onSubmit"
              >
                <input
                  class="form-control w-full"
                  type="text"
                  v-model="model.title"
                />
                <input
                  class="form-control w-full"
                  type="text"
                  v-model="model.description"
                />

                <button class="btn-info mt-2 mb-6" type="submit">
                  {{ $t('project.submit') }}
                </button>

                <div
                  class="flex flex-row w-full justify-between max-[470px]:flex-col"
                >
                  <p class="text-error mx-auto" v-if="employees.length === 0">
                    {{ $t('project.noEmployees') }}
                  </p>

                  <select
                    v-if="employees.length !== 0"
                    class="form-control min-[470px]:max-w-[345px] max-[470px]:w-full"
                    v-model="selectedEmployee"
                  >
                    <option
                      v-for="employee in employees"
                      :key="employee._id"
                      :value="employee._id"
                    >
                      {{ employee.user.name }} {{ employee.user.surname }} ({{
                        employee.user.email
                      }})
                    </option>
                  </select>

                  <button
                    v-if="employees.length !== 0"
                    class="btn-error max-[470px]:mt-3 max-[470px]:items-center max-[470px]:justify-center"
                    type="button"
                    @click="isDeleteEmployeeModalOpen = true"
                  >
                    <b-icon-person-x />
                  </button>

                  <ConfirmModal
                    v-if="employees.length !== 0"
                    :is-open="isDeleteEmployeeModalOpen"
                    @continue="onDeleteEmployee"
                    @cancel="isDeleteEmployeeModalOpen = false"
                  />
                </div>

                <button
                  class="btn-error w-full mt-12 items-center justify-center"
                  type="button"
                  @click="isDeleteProjectModalOpen = true"
                >
                  <b-icon-trash /> {{ $t('project.delete') }}
                </button>

                <ConfirmModal
                  :is-open="isDeleteProjectModalOpen"
                  @continue="onProjectDelete"
                  @cancel="isDeleteProjectModalOpen = false"
                />
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

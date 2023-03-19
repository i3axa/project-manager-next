<script setup lang="ts">
import useEmployees from '@/hooks/useEmployees';
import useUser from '@/hooks/useUser';
import type IProject from '@/models/IProject';
import { useAuthStore } from '@/store/auth';
import { BIconPersonPlus, BIconPencil } from 'bootstrap-icons-vue';
import { computed, ref } from 'vue';
import ProjectEditModal from '@/components/ProjectEditModal.vue';
import InviteModal from './InviteModal.vue';

interface IProps {
  project: IProject;
}

const props = defineProps<IProps>();

const isEditModalOpen = ref(false);

const { employees } = useEmployees({
  project: props.project._id,
});

const authStore = useAuthStore();

if (!authStore.credentials.user) {
  throw new Error('User is not authorized');
}

const { user } = useUser(authStore.credentials.user.id);

const isUserManager = computed(
  () =>
    !!employees.value.find(
      (e) => e.speciality === 'MANAGER' && e.user.email === user.value?.email
    )
);

const isUserExecutor = computed(
  () =>
    !!employees.value.find(
      (e) => e.speciality === 'EXECUTOR' && e.user.email === user.value?.email
    )
);

const isInviteModalOpen = ref(false);
</script>

<template>
  <div
    class="card p-5 flex flex-col flex-none min-h-[250px] min-w-[250px] justify-between dark:text-gray-200"
    v-if="isUserManager || isUserExecutor"
  >
    <header class="flex flex-row justify-between items-center">
      <div class="max-w-[208px]">
        <div class="text-2xl font-semibold">{{ project.title }}</div>
        <p class="text-lg">{{ project.description }}</p>
      </div>

      <button
        v-if="isUserManager"
        class="btn-info"
        @click="isEditModalOpen = true"
      >
        <b-icon-pencil />
      </button>
    </header>

    <footer>
      <button class="btn-outline-secondary" @click="isInviteModalOpen = true">
        <b-icon-person-plus class="text-xl" /> {{ $t('project.invite') }}
      </button>
    </footer>

    <ProjectEditModal
      v-if="isUserManager"
      v-model:is-open="isEditModalOpen"
      :project-id="project._id"
    />
    <InviteModal :project="project" v-model:is-open="isInviteModalOpen" />
  </div>
</template>

<style scoped lang="scss"></style>

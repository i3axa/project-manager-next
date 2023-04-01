<script setup lang="ts">
import ProjectCard from '@/components/ProjectCard.vue';
import InvitationCard from '@/components/InvitationCard.vue';
import { useAuthStore } from '@/store/auth';
import { BIconPlusLg } from 'bootstrap-icons-vue';
import CreateProjectModal from '@/components/CreateProjectModal.vue';
import { ref } from 'vue';
import { useInvitations, useProjects } from '@/api/queries';

const authStore = useAuthStore();

if (!authStore.credentials.user) {
  throw new Error('User is not authorized');
}

const { data: projects } = useProjects();

const { data: invitations } = useInvitations([
  'invitations',
  {
    user: authStore.credentials.user.id,
  },
]);

const isCreateProjectModalOpen = ref(false);
</script>

<template>
  <div class="flex flex-col">
    <header class="flex flex-row gap-4 items-end">
      <h2 style="line-height: 2.15rem">{{ $t('project.myProjects') }}</h2>
      <button
        class="btn-outline-secondary px-2 py-2 text-xs"
        @click="isCreateProjectModalOpen = true"
      >
        <b-icon-plus-lg />
      </button>
    </header>
    <div class="flex flex-row flex-wrap items-center gap-6 py-5">
      <ProjectCard
        v-for="project in projects"
        :key="project._id"
        :project="project"
      />
    </div>

    <header>
      <h2 style="line-height: 2.15rem">{{ $t('project.myInvitations') }}</h2>
    </header>
    <div class="flex flex-row flex-wrap items-center gap-6 py-5">
      <InvitationCard
        v-for="invitation in invitations"
        :key="invitation._id"
        :invitation="invitation"
      />
    </div>

    <CreateProjectModal v-model:is-open="isCreateProjectModalOpen" />
  </div>
</template>

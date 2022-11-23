<script setup lang="ts">
import DropDown from '@/components/UI/DropDown.vue';
import type ITask from '@/models/ITask';
import { MenuItem } from '@headlessui/vue';
import InfoModal from '@/components/UI/InfoModal.vue';
import { ref } from 'vue';
import FileCard from '@/components/FileCard.vue';
import {
  BIconThreeDots,
  BIconInfoLg,
  BIconPencil,
  BIconXLg,
  BIconTrash2,
} from 'bootstrap-icons-vue';

interface IProps {
  task: ITask;
}

interface IEmits {
  (eventName: 'taskDelete'): void;
  (eventName: 'taskRemove'): void;
}

defineProps<IProps>();
defineEmits<IEmits>();

const isModalOpen = ref(false);
</script>

<template>
  <DropDown v-if="!isModalOpen" :position="'upLeft'">
    <template #title>
      <b-icon-three-dots class="text-2xl" />
    </template>
    <template #items>
      <MenuItem v-slot="{ active }" @click="isModalOpen = true">
        <div
          class="drop-down-item unselectable rounded-t-2xl"
          :class="[
            active
              ? 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-200 '
              : 'text-gray-900 dark:text-gray-400',
          ]"
        >
          <b-icon-info-lg /> {{ $t('dashboard.info') }}
        </div>
      </MenuItem>
      <MenuItem
        v-slot="{ active }"
        @click="$router.push(`taskUpdate/${task._id}`)"
      >
        <div
          class="drop-down-item unselectable"
          :class="[
            active
              ? 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-200 '
              : 'text-gray-900 dark:text-gray-400',
          ]"
        >
          <b-icon-pencil /> {{ $t('dashboard.edit') }}
        </div>
      </MenuItem>
      <MenuItem v-slot="{ active }" @click="$emit('taskRemove')">
        <div
          class="drop-down-item unselectable"
          :class="[
            active
              ? 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-200 '
              : 'text-gray-900 dark:text-gray-400',
          ]"
        >
          <b-icon-x-lg /> {{ $t('dashboard.remove') }}
        </div>
      </MenuItem>
      <MenuItem v-slot="{ active }" @click="$emit('taskDelete')">
        <div
          class="drop-down-item unselectable rounded-b-2xl"
          :class="[
            active
              ? 'bg-gray-100 dark:bg-gray-600 text-error/70'
              : 'text-error',
          ]"
        >
          <b-icon-trash-2 /> {{ $t('dashboard.delete') }}
        </div>
      </MenuItem>
    </template>
  </DropDown>
  <InfoModal
    class="position-relative"
    v-else
    :is-open="isModalOpen"
    @close="isModalOpen = false"
  >
    <template #header>{{ task.title }}</template>
    <template #content>
      <div v-html="task.description"></div>
      <div>Deadline: {{ new Date(task.deadline).toLocaleString() }}</div>
      <div class="files-row">
        <FileCard
          class="max-w-max w-28"
          v-for="attachment in task.attachments"
          :file-name="attachment.split('-', 2)[1]"
          :link="attachment"
          :not-interactive="true"
        ></FileCard>
      </div>
    </template>
  </InfoModal>
</template>

<style scoped lang="scss">
.drop-down-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  padding: 0.5rem 1rem 0.5rem 1rem;
}

.files-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding-left: 4px;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>

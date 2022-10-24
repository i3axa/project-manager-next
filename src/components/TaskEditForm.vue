<script setup lang="ts">
import DateTimePicker from '@/components/UI/DateTimePicker.vue';
import RichText from '@/components/UI/RichText.vue';
import { reactive, ref, watch, type Ref } from 'vue';
import type ITask from '@/models/ITask';
import FileCard from '@/components/FileCard.vue';
import { useAuthStore } from '@/store/auth';
import useTouchDeviceDetection from '@/hooks/useTouchDeviceDetection';

const authStore = useAuthStore();
const { isTouchDevice } = useTouchDeviceDetection();

interface IProps {
  task: Partial<ITask>;
  files: File[];
}

interface IEmits {
  (eventName: 'submit'): void;
  (eventName: 'update:task', task: Partial<ITask>): void;
  (eventName: 'update:files', files: File[]): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

if (!props.task?.attachments) {
  emit('update:task', { ...props.task, attachments: [] });
}

const deadline = ref(props.task.deadline || '');
watch(deadline, (deadline) => emit('update:task', { ...props.task, deadline }));

const fileInput = ref<HTMLInputElement>();

const triggerFilesInput = () => {
  fileInput.value?.click();
};

const onFileInputChange = () => {
  if (!fileInput.value) {
    return;
  }

  emit('update:files', Array.from(fileInput.value.files || []));

  fileInput.value.value = '';
};

const onFileDelete = (index: number) => {
  const files = [...props.files];
  files.splice(index, 1);

  emit('update:files', files);
};

const onAttachmentDelete = (index: number) => {
  const task = { ...props.task };
  task.attachments?.splice(index, 1);

  emit('update:task', task);
};

const submit = () => {
  emit('submit');

  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

if (!authStore.credentials.user) {
  throw new Error('User is not logged in');
}

const userId = authStore.credentials.user.id;
const fileLink = import.meta.env.VITE_STORAGE_URL + `${userId}/`;

const onFileDrop = (event: DragEvent) => {
  const newFiles = Array.from(event.dataTransfer?.files || []);

  emit('update:files', [...props.files, ...newFiles]);

  const filesRow = document.getElementById('files-row');

  filesRow?.classList.remove('drag-enter');
};

const onFileEnter = () => {
  const filesRow = document.getElementById('files-row');
  filesRow?.classList.add('drag-enter');
};

const onFileLeave = () => {
  const filesRow = document.getElementById('files-row');
  filesRow?.classList.remove('drag-enter');
};
</script>

<template>
  <form
    class="task-form"
    @submit.prevent="submit"
    @dragover.prevent
    @drop.prevent
  >
    <div class="form-group">
      <b-icon-card-heading class="text-xl dark:text-light" />
      <input
        class="form-control"
        v-model="task.title"
        :placeholder="$t('task.title')"
        type="text"
        required
      />
    </div>
    <div class="form-group">
      <b-icon-card-text class="text-xl dark:text-light min-w-max" />
      <RichText
        class="grow"
        :placeholder="$t('task.description')"
        v-model="task.description"
      />
    </div>
    <div class="form-group">
      <b-icon-123 class="text-xl dark:text-light" />
      <input
        class="form-control"
        v-model="task.difficulty"
        :placeholder="$t('task.difficulty') + ' (1 - 10)'"
        type="number"
        min="1"
        max="10"
        required
      />
    </div>
    <div class="form-group">
      <b-icon-calendar-check class="text-xl dark:text-light" />
      <DateTimePicker
        :placeholder="$t('task.deadline')"
        v-model="deadline"
        required
      />
    </div>
    <div
      class="files-row border-gray-300 dark:border-gray-400"
      :class="isTouchDevice() ? '!border-none !min-h-0' : ''"
      id="files-row"
      @drop="onFileDrop"
      @dragenter="onFileEnter"
      @dragleave="onFileLeave"
    >
      <div
        class="drag-tip text-lg text-gray-500 dark:text-gray-300 unselectable"
        v-if="!isTouchDevice()"
        v-show="task.attachments?.length === 0 && files.length === 0"
      >
        <b-icon-paperclip /> {{ $t('createTask.dropFiles') }}
      </div>

      <FileCard
        v-for="(attachment, index) in task.attachments"
        :file-name="attachment.split('-', 2)[1]"
        :link="fileLink + attachment"
        @delete="onAttachmentDelete(index)"
      />
      <FileCard
        v-for="(file, index) in files"
        :fileName="file.name"
        @delete="onFileDelete(index)"
      />
    </div>
    <div class="form-group buttons">
      <button
        class="btn-outline-secondary"
        type="button"
        @click="triggerFilesInput"
      >
        <input
          id="attachments-input"
          type="file"
          ref="fileInput"
          multiple
          hidden
          @change="onFileInputChange"
        />
        <b-icon-paperclip />
        {{ $t('createTask.attach') }}
      </button>
      <button class="btn-outline-primary" type="submit">
        <b-icon-check-lg /> {{ $t('createTask.submit') }}
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.task-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.form-group,
.files-row {
  display: flex;
  flex-direction: row;
  width: 50%;
  gap: 10px;
  align-items: center;
}

.files-row {
  overflow-x: auto;
  padding: 1rem;
  min-height: 70px;
  border-width: 2px;
  border-radius: 1.5rem;
  border-style: dashed;
  transition: border-color 0.2s linear;
}

.files-row.drag-enter {
  @apply border-secondary;
}

.drag-tip {
  pointer-events: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  margin: auto;
  font-weight: 300;
  font-style: italic;
}

@media only screen and (max-width: 1200px) {
  .form-group,
  .files-row {
    width: 80%;
    max-width: 80%;
  }
}

@media only screen and (max-width: 768px) {
  .form-group,
  .files-row {
    width: 100%;
    max-width: 100%;
  }
}

@media only screen and (max-width: 468px) {
  .buttons {
    flex-direction: column;
  }

  .buttons > button {
    max-width: none !important;
    width: 100%;
    justify-content: center;
  }
}

.buttons > button {
  max-width: max-content;
}

.form-control {
  flex-grow: 1;
}
</style>

<script setup lang="ts">
import DateTimePicker from '@/components/UI/DateTimePicker.vue';
import RichText from '@/components/UI/RichText.vue';
import { ref } from 'vue';
import type ITask from '@/models/ITask';
import FileIcon from '@/components/FileIcon.vue';

interface IProps {
  task?: Partial<ITask>;
}

interface IEmits {
  (eventName: 'submit', task: Partial<ITask>, files?: File[]): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const task = ref<Partial<ITask>>(props.task || {});

const fileInput = ref<HTMLInputElement>();
const fileList = ref<File[]>();

const triggerFilesInput = () => {
  fileInput.value?.click();
};

const onFileInputChange = () => {
  if (!fileInput.value) {
    return;
  }

  fileList.value = Array.from(fileInput.value.files || []);
  fileInput.value.value = '';
};

const onFileDelete = (fileIndex: number) => {
  fileList.value?.splice(fileIndex, 1);
};

const submit = () => {
  emit('submit', task.value as Partial<ITask>, fileList.value);

  if (fileInput.value) {
    fileInput.value.value = '';
    fileList.value = [];
  }
};

const fileLink = import.meta.env.VITE_API_URL + '/static/uploads/';
</script>

<template>
  <form class="task-form" @submit.prevent="submit">
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
        v-model="task.deadline"
        required
      />
    </div>
    <div class="files-row">
      <FileIcon
        v-for="(attachment, index) in props.task?.attachments"
        :file-name="attachment"
        :link="fileLink + attachment"
        @delete="props.task?.attachments?.splice(index, 1)"
      />
      <FileIcon
        v-for="(file, index) in fileList"
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
  padding: 0rem 1rem 1rem 1rem;
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

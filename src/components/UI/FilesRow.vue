<script setup lang="ts">
import useTouchDeviceDetection from '@/hooks/useTouchDeviceDetection';
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import FileCard from '@/components/FileCard.vue';
import { BIconPaperclip } from 'bootstrap-icons-vue';

type ModelValue = { name: string; link?: string };

interface IProps {
  modelValue: ModelValue[];
}

interface IEmits {
  (eventName: 'update:modelValue', value: ModelValue[]): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const { isTouchDevice } = useTouchDeviceDetection();

const authStore = useAuthStore();

if (!authStore.credentials.user) {
  throw new Error('User is not logged in');
}

const userId = authStore.credentials.user.id;

const fileLink = import.meta.env.VITE_STORAGE_URL + `${userId}/`;

const element = ref<HTMLElement>();

const onFileDrop = (event: DragEvent) => {
  const newFiles = Array.from(event.dataTransfer?.files || []);

  emit('update:modelValue', [...props.modelValue, ...newFiles]);

  element.value?.classList.remove('drag-enter');
};

const onFileDelete = (index: number) => {
  const files = [...props.modelValue];
  files.splice(index, 1);

  emit('update:modelValue', files);
};

const onFileEnter = () => {
  element.value?.classList.add('drag-enter');
};

const onFileLeave = () => {
  element.value?.classList.remove('drag-enter');
};
</script>

<template>
  <div
    class="outer border-gray-300 dark:border-gray-400"
    :class="isTouchDevice() ? '!border-none !min-h-0' : ''"
    ref="element"
    @drop="onFileDrop"
    @dragenter="onFileEnter"
    @dragleave="onFileLeave"
  >
    <div
      class="drag-tip text-lg text-gray-500 dark:text-gray-300 unselectable"
      v-if="!isTouchDevice()"
      v-show="modelValue.length === 0"
    >
      <b-icon-paperclip /> {{ $t('createTask.dropFiles') }}
    </div>
    <FileCard
      v-for="(file, index) in modelValue"
      :fileName="file.name"
      :link="file.link ? fileLink + file.link : undefined"
      :key="file.link ? file.link : file.name"
      @delete="onFileDelete(index)"
    />
  </div>
</template>

<style scoped lang="scss">
.outer {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  overflow-x: auto;
  padding: 1rem;
  min-height: 70px;
  border-width: 2px;
  border-radius: 1.5rem;
  border-style: dashed;
  transition: border-color 0.2s linear;
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

.outer.drag-enter {
  @apply border-secondary;
}
</style>

<script setup lang="ts">
import TooltipPopper from '@/components/UI/TooltipPopper.vue';
import FileExtensionIcon from '@/components/FileExtensionIcon.vue';

interface IProps {
  fileName: string;
  link?: string;
}

interface IEmits {
  (eventName: 'delete'): void;
}

defineEmits<IEmits>();
const props = defineProps<IProps>();

const openLink = () => {
  if (props.link) {
    window.open(props.link, '_blank');
  }
};
</script>

<template>
  <div class="relative">
    <button type="button" class="close-btn bg-white" @click="$emit('delete')">
      <b-icon-x-lg class="text-sm" />
    </button>
    <TooltipPopper :text="fileName">
      <div class="card file-card" @click="openLink">
        <FileExtensionIcon
          :extension="fileName.substring(fileName.lastIndexOf('.') + 1)"
          class="text-5xl self-center"
        />
        <h6 class="file-name text-gray-400 dark:text-gray-500">
          {{ fileName }}
        </h6>
      </div>
    </TooltipPopper>
  </div>
</template>

<style scoped lang="scss">
.file-card {
  margin-top: 5px;
  margin-right: 5px;
  padding: 8px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  min-width: 100px;
  max-width: 150px;
  cursor: pointer;
}

.close-btn {
  position: absolute;
  right: 0px;
  padding: 0.25rem;
  border-radius: 1rem;
  transition: opacity 0.15s ease-in-out;
}

.file-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.close-btn:hover {
  opacity: 0.7;
}

.close-btn:active {
  opacity: 0.4;
}
</style>

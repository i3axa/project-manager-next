<script setup lang="ts">
import CropperStencil from '@/components/UI/Cropper/CropperStencil.vue';
import { ref } from 'vue';
import { Cropper, type CropperElement } from 'vue-advanced-cropper';
import { BIconDownload, BIconCheckLg } from 'bootstrap-icons-vue';
import 'vue-advanced-cropper/dist/style.css';

interface IEmits {
  (eventName: 'imageCropped', blob: Blob): void;
}

interface IProps {
  imageUrl: string;
}

const emit = defineEmits<IEmits>();
defineProps<IProps>();

const element = ref<CropperElement>();

const getBlob = async () => {
  return await new Promise<Blob | null>((resolve) =>
    element.value?.getResult().canvas.toBlob((blob) => resolve(blob))
  );
};

const onConfirm = async () => {
  const blob = await getBlob();

  if (!blob) {
    return;
  }

  emit('imageCropped', blob);
};

const download = async () => {
  const blob = await getBlob();

  if (!blob) {
    return;
  }

  const url = URL.createObjectURL(blob);
  console.log(url);
  const a = document.createElement('a');

  a.href = url;
  a.download = 'avatar';

  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener('click', clickHandler);
    }, 150);
  };

  a.addEventListener('click', clickHandler, false);
  a.click();
};
</script>

<template>
  <section class="flex flex-col gap-2">
    <div class="cropper-wrapper">
      <div
        :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
        class="image-background"
      />
      <cropper
        class="cropper"
        backgroundClass="!bg-transparent"
        ref="element"
        :src="imageUrl"
        image-class="select-none rounded-lg absolute origin-center !max-w-none overflow-hidden opacity-20 transition-opacity"
        image-restriction="none"
        :debounce="false"
        :stencil-component="CropperStencil"
        :stencil-props="{ aspectRatio: 1 / 1 }"
      />
    </div>
    <footer class="flex flex-row justify-evenly">
      <button class="btn-flat" @click="download">
        <b-icon-download /> Download
      </button>
      <button class="btn-flat" @click="onConfirm">
        <b-icon-check-lg /> Confirm
      </button>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.cropper {
  height: 400px;
  width: 400px;
}

.cropper-wrapper {
  overflow: hidden;
  position: relative;
  background: black;
  border-radius: 2rem;
}

.image-background {
  position: absolute;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  left: -10px;
  top: -10px;
  background-size: cover;
  background-position: 50%;
  filter: blur(10px);
}
</style>

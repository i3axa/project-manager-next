<script setup lang="ts">
import ImageCropper from '@/components/UI/Cropper/ImageCropper.vue';

const img =
  'https://advanced-cropper.github.io/vue-advanced-cropper/assets/img/photo-1542571255-84471dc5581c.eeae35ce.jpg';

const onImageCropped = (blob: Blob) => {
  const file = new File([blob], 'image', {
    type: blob.type,
  });

  console.log(file);
};
</script>

<template>
  <div>
    <h1>Nothing</h1>
    <ImageCropper :image-url="img" @image-cropped="onImageCropped" />
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
interface IProps {
  extension: string;
}

defineProps<IProps>();
</script>

<template>
  <b-icon-file-earmark-pdf class="text-red-700" v-if="extension === 'pdf'" />
  <b-icon-file-earmark-ppt
    class="text-orange-700"
    v-else-if="extension === 'ppt' || extension === 'pptx'"
  />
  <b-icon-file-earmark-word
    class="text-blue-700"
    v-else-if="extension === 'doc' || extension === 'docx'"
  />
  <b-icon-file-earmark-excel
    class="text-green-700"
    v-else-if="extension === 'xls' || extension === 'xlsx'"
  />
  <b-icon-file-earmark-music
    class="text-indigo-700"
    v-else-if="
      extension === 'mp3' ||
      extension === 'wav' ||
      extension === 'flac' ||
      extension === 'aac' ||
      extension === 'ogg'
    "
  />
  <b-icon-file-earmark-text
    class="text-gray-500"
    v-else-if="extension === 'txt'"
  />
  <b-icon-file-earmark-zip
    class="text-purple-700"
    v-else-if="
      extension === 'zip' ||
      extension === 'rar' ||
      extension === 'tar' ||
      extension === 'gz' ||
      extension === '7z'
    "
  />
  <b-icon-file-earmark-image
    class="text-green-700"
    v-else-if="
      extension === 'png' || extension === 'jpg' || extension === 'svg'
    "
  />
  <b-icon-file-earmark-binary v-else />
</template>

<style scoped lang="scss"></style>

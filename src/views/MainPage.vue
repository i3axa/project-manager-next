<script setup lang="ts">
import { ref } from 'vue';
import useTheme from '@/hooks/useTheme';
import useLocale from '@/hooks/useLocale';
import RadioButton from '@/components/UI/RadioButton.vue';
import { Theme } from '@/hooks/useTheme';
import ListBox from '@/components/UI/ListBox.vue';
import InfoModal from '@/components/UI/InfoModal.vue';
import store from '@/store';
import { StyleMutations } from '@/store/modules/style';

const { theme } = useTheme();
const { i18n, getLanguageName } = useLocale();

const isModalOpen = ref(false);
</script>

<template>
  <div>
    <fieldset>
      <legend
        class="contents text-base font-medium text-gray-900 dark:text-gray-200"
      >
        {{ $t('themes.theme') }}
      </legend>
      <div class="mt-4 space-y-4">
        <RadioButton :id="'theme-light'" :value="Theme.light" v-model="theme">
          {{ $t('themes.light') }}
        </RadioButton>
        <RadioButton :id="'theme-dark'" :value="Theme.dark" v-model="theme">
          {{ $t('themes.dark') }}
        </RadioButton>
        <RadioButton :id="'theme-system'" :value="Theme.system" v-model="theme">
          {{ $t('themes.system') }}
        </RadioButton>
      </div>
    </fieldset>
    <fieldset class="mt-4">
      <legend
        class="contents text-base font-medium text-gray-900 dark:text-gray-200"
      >
        {{ $t('languages.language') }}
      </legend>
      <div class="mt-4">
        <ListBox
          :items="$i18n.availableLocales"
          v-model="i18n.locale.value"
          class="w-40"
        >
          <template #title="{ modelValue }">
            {{ getLanguageName(modelValue as string) }}
          </template>
          <template #item="{ item }">
            {{ getLanguageName(item as string) }}
          </template>
        </ListBox>
      </div>
    </fieldset>
    <div>
      <button class="btn-primary mt-3" @click="isModalOpen = true">
        <b-icon-grid class="mr-1" />Open
      </button>
    </div>
    <div>
      <button
        class="btn-outline-primary mt-3"
        @click="store.commit(StyleMutations.setIsGlobalSpinnerShown, true)"
      >
        <b-icon-grid class="mr-1" />Spinner
      </button>
    </div>
    <div>
      <button class="btn-secondary mt-3">
        <b-icon-pen class="mr-1" />Test
      </button>
    </div>
    <div>
      <button class="btn-info mt-3"><b-icon-pen class="mr-1" />Test</button>
    </div>
    <div>
      <button class="btn-dark mt-3"><b-icon-pen class="mr-1" />Test</button>
    </div>
    <div>
      <button class="btn-light my-3"><b-icon-pen class="mr-1" />Test</button>
    </div>
    <InfoModal :isOpen="isModalOpen" @close="isModalOpen = false">
      <template #header>Payment successful</template>
      <template #content
        >Your payment has been successfully submitted. We’ve sent you an email
        with all of the details of your order.</template
      >
      <template #close-button>{{ $t('modal.closeInfo') }}</template>
    </InfoModal>
  </div>
</template>

<style scoped lang="scss"></style>

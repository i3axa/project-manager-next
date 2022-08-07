<script setup lang="ts">
import { ref } from 'vue';
import useTheme from '@/hooks/useTheme';
import useLocale from '@/hooks/useLocale';
import RadioButton from '@/components/UI/RadioButton.vue';
import { Theme } from '@/hooks/useTheme';
import ListBox from '@/components/UI/ListBox.vue';
import InfoModal from '@/components/UI/InfoModal.vue';
import DropDown from '@/components/UI/DropDown.vue';
import store from '@/store';
import { StyleActions } from '@/store/modules/style';

const { theme } = useTheme();
const { i18n, getLanguageName } = useLocale();

const onThemeInput = (value: unknown) => {
  theme.value = value as Theme;
};

const onListBoxChange = (value: unknown) => {
  i18n.locale.value = value as string;
};

const onDropDownAction = (element: unknown) => {
  i18n.locale.value = element as string;
};

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
        <RadioButton
          :id="'theme-light'"
          :value="Theme.light"
          :model="theme"
          @input="onThemeInput"
        >
          {{ $t('themes.light') }}
        </RadioButton>
        <RadioButton
          :id="'theme-dark'"
          :value="Theme.dark"
          :model="theme"
          @input="onThemeInput"
        >
          {{ $t('themes.dark') }}
        </RadioButton>
        <RadioButton
          :id="'theme-system'"
          :value="Theme.system"
          :model="theme"
          @input="onThemeInput"
        >
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
          :initialValue="new Intl.Locale($i18n.locale).language"
          class="w-40"
          @change="onListBoxChange"
        >
          <template #title="{ selected }">
            {{ getLanguageName(selected) }}
          </template>
          <template #item="{ item }">
            {{ getLanguageName(item) }}
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
        @click="store.dispatch(StyleActions.enableGlobalSpinner)"
      >
        <b-icon-grid class="mr-1" />Spinner
      </button>
    </div>
    <InfoModal :isOpen="isModalOpen" @close="isModalOpen = false">
      <template #header>Payment successful</template>
      <template #content
        >Your payment has been successfully submitted. We’ve sent you an email
        with all of the details of your order.</template
      >
      <template #close-button>{{ $t('modal.closeInfo') }}</template>
    </InfoModal>
    <DropDown :items="i18n.availableLocales" @action="onDropDownAction">
      <template #title>
        {{ getLanguageName($i18n.locale) }}
        <b-icon-chevron-down class="-mr-1 ml-1 h-5" />
      </template>
      <template #item="{ element }">
        {{ getLanguageName(element as string) }}
      </template>
    </DropDown>
  </div>
</template>

<style scoped lang="scss"></style>

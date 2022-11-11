<script setup lang="ts">
import useLocale from '@/hooks/useLocale';
import RadioButton from '@/components/UI/RadioButton.vue';
import ListBox from '@/components/UI/ListBox.vue';
import { useTheme, ThemeValue } from '@/plugins/theme';

const { themeProvider } = useTheme();

const { i18n, getLanguageName } = useLocale();
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
          :value="ThemeValue.light"
          v-model="themeProvider.theme"
        >
          {{ $t('themes.light') }}
        </RadioButton>
        <RadioButton
          :id="'theme-dark'"
          :value="ThemeValue.dark"
          v-model="themeProvider.theme"
        >
          {{ $t('themes.dark') }}
        </RadioButton>
        <RadioButton
          :id="'theme-system'"
          :value="ThemeValue.system"
          v-model="themeProvider.theme"
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
  </div>
</template>

<style scoped lang="scss"></style>

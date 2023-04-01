<script setup lang="ts">
import useLocale from '@/hooks/useLocale';
import RadioButton from '@/components/UI/RadioButton.vue';
import ListBox from '@/components/UI/ListBox.vue';
import { useTheme, ThemeValue } from '@/plugins/theme';
import { computed, reactive, ref } from 'vue';
import useI18nValidators from '@/hooks/useI18nValidators';
import useVuelidate, { type ServerErrors } from '@vuelidate/core';
import ValidationInput from '@/components/UI/ValidationInput.vue';
import { usePutPassword } from '@/api';
import { useStyleStore } from '@/store/style';
import { AxiosError } from 'axios';
import type IValidationErrorResponse from '@/models/response/IValidationErrorResponse';

const { themeProvider } = useTheme();

const { i18n, getLanguageName } = useLocale();

const { mutateAsync: putPassword } = usePutPassword();

const styleStore = useStyleStore();

const validators = useI18nValidators();

const passwordModel = reactive({ oldPassword: '', newPassword: '' });

const rules = computed(() => {
  return {
    oldPassword: {
      required: validators.required,
    },
    newPassword: {
      required: validators.required,
    },
  };
});

const $externalResults = ref<ServerErrors>({});

const v$ = useVuelidate(rules, passwordModel, {
  $autoDirty: true,
  $externalResults,
});

const onSubmit = async () => {
  const validationResult = await v$.value.$validate();

  if (!validationResult) {
    return;
  }

  styleStore.setIsGlobalSpinnerShown(true);

  try {
    await putPassword(passwordModel);

    passwordModel.newPassword = '';
    passwordModel.oldPassword = '';

    v$.value.$reset();
  } catch (error) {
    if (error instanceof AxiosError) {
      const errors = (error?.response?.data as IValidationErrorResponse).fields;

      for (const key in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, key)) {
          const safeKey = key as keyof typeof errors;

          errors[safeKey] = i18n.t('auth.validator.' + errors[safeKey]);
        }
      }

      $externalResults.value = errors;
    }
  }

  styleStore.setIsGlobalSpinnerShown(false);
};
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
    <fieldset class="mt-4">
      <legend
        class="contents text-base font-medium text-gray-900 dark:text-gray-200"
      >
        Password
      </legend>
      <form class="mt-4 flex flex-col gap-2" @submit.prevent="onSubmit">
        <ValidationInput
          :validation="v$.oldPassword"
          :placeholder="$t('password.oldPassword')"
          type="password"
          @update:validation-model="(value) => (v$.oldPassword.$model = value)"
        />
        <ValidationInput
          :validation="v$.newPassword"
          :placeholder="$t('password.newPassword')"
          type="password"
          @update:validation-model="(value) => (v$.newPassword.$model = value)"
        />

        <button
          class="btn-primary mt-2 w-full flex items-center justify-center"
          type="submit"
        >
          {{ $t('password.submit') }}
        </button>
      </form>
    </fieldset>
  </div>
</template>

<style scoped lang="scss"></style>

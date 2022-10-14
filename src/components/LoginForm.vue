<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useStyleStore } from '@/store/style';
import useI18nValidators from '@/hooks/useI18nValidators';
import { useI18n } from 'vue-i18n';
import useVuelidate, { type ServerErrors } from '@vuelidate/core';
import ValidationInput from '@/components/UI/ValidationInput.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { AxiosError } from 'axios';
import type IValidationErrorResponse from '@/models/response/IValidationErrorResponse';

const router = useRouter();
const authStore = useAuthStore();
const styleStore = useStyleStore();
const i18n = useI18n();
const validators = useI18nValidators();

const user = reactive({
  email: '',
  password: '',
});

const rules = computed(() => {
  return {
    email: {
      required: validators.required,
      email: validators.email,
    },
    password: {
      required: validators.required,
    },
  };
});

const $externalResults = ref<ServerErrors>({});

const v$ = useVuelidate(rules, user, { $autoDirty: true, $externalResults });

const submit = async () => {
  const validationResult = await v$.value.$validate();

  if (!validationResult) {
    return;
  }

  styleStore.setIsGlobalSpinnerShown(true);

  const loginResult = await authStore.login(user);

  if (loginResult instanceof AxiosError) {
    const errors = (loginResult.response?.data as IValidationErrorResponse)
      .fields;

    for (const key in errors as any) {
      if (errors.hasOwnProperty(key)) {
        const safeKey = key as keyof typeof errors;

        errors[safeKey] = i18n.t('auth.validator.' + errors[safeKey]);
      }
    }

    $externalResults.value = errors;
  } else {
    const to = '/' + authStore.credentials.user?.roles[0].toLowerCase();
    router.push(to);
  }

  styleStore.setIsGlobalSpinnerShown(false);
};
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="submit">
    <ValidationInput
      :validation="v$.email"
      type="email"
      placeholder-locale-key="auth.email"
    />

    <ValidationInput
      :validation="v$.password"
      type="password"
      placeholder-locale-key="auth.password"
    />

    <button class="btn-flat-secondary" type="submit">
      {{ $t('auth.logIn') }}
    </button>
  </form>
</template>

<style scoped lang="scss"></style>

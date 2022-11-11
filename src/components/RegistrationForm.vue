<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import useI18nValidators from '@/hooks/useI18nValidators';
import useVuelidate, { type ServerErrors } from '@vuelidate/core';
import { reactive, computed, ref } from 'vue';
import RadioButton from '@/components/UI/RadioButton.vue';
import ValidationInput from '@/components/UI/ValidationInput.vue';
import { useAuthStore } from '@/store/auth';
import { useStyleStore } from '@/store/style';
import InfoModal from '@/components/UI/InfoModal.vue';
import { useRouter } from 'vue-router';
import type IValidationErrorResponse from '@/models/response/IValidationErrorResponse';
import { AxiosError } from 'axios';
import { Role } from '@/types/API';

const router = useRouter();
const authStore = useAuthStore();
const styleStore = useStyleStore();
const i18n = useI18n();
const validators = useI18nValidators();

const newUser = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  surname: '',
  skills: '',
  role: Role.USER,
});

const rules = computed(() => {
  return {
    email: {
      required: validators.required,
      email: validators.email,
    },
    password: {
      required: validators.required,
      minLength: validators.minLength(6),
      maxLength: validators.maxLength(32),
    },
    confirmPassword: {
      required: validators.required,
      sameAs: validators.sameAs(
        newUser.password,
        i18n.t('auth.password').toLowerCase()
      ),
    },
    name: {
      required: validators.required,
    },
    surname: {
      required: validators.required,
    },
    skills: {
      requiredIf: validators.required,
    },
  };
});

const $externalResults = ref<ServerErrors>({});

const v$ = useVuelidate(rules, newUser, { $autoDirty: true, $externalResults });

const isModalOpen = ref(false);

const submit = async () => {
  const validationResult = await v$.value.$validate();

  if (!validationResult) {
    return;
  }

  styleStore.setIsGlobalSpinnerShown(true);

  const registrationResult = await authStore.register(newUser);

  if (registrationResult instanceof AxiosError) {
    const errors = (
      registrationResult.response?.data as IValidationErrorResponse
    ).fields;

    for (const key in errors as any) {
      if (errors.hasOwnProperty(key)) {
        const safeKey = key as keyof typeof errors;

        errors[safeKey] = i18n.t('auth.validator.' + errors[safeKey]);
      }
    }

    $externalResults.value = errors;
  } else {
    isModalOpen.value = true;
  }

  styleStore.setIsGlobalSpinnerShown(false);
};
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="submit">
    <ValidationInput
      :validation="v$.email"
      :placeholder="$t('auth.email')"
      type="email"
    />
    <ValidationInput
      :validation="v$.password"
      :placeholder="$t('auth.password')"
      type="password"
    />
    <ValidationInput
      :validation="v$.confirmPassword"
      :placeholder="$t('auth.confirmPassword')"
      type="password"
    />

    <div class="separator"></div>

    <ValidationInput :validation="v$.name" :placeholder="$t('auth.name')" />
    <ValidationInput
      :validation="v$.surname"
      :placeholder="$t('auth.surname')"
    />
    <ValidationInput :validation="v$.skills" :placeholder="$t('auth.skills')" />

    <button class="btn-flat-secondary" type="submit">
      {{ $t('auth.signUp') }}
    </button>

    <InfoModal :isOpen="isModalOpen" @close="isModalOpen = false">
      <template #header>{{ $t('auth.activationModal.header') }}</template>
      <template #content>{{ $t('auth.activationModal.content') }}</template>
      <template #close-button>{{ $t('modal.closeInfo') }}</template>
    </InfoModal>
  </form>
</template>

<style scoped lang="scss">
.separator {
  background-color: gray;
  opacity: 0.2;
  height: 1px;
}

.form-group,
.form-group > .form-control {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>

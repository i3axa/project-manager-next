<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import useI18nValidators from '@/hooks/useI18nValidators';
import useVuelidate from '@vuelidate/core';
import { Role } from '@/types/Authorization';
import { reactive, computed, ref } from 'vue';
import RadioButton from '@/components/UI/RadioButton.vue';
import ValidationInput from '@/components/UI/ValidationInput.vue';
import { useAuthStore } from '@/store/auth';
import { useStyleStore } from '@/store/style';
import InfoModal from '@/components/UI/InfoModal.vue';
import { useRouter } from 'vue-router';
import type IValidationErrorResponse from '@/models/response/IValidationErrorResponse';
import { AxiosError } from 'axios';

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
  inviteCode: '',
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
      requiredIf: validators.requiredIf(newUser.role === Role.USER),
    },
    inviteCode: {
      requiredIf: validators.requiredIf(newUser.role === Role.USER),
    },
  };
});

const $externalResults = ref();

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
    const to = '/' + authStore.credentials.user?.roles[0].toLowerCase();
    router.push(to);
  }

  styleStore.setIsGlobalSpinnerShown(false);
};
</script>

<template>
  <div class="flex flex-col gap-5">
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
    <ValidationInput
      :validation="v$.confirmPassword"
      type="password"
      placeholder-locale-key="auth.confirmPassword"
    />

    <div class="separator"></div>

    <ValidationInput :validation="v$.name" placeholder-locale-key="auth.name" />
    <ValidationInput
      :validation="v$.surname"
      placeholder-locale-key="auth.surname"
    />
    <ValidationInput
      :validation="v$.skills"
      v-show="newUser.role === Role.USER"
      placeholder-locale-key="auth.skills"
    />

    <div class="separator"></div>

    <ValidationInput
      :validation="v$.inviteCode"
      v-show="newUser.role === Role.USER"
      placeholder-locale-key="auth.inviteCode"
    />

    <div class="flex flex-col gap-1">
      <RadioButton :id="'role-user'" :value="Role.USER" v-model="newUser.role">
        {{ $t('auth.user') }}
      </RadioButton>
      <RadioButton
        :id="'role-admin'"
        :value="Role.ADMIN"
        v-model="newUser.role"
      >
        {{ $t('auth.admin') }}
      </RadioButton>
    </div>

    <button class="btn-flat-secondary" @click="submit">
      {{ $t('auth.signUp') }}
    </button>

    <InfoModal :isOpen="isModalOpen" @close="isModalOpen = false">
      <template #header>{{ $t('auth.activationModal.header') }}</template>
      <template #content>{{ $t('auth.activationModal.content') }}</template>
      <template #close-button>{{ $t('modal.closeInfo') }}</template>
    </InfoModal>
  </div>
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

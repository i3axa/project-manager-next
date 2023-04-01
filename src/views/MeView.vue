<script setup lang="ts">
import { usePatchUser, useUser } from '@/api/queries';
import { useAuthStore } from '@/store/auth';
import { useStyleStore } from '@/store/style';
import { BIconPerson } from 'bootstrap-icons-vue';
import { reactive, watch } from 'vue';

const authStore = useAuthStore();
const styleStore = useStyleStore();

if (!authStore.credentials.user) {
  throw new Error('User is not authorized');
}

const queryKey: [string, string] = ['users', authStore.credentials.user.id];

const { data: user, isLoading } = useUser(queryKey);
const { mutateAsync: patchUser } = usePatchUser(queryKey);

let model = reactive({ name: '', surname: '', password: '', skills: '' });
watch(
  user,
  () => {
    if (user) {
      model = { ...model, ...user.value, password: '' };
    }
  },
  { immediate: true }
);

const onSubmit = async () => {
  styleStore.setIsSyncIndicatorToggled(true);

  await patchUser(model);

  styleStore.setIsSyncIndicatorToggled(false);
};
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center">
    <b-icon-person class="text-primary text-9xl" />

    <h2>{{ $t('updateProfile.title') }}</h2>

    <form
      v-if="!isLoading"
      class="mt-5 max-w-lg xl:w-1/3 md:w-1/2 sm:w-3/4 w-5/6 flex flex-col items-center gap-2"
      @submit.prevent="onSubmit"
    >
      <input class="form-control w-full" type="text" v-model="model.name" />
      <input class="form-control w-full" type="text" v-model="model.surname" />
      <input class="form-control w-full" type="text" v-model="model.skills" />

      <button
        class="btn-primary mt-2 w-full flex items-center justify-center"
        type="submit"
      >
        {{ $t('updateProfile.submit') }}
      </button>
    </form>
  </div>
</template>

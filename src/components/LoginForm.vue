<script setup lang="ts">
import { ref } from 'vue';
import store from '@/store';
import { AuthActions } from '@/store/modules/auth';
import { StyleMutations } from '@/store/modules/style';

const user = ref({
  email: '',
  password: '',
});

const submit = async () => {
  store.commit(StyleMutations.setIsGlobalSpinnerShown, true);
  const loginResult = await store.dispatch(AuthActions.login, user.value);
  store.commit(StyleMutations.setIsGlobalSpinnerShown, false);

  if (loginResult.name === 'AxiosError') {
    alert(loginResult.response.data.message);
  }
};
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="submit">
    <input
      class="form-control"
      type="email"
      :placeholder="$t('auth.email')"
      v-model="user.email"
      required
    />
    <input
      class="form-control"
      type="password"
      :placeholder="$t('auth.password')"
      v-model="user.password"
      required
    />
    <button class="btn-flat-secondary" type="submit">
      {{ $t('auth.logIn') }}
    </button>
  </form>
</template>

<style scoped lang="scss"></style>

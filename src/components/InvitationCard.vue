<script setup lang="ts">
import { usePatchInvitation } from '@/api';
import type IInvitation from '@/models/IInvitation';
import { useStyleStore } from '@/store/style';
import { BIconCheckLg } from 'bootstrap-icons-vue';
import { useRouter } from 'vue-router';

interface IProps {
  invitation: IInvitation;
}

const props = defineProps<IProps>();

const styleStore = useStyleStore();
const router = useRouter();

const { mutateAsync: patchInvitation } = usePatchInvitation();

const onAccept = async () => {
  styleStore.setIsGlobalSpinnerShown(true);

  await patchInvitation({
    id: props.invitation._id,
    data: {
      isResolved: true,
    },
  });

  styleStore.setIsGlobalSpinnerShown(false);

  router.push('/executor');
};
</script>

<template>
  <div
    v-if="!invitation.isResolved"
    class="card flex flex-col min-w-[250px] flex-none justify-between p-5"
  >
    <div class="max-w-[208px]">
      <div class="text-2xl font-semibold">{{ invitation.project.title }}</div>
      <p class="text-lg">{{ invitation.project.description }}</p>

      <div class="my-6 text-base font-light">
        {{ $t('speciality.' + invitation.speciality) }}
      </div>
    </div>

    <footer>
      <button class="btn-secondary" type="button" @click="onAccept">
        <b-icon-check-lg /> {{ $t('project.accept') }}
      </button>
    </footer>
  </div>
</template>

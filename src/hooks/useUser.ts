import type IUserDto from '@/models/dto/IUserDto';
import UserService from '@/services/UserService';
import { onMounted, ref } from 'vue';

export default function (id: string) {
  const user = ref<IUserDto>();
  const isLoading = ref(true);

  onMounted(async () => {
    const response = await UserService.getUser(id);

    user.value = response.data.user;
    isLoading.value = false;
  });

  return { user, isLoading };
}

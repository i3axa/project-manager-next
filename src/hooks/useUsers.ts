import type IUserDto from '@/models/dto/IUserDto';
import UserService from '@/services/UserService';
import type { UsersQuery } from '@/types/API';
import { onMounted, ref } from 'vue';

export default function (query: UsersQuery) {
  const users = ref<IUserDto[]>([]);
  const isLoading = ref(true);

  const fetch = async (query: UsersQuery) => {
    const response = await UserService.getUsers(query);

    users.value = response.data.users;
    isLoading.value = false;
  };

  onMounted(() => fetch(query));

  const refetch = async (query: UsersQuery) => {
    isLoading.value = true;

    await fetch(query);
  };

  return { users, isLoading, refetch };
}

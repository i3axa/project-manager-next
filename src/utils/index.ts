import type { MaybeRef } from '@vueuse/core';
import { isRef } from 'vue';

export const getMaybeRefValue = <T>(maybeRef: MaybeRef<T>) =>
  isRef(maybeRef) ? maybeRef.value : maybeRef;

export * from './TaskStateColumn';

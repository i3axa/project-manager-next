import type { Id } from '@/types/API';

export default interface IProject {
  _id: Id;
  title: string;
  description: string;
  isPrivate: boolean;
}

import type ITask from '@/models/ITask';
import { ref } from 'vue';

export default function () {
  const tasks = ref<ITask[]>([
    {
      id: '14',
      title: 'JS 0',
      description: 'Vue',
      difficulty: 9,
      attachments: [],
      donePercents: 0.5,
      deadline: new Date(),
    },
    {
      id: '13',
      title: 'JS 0',
      description: 'Vue',
      difficulty: 2,
      attachments: [],
      donePercents: 0.5,
      deadline: new Date(),
    },
    {
      id: '12',
      title: 'JS 0',
      description: 'Vue',
      difficulty: 1,
      attachments: [],
      donePercents: 0.5,
      deadline: new Date(),
    },
    {
      id: '11',
      title: 'JS 0',
      description: 'Vue',
      difficulty: 5,
      attachments: [],
      donePercents: 0.5,
      deadline: new Date(),
    },
    {
      id: '10',
      title: 'JS 0',
      description: 'Vue',
      difficulty: 7,
      attachments: [],
      donePercents: 0.5,
      deadline: new Date(),
    },
  ]);

  return { tasks };
}

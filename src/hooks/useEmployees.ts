import type IEmployee from '@/models/IEmployee';
import { ref } from 'vue';

export default function () {
  const employees = ref<IEmployee[]>([
    {
      id: '1',
      name: 'Vasya',
      surname: 'Babenko',
      email: 'qwer@mail.ru',
      skills: 'Frontend',
      takenTasks: [
        {
          id: '25',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 2,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '24',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 1,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '23',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 10,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '22',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 6,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '21',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 7,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
      ],
    },
    {
      id: '2',
      name: 'Vasya',
      surname: 'Babenko',
      email: 'qwer@mail.ru',
      skills: 'Frontend',
      takenTasks: [
        {
          id: '25',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 2,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '24',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 1,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '23',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 10,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '22',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 6,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '21',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 7,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
      ],
    },
    {
      id: '3',
      name: 'Vasya',
      surname: 'Babenko',
      email: 'qwer@mail.ru',
      skills: 'Frontend',
      takenTasks: [
        {
          id: '25',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 2,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '24',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 1,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '23',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 10,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '22',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 6,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '21',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 7,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
      ],
    },
    {
      id: '4',
      name: 'Vasya',
      surname: 'Babenko',
      email: 'qwer@mail.ru',
      skills: 'Frontend',
      takenTasks: [
        {
          id: '25',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 2,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '24',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 1,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '23',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 10,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '22',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 6,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '21',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 7,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
      ],
    },
    {
      id: '5',
      name: 'Vasya',
      surname: 'Babenko',
      email: 'qwer@mail.ru',
      skills: 'Frontend',
      takenTasks: [
        {
          id: '25',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 2,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '24',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 1,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '23',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 10,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '22',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 6,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
        {
          id: '21',
          title: 'JS 0',
          description: 'Vue',
          difficulty: 7,
          attachments: [],
          donePercents: 0.5,
          deadline: new Date(),
        },
      ],
    },
  ]);

  return { employees };
}

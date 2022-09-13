export default interface ITask {
  _id: string;
  title: string;
  difficulty: number;
  description: string;
  attachments: string[];
  donePercents: number;
  startTime: string;
  deadline: string;
  state: string;
  usedHours: number;
  director: string;
}

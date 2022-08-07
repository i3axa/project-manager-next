export default interface ITask {
  id: string;
  title: string;
  difficulty: number;
  description: string;
  attachments: string[];
  donePercents: number;
  deadline: Date;
}

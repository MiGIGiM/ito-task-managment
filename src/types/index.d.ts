type TTask = {
    name: string;
    description: string;
    assignee: string;
    completed: boolean;
    dueDate: Date;
}

interface ITask extends TTask {
    id: number
}
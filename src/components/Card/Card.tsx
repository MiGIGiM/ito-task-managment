import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { FC } from "react"
import useTasksStore from "../../hooks/useTasksStore";

type Props = {
    task: ITask
}

const Card: FC<Props> = ({ task }) => {
    const { deleteTask, changeCompleted } = useTasksStore()
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex flex-wrap">
            <span>{task.name}</span>{" "}
            <sub className="opacity-50">@{task.assignee}</sub>
          </h2>
          <p>{task.description}</p>
          {task.dueDate && (
            <span className="badge">{task.dueDate.toString()}</span>
          )}
          <div className="card-actions justify-end">
            <span className="btn-group">
              <button
                className="btn btn-primary"
                onClick={() => deleteTask(task.id)}
              >
                <p className="sr-only">Delete task</p>
                <TrashIcon className="w-4" />
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => changeCompleted(task.id)}
              >
                <p className="sr-only">{`${task.completed ? 'Incomplete': 'Complete'}`} task</p>
                {
                    task.completed ? (<XMarkIcon className="w-4"/>) : (<CheckIcon className="w-4" />)
                }
              </button>
            </span>
          </div>
        </div>
      </div>
    );
};

export default Card

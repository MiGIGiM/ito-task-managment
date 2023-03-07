import { FaceFrownIcon, FaceSmileIcon } from "@heroicons/react/20/solid";
import { FC } from "react"
import Card from "../Card/Card";

type Props = {
    tasks: ITask[]
    title: string
}

const CardGroup: FC<Props> = ({ tasks, title }) => (
  <div className="bg-neutral p-4 rounded-md shadow-lg w-full min-w-full">
    <h3 className="text-2xl font-bold text-center">{title}</h3>
    <div className="mt-4">
      {tasks.length === 0 ? (
        <span className="flex flex-col items-center justify-center text-neutral-content">
          {title.includes("Completed") ? <FaceFrownIcon className="w-32" /> : <FaceSmileIcon className="w-32" />}
          <h5 className="text-xl font-bold">No {`${title.includes("Completed") ? 'clompleted' : 'incompleted'} tasks`}</h5>
        </span>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  </div>
);

export default CardGroup
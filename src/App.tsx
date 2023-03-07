import { useState } from "react";
import { Button } from "./components/Button";
import CardGroup from "./components/CardGroup";
import { Modal } from "./components/Modal";
import useTasksStore from "./hooks/useTasksStore";

const App = () => {
  const [openModal, setOpenModal] = useState(false)
  const { tasks } = useTasksStore()
  return (
    <>
      <div className="my-4 mx-auto w-full max-w-xl px-4 space-y-4">
        <h1 className="text-2xl md:text-4xl font-medium text-primary text-center">
          Task Manager
        </h1>
        <p className="text-center my-4 md:text-lg">
          Welcome to the Todo app! With our app, you can easily keep track of all
          the tasks you need to accomplish.
        </p>
        <div className="text-center">
          <Button
            type="button"
            text="Add task"
            onClick={() => setOpenModal(true)}
          />
        </div>
        <div className="flex w-full flex-col items-center space-y-10 md:flex-row md:justify-around md:items-baseline md:space-x-10 md:space-y-4">
          <CardGroup tasks={tasks.filter((task) => task.completed === false)} title="Incompleted Tasks" />
          <CardGroup tasks={tasks.filter((task) => task.completed === true)} title="Completed Tasks" />
        </div>
      </div>
      <Modal isModalOpen={openModal} setIsModalOpen={setOpenModal} />
    </>
  );
}

export default App

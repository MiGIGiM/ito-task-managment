import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { Resolver, useForm } from "react-hook-form";
import useTasksStore from "../../hooks/useTasksStore";
import { formatDate, validateDate } from "../../utils/date";
import { Button } from "../Button";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const resolver: Resolver<TTask> = async (val) => {
  return {
    values: val.name ? val : {},
    errors: !val.name
      ? {
          name: {
            type: "required",
            message: "Please enter a name",
          },
          assignee: {
            type: "required",
            message: "Assign the task someone",
          },
          description: {
            type: "required",
            message: "Enter a task description",
          },
          dueDate: {
            type: "required",
            message: "Enter a due date",
          },
        }
      : {},
  };
};

const Modal: FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTask>({ resolver });
  const closeModal = () => {
    reset();
    setIsModalOpen(false);
  };

  const { addTask } = useTasksStore()

  const onSubmit = (data: TTask) => {
    addTask({
      ...data,
      completed: false,
    });
    closeModal();
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-semibold leading-6 text-primary-content"
                >
                  Add new task
                </Dialog.Title>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col space-y-4 mt-4"
                >
                  <div className="form-control w-full">
                    <label htmlFor="name_input" className="label">
                      <span className="label-text text-primary-focus">
                        Task name
                      </span>
                    </label>
                    <input
                      id="name_input"
                      type="text"
                      placeholder="Task name"
                      className="focus:border-primary-focus focus:ring-primary-focus text-black"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <label htmlFor="name_input" className="label">
                        <span className="label-text-alt text-error">
                          {errors.name.message}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label htmlFor="name_input" className="label">
                      <span className="label-text text-primary-focus">
                        Assign to
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Assignee"
                      className="focus:border-primary-focus focus:ring-primary-focus text-black"
                      {...register("assignee", { required: true })}
                    />
                    {errors.assignee && (
                      <label htmlFor="name_input" className="label">
                        <span className="label-text-alt text-error">
                          {errors.assignee.message}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label htmlFor="name_input" className="label">
                      <span className="label-text text-primary-focus">
                        Task description
                      </span>
                    </label>
                    <textarea
                      placeholder="Description"
                      className="focus:border-primary-focus focus:ring-primary-focus text-black resize-none"
                      {...register("description", { required: true })}
                    />
                    {errors.description && (
                      <label htmlFor="name_input" className="label">
                        <span className="label-text-alt text-error">
                          {errors.description.message}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label htmlFor="name_input" className="label">
                      <span className="label-text text-primary-focus">
                        Due date
                      </span>
                    </label>
                    <input
                      type="date"
                      defaultValue={formatDate()}
                      min={formatDate(new Date)}
                      className="form-input focus:border-primary-focus focus:ring-primary-focus text-black stroke-orange-700"
                      {...register("dueDate", { required: true})}
                    />
                    {errors.dueDate && (
                      <label htmlFor="name_input" className="label">
                        <span className="label-text-alt text-error">
                          {errors.dueDate.message}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="mt-4 btn-group justify-end flex">
                    <Button type="button" text="Cancel" onClick={closeModal} />
                    <Button type="submit" isPrimary text="Create" />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

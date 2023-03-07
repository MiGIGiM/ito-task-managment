import { create, StateCreator } from "zustand";
import { devtools, persist } from 'zustand/middleware'

type TTaskState = {
    tasks: ITask[]
    addTask: (data: TTask) => void;
    deleteTask: (id: number) => void;
    changeCompleted: (id: number) => void;
}

const taskSlice: StateCreator<TTaskState> = (set) => ({
    tasks: [],
    addTask: (data) => {
        set((state) => ({
            tasks: [
                ...state.tasks,
                {
                    id: state.tasks.length + 1,
                    ...data
                }
            ]
        }))
    },
    deleteTask: (id) => {
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id)
        }))
    },
    changeCompleted: (id) => {
        set((state) => ({
            tasks: state.tasks.map((task) => task.id === id ? ({ ...task, completed: !task.completed }): task )
        }))
    },
})

const useTasksStore = create<TTaskState>()(
    persist(
        devtools((...a) => ({
            ...taskSlice(...a),
        })),
        { name: 'Task-persist'}
    )
)

export default useTasksStore

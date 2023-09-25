import { Task, TaskStatus } from "@/types/Tasks";
import {
    ReactElement,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

export const taskStatus: TaskStatus[] = [
    "A fazer",
    "Em andamento",
    "Concluída",
];

export type TaskContext = {
    tasks: Task[];
    addTask: (message: string) => void;
    updateTaskStatus: (data: { status: TaskStatus; id: number }) => void;
    deleteTask: (id: number) => void;
    deleteAll: () => void;
};

type TaskProviderProps = {
    children: ReactElement;
    initialList?: Task[];
};

const TaskContexts = createContext<null | TaskContext>(null);

export const TaskProvider: React.FC<TaskProviderProps> = ({
    children,
    initialList,
}) => {
    const [tasks, setTasks] = useState<Task[]>(initialList ? initialList : []);
    const lastId =
        tasks.length === 0
            ? 0
            : tasks.reduce((max, curr) => Math.max(max, curr.id), 0) + 1;

    const addTask = (message: string) => {
        const now = new Date();
        const task: Task = {
            id: lastId,
            message,
            status: "A fazer",
            creation: now,
        };
        setTasks((prev) => addNewTask(prev, task));
    };

    const updateTaskStatus = ({
        status,
        id,
    }: {
        status: TaskStatus;
        id: number;
    }) => {
        setTasks((prev) => updateStatus(prev, { status, id }));
    };

    const deleteTask = (id: number) => {
        setTasks((prev) => deleteByID(prev, id));
    };

    const deleteAll = () => {
        setTasks([]);
        saveLocally([]);
    };

    useEffect(() => {
        setTasks((prev) => {
            if (prev.length) return prev;
            if (initialList) return [...initialList, ...getFromLocally()];
            return getFromLocally();
        });
    }, []);

    return (
        <TaskContexts.Provider
            value={{
                tasks,
                addTask,
                updateTaskStatus,
                deleteTask,
                deleteAll,
            }}
        >
            {children}
        </TaskContexts.Provider>
    );
};

export function useTasks() {
    const context = useContext(TaskContexts);

    if (context === null) {
        throw new Error("Task context is null");
    }

    return context;
}

export function saveLocally(taskList: Task[], test: boolean = false) {
    if (!test) localStorage.setItem("tasks", JSON.stringify(taskList));
}

export function getFromLocally(): Task[] {
    const saved = localStorage.getItem("tasks");
    if (saved === null) return [];
    return JSON.parse(saved);
}

export function addNewTask(
    oldTaskList: Task[],
    newTask: Task,
    test: boolean = false
) {
    const newTaskList = [...oldTaskList, newTask];
    saveLocally(newTaskList, test);
    return newTaskList;
}

export function updateStatus(
    oldTaskList: Task[],
    { status, id }: { status: TaskStatus; id: number },
    test: boolean = false
) {
    const found = oldTaskList.find((el) => el.id === id);
    if (!found) return oldTaskList;
    const newTaskList = [
        ...oldTaskList.filter((el) => el.id !== id),
        { ...found, status },
    ];
    saveLocally(newTaskList, test);
    return newTaskList;
}

export function deleteByID(
    oldTaskList: Task[],
    id: number,
    test: boolean = false
) {
    const newTaskList = oldTaskList.filter((task) => task.id !== id);
    saveLocally(newTaskList, test);
    return newTaskList;
}

import React from 'react';
import { Task, TaskStatus } from './types/Tasks'
import { ReactElement, createContext, useContext, useEffect, useState } from "react"

export const taskStatus: TaskStatus[] = ["A fazer", "Em andamento", "Concluída"];

type TaskContext = {
    tasks: Task[],
    addTask: (message: string) => void,
    updateTaskStatus: (data: { status: TaskStatus, id: number }) => void,
    deleteTask: (id: number) => void,
    deleteAll: ()=>void
}

type TaskProviderProps = {
    children: ReactElement
}

const TaskContexts = createContext<null | TaskContext>(null)

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([])
    const lastId = tasks.length === 0 ?
        0 : tasks.reduce((max, curr) =>
            Math.max(max, curr.id), 0) + 1;

    useEffect(() => {

    }, [])

    const addTask = (message: string) => {
        const now = new Date();
        const task: Task = {
            id: lastId, message, status: "A fazer", creation: now
        }
        setTasks(prev => addNewTask(prev, task))
    }

    const updateTaskStatus = ({ status, id }: { status: TaskStatus, id: number }) => {
        setTasks(prev => updateStatus(prev, { status, id }))
    }

    const deleteTask = (id: number) => {
        setTasks(prev => deleteByID(prev, id))
    }

    const deleteAll = ()=>{
        setTasks([])
    }

    useEffect(() => {
        setTasks([])
    }, [])

    return (
        <TaskContexts.Provider value={{
            tasks,
            addTask,
            updateTaskStatus,
            deleteTask,
            deleteAll
        }}>
            {children}
        </TaskContexts.Provider>
    )
}

export function useTasks():TaskContext {
    const context = useContext(TaskContexts)

    if (context === null) {
        throw new Error("Task context is null")
    }

    return context
}

export function addNewTask(oldTaskList: Task[], newTask: Task) {
    const newTaskList = [...oldTaskList, newTask]
    return newTaskList
}

export function updateStatus(oldTaskList: Task[], { status, id }: { status: TaskStatus, id: number }) {
    const found = oldTaskList.find(el => el.id === id);
    if (!found) return oldTaskList;
    const newTaskList = [...oldTaskList.filter(el => el.id !== id), { ...found, status }]
    return newTaskList;
}

export function deleteByID(oldTaskList: Task[], id: number) {
    const newTaskList = oldTaskList.filter(task => task.id !== id)
    return newTaskList
}
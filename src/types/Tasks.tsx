export type TaskStatus = "A fazer" | "Em andamento" | "Concluída"

export type Task = {
    id: number,
    message: string,
    status: TaskStatus
    creation: Date
}
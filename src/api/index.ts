import { Task, TaskStatus } from "@/types/Tasks";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:50000";

const api = {
    get: async () => {
        return new Promise<Task[]>(async (res) => {
            try {
                const result = await axios.get<Task[]>(`${baseUrl}/tasks`);
                res(result.data === null ? [] : result.data);
            } catch (error) {
                console.error(error);
                res([]);
            }
        });
    },
    post: async (params: Task) => {
        try {
            const result = await axios.post<Task>(`${baseUrl}/tasks`, null, {
                params,
            });
            return result.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    put: async (id: number, status: TaskStatus) => {
        try {
            const result = await axios.put<Task>(
                `${baseUrl}/tasks?id=${id}&status=${status}`
            );
            return result.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    delete: async (id: number) => {
        try {
            const result = await axios.delete<Task>(
                `${baseUrl}/tasks?id=${id}`
            );
            return result.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    deleteAll: async () => {
        try {
            const result = await axios.delete<Task[]>(`${baseUrl}/tasks/all`);
            return result.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};

export default api;

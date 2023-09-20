import { useTasks } from '@/contexts/Tasks'
import { ListItem, ListItemText, MenuItem, Select, SelectChangeEvent, FormControl, IconButton, Box } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { taskStatus } from "@/contexts/Tasks"
import { Task, TaskStatus } from '@/types/Tasks';
type TaskItemProps = {
    task: Task,
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const { updateTaskStatus, deleteTask } = useTasks();

    const handleStatusChange = (e: SelectChangeEvent<string>) => {
        const selected = e.target.value as TaskStatus;
        updateTaskStatus({ status: selected, id: task.id })
    }

    const handleDelete = () => {
        deleteTask(task.id)
    }

    return (
        <ListItem>
            <IconButton onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
            <ListItemText primary={task.message} />
            <FormControl size="small">
                <Select
                    id={`task-type-select-${task.id}`}
                    value={task.status}
                    onChange={handleStatusChange}
                >
                    {taskStatus.map((status, index) => {
                        return (<MenuItem key={`${task.id}-${status}-${index}`} value={status}>{status}</MenuItem>)
                    })}
                </Select>
            </FormControl>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", ml:3 }}>
                <span>{new Date(task.creation).toLocaleDateString()}</span>
                <span>{new Date(task.creation).toLocaleTimeString()}</span>
            </Box>
        </ListItem>
    )
}

import { TaskContext, taskStatus, useTasks } from '@/contexts/Tasks'
import { Divider, List as ListMUI, ListSubheader, Paper } from '@mui/material'
import React from 'react'
import { TaskItem } from "./components/TaskItem"
type ListProps = {
    contextProvided?: () => TaskContext
}

export const List: React.FC<ListProps> = (props: ListProps) => {
    const context = !props.contextProvided ? useTasks : props.contextProvided
    const { tasks } = context();
    return (
        <Paper sx={{ width: "100%", flexGrow: 1, overflow: "auto" }}>
            <ListMUI
                sx={{
                    width: "100%",
                    maxHeight: "100%",
                    bgcolor: 'background.paper',
                    position: 'relative',
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
            >
                {taskStatus.map((status, index) => (
                    <li key={`section-${status}-${index}`}>
                        <ul>
                            <ListSubheader sx={{userSelect:"none"}}>{`${status}`}</ListSubheader>
                            <Divider sx={{ mx: 2 }} />
                            {tasks.filter(task => task.status === status)
                                .map((task) => <TaskItem task={task} key={`task-item-${task.id}-${task.status}`} />)}
                        </ul>
                    </li>
                ))}
            </ListMUI>
        </Paper>
    )
}

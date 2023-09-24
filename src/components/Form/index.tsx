import { Box, Button, Paper, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { TaskContext, useTasks } from '@/contexts/Tasks';

type FormProps = {
    contextProvided?: () => TaskContext
}

export const Form: React.FC<FormProps> = (props: FormProps) => {
    const [checkIcon, setCheckIcon] = useState(<CheckIcon sx={{ fontSize: 55, color: "#8F8" }} />)
    const [message, setMessage] = useState<string>("")
    const context = !props.contextProvided ? useTasks : props.contextProvided

    const { addTask, deleteAll } = context();
 
    const handleAdd = () => {
        if (!message.length) return alert("Nenhuma mensagem escrita")
        addTask(message)
        setMessage("");
    }

    useEffect(() => {
        const pressEnter = (e: KeyboardEvent) => e.key === "Enter" ? handleAdd() : null

        addEventListener("keydown", pressEnter)
        return () => {
            removeEventListener('keydown', pressEnter);
        }
    })

    return (
        <Paper sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: 'space-around',
            gap: 3
        }}>
            <Tooltip title="Deletar todas as tarefas">
                <Box
                    onMouseEnter={() => setCheckIcon(<ClearIcon sx={{ fontSize: 55, color: "#F88" }} />)}
                    onMouseLeave={() => setCheckIcon(<CheckIcon sx={{ fontSize: 55, color: "#8F8" }} />)}
                    sx={{ transition: "0.5s ease all", cursor:"pointer" }}
                    onClick={deleteAll}
                >
                    {checkIcon}
                </Box>
            </Tooltip>
            <TextField
                id="input-mensagem" label="Tarefa" variant="filled"
                sx={{ flexGrow: 1 }} value={message} onChange={(e) => setMessage(e.target.value)}
            />
            <Button id="input-adicionar" onClick={handleAdd}>Adicionar</Button>
        </Paper>
    )
}

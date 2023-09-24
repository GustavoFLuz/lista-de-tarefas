import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./main.css"
import { TaskProvider } from './contexts/Tasks.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TaskProvider initialList={[
    {
        id: 1,
        message: "Task 1",
        status: "A fazer",
        creation: new Date(),
    },

    {
        id: 2,
        message: "Task 2",
        status: "Concluída",
        creation: new Date(),
    },

    {
        id: 3,
        message: "Task 2",
        status: "Em andamento",
        creation: new Date(),
    },
]}>
      <App />
    </TaskProvider>
  </React.StrictMode>,
)

import {expect, test } from 'vitest'
import { addNewTask, taskStatus, deleteByID, updateStatus } from './Tasks'
import { Task } from '@/types/Tasks'

test('should add an item to list',()=>{
    const list:Task[] = []
    const task = {
        id: 1,
        message: "Mensagem",
        status: taskStatus[0],
        creation: new Date()
    }
    const newList = addNewTask(list,task, true)

    expect(newList.length).toBeGreaterThan(list.length)
    
})

test('should delete an item from the list',()=>{
    const task = {
        id: 1,
        message: "Mensagem",
        status: taskStatus[0],
        creation: new Date()
    }

    const list:Task[] = [task]

    const newList = deleteByID(list,1,true)

    expect(newList.length).toBeLessThan(list.length)

})

test('shoul change task status to "Em andamento"', ()=>{
    const task = {
        id: 1,
        message: "Mensagem",
        status: taskStatus[0],
        creation: new Date()
    }
    const list:Task[] = [task]

    const updatedList = updateStatus(list,{taskStatus;1;},true)
})
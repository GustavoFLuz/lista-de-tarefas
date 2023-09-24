import { describe, expect, test } from 'vitest'
import { addNewTask, taskStatus, deleteByID, updateStatus } from '../../src/contexts/Tasks'
import { Task } from '@/types/Tasks'


describe('Create, Update, Delete Functions Test Suit', () => {
    test('should add an item to list', () => {
        const list: Task[] = []
        const task = {
            id: 1,
            message: "Mensagem",
            status: taskStatus[0],
            creation: new Date()
        }
        const newList = addNewTask(list, task, true)

        expect(newList.length).toBeGreaterThan(list.length)

    })

    describe('Delete Operations Test', () => {

        test('should delete an item from the list', () => {
            const task = {
                id: 1,
                message: "Mensagem",
                status: taskStatus[0],
                creation: new Date()
            }

            const list: Task[] = [task]

            const newList = deleteByID(list, 1, true)

            expect(newList.length).toBeLessThan(list.length)

        })
    })

    describe('Update Operations Test', () => {
        test('should change task status to "Em andamento"', () => {
            const task: Task = {
                id: 1,
                message: "Mensagem",
                status: taskStatus[0],
                creation: new Date()
            }
            const list: Task[] = [task]



            const updatedList = updateStatus(list, { status: taskStatus[1], id: 1 }, true)

            expect(updatedList[0].status).toBe(taskStatus[1])
        })

        test('should change task status to "Concluída"', () => {
            const task: Task = {
                id: 1,
                message: "Mensagem",
                status: taskStatus[0],
                creation: new Date()
            }
            const list: Task[] = [task]

            const updatedList = updateStatus(list, { status: taskStatus[2], id: 1 }, true)

            expect(updatedList[0].status).toBe(taskStatus[2])
        })

    })

})
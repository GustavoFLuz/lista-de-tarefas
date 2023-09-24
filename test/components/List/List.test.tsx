import {describe, expect, it } from 'vitest'
import {render} from '@testing-library/react';
import { List } from '../../../src/components/List';
import {TaskProvider, taskStatus, useTasks } from '../../contexts/MockContext';
import { Task } from '../../contexts/types/Tasks';


const initialList:Task[] = [
    {
        id: 1,
        message: "Task 1",
        status: taskStatus[0],
        creation: new Date()
    },

    {
        id: 2,
        message: "Task 2",
        status: taskStatus[1],
        creation: new Date()
    },

    {
        id: 3,
        message: "Task 2",
        status: taskStatus[1],
        creation: new Date()
    }

]


describe("List Component Test", ()=>{

    it("should render nothing at start",()=>{

        const {container} = render(
            <TaskProvider>
                <List contextProvided={useTasks}></List>
            </TaskProvider>
                
        )
        
        const itemNumber = container.querySelectorAll('.TaskItem').length

        expect(itemNumber).toBe(0)
    })

   it("should render an item when we add it", ()=>{
       

    })


})


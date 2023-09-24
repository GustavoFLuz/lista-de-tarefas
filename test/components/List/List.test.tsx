import {describe, expect, test } from 'vitest'
import {render, screen} from '@testing-library/react';
import { List } from '../../../src/components/List';
import {TaskProvider, useTasks } from '../../contexts/MockContext';

describe("List Component Test", ()=>{
    test("Do nothing",()=>{
        render(
            <TaskProvider>
                <List contextProvided={useTasks}></List>
            </TaskProvider>
                
        )
    })
})


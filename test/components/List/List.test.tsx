import App from '@/App';
import {describe, expect, test } from 'vitest'
import {render, screen} from '@testing-library/react';
import { List } from '../../../src/components/List';

describe("List Component Tes", ()=>{
    test("Do nothing",()=>{
        render(<List></List>)
    })
})


import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Form } from "@/components/Form";
import { TaskProvider, useTasks } from "@/contexts/Tasks";
import userEvent from "@testing-library/user-event";


describe('Input test', () =>{

    it('should initialize empty', () => {
        const {container} = render(
            <TaskProvider>
                <Form contextProvided={useTasks}></Form>
            </TaskProvider>
        );

        const formValue = container.querySelector('#input-mensagem') as HTMLInputElement

        expect(formValue.value).toEqual("")

    })

    it('should be able to change its value', async () => {
        const {container} = render(
            <TaskProvider>
                <Form contextProvided={useTasks}></Form>
            </TaskProvider>
        );

        const formValue = container.querySelector('#input-mensagem') as HTMLInputElement

        await userEvent.type(formValue, 'Fazer o trabalho')

        expect(formValue.value).toEqual('Fazer o trabalho')

    })

})

describe('Button test', () =>{

    it('should trigger an alert if the input is empty', async () => {
        const {container} = render(
            <TaskProvider>
                <Form contextProvided={useTasks}></Form>
            </TaskProvider>
        );

        const botao = container.querySelector('#input-adicionar') as HTMLButtonElement

        let capturedAlertMessage;
        window.alert = (message) => {
            capturedAlertMessage = message;
        };

        await userEvent.click(botao)

        expect(capturedAlertMessage).toBe('Nenhuma mensagem escrita');

    })

})

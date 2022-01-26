import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import DisplayMessagesController from "./display-messages.component";

test('testing render table messages component', async () => {
    render(<DisplayMessagesController/>)
    expect(screen.getAllByRole('table')).toHaveLength(1)
})
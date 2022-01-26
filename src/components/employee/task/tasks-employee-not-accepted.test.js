import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import TasksEmployeeNotAccepted from "./tasks-employee_not_accepted.component";

test('testing render card tasks not accepted', async () => {
    render(<TasksEmployeeNotAccepted/>)
    expect(screen.getAllByRole('cards')).toHaveLength(1)
})

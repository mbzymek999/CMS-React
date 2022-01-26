import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import TasksEmployeeDone from "../components/employee/task/tasks-employee-done.component";

test('testing render card tasks done', async () => {
    render(<TasksEmployeeDone/>)
    expect(screen.getAllByRole('cards')).toHaveLength(1)
})

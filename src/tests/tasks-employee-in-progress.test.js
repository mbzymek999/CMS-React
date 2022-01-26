import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import TasksEmployeeInProgress from "../components/employee/task/tasks-employee-in-progress.component";

test('testing render card tasks in progress', async () => {
    render(<TasksEmployeeInProgress/>)
    expect(screen.getAllByRole('cards')).toHaveLength(1)
})

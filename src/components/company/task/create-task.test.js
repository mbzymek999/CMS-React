import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CreateTaskController from "./create-task.component";

test('testing form create task', async () => {
    render(<CreateTaskController/>)
        expect(screen.getAllByRole('name')).toHaveLength(1)
        expect(screen.getAllByRole('description')).toHaveLength(1)
})




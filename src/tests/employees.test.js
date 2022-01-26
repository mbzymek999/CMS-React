import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import EmployeesController from "../components/company/employee/employees.component";

test('testing rendering table employees', async () => {
    render(<EmployeesController/>)
    expect(screen.getAllByRole('table')).toHaveLength(1)
})




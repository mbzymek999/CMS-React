import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import DisplayCompaniesController from "../components/admin/company/display-companies.component";

test('testing render table companies component', async () => {
    render(<DisplayCompaniesController/>)
    expect(screen.getAllByRole('table')).toHaveLength(1)
})
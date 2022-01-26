import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import DisplayCompaniesController from "./display-companies.component";

test('testing render table companies component', async () => {
    render(<DisplayCompaniesController/>)
    expect(screen.getAllByRole('table')).toHaveLength(1)
})
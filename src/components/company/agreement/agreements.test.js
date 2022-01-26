import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import AgreementsController from "./agreements-component";

test('testing render table agreements', async () => {
    render(<AgreementsController/>)
    expect(screen.getAllByRole('table')).toHaveLength(1)
})




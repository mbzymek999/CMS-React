import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import AllPaymentsController from "../components/admin/payment/all-payments.component";

test('testing payment table', async () => {
    render(<AllPaymentsController/>)
    expect(screen.getAllByRole('table')).toHaveLength(1)
})




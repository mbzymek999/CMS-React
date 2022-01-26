import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import MessageEmailComponent from "./message-email.component";

test('testing render form message', async () => {
    render(<MessageEmailComponent/>)
    expect(screen.getAllByRole('form')).toHaveLength(1)
})

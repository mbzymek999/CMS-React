import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeComponent from "../components/home.component";

test('testing render home component', async () => {
    render(<HomeComponent/>)
    expect(screen.getAllByRole('home')).toHaveLength(1)
})



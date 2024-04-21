

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Homebody from '@/app/(components)/Homebody'

describe('home page', () => {
  it('renders a heading', () => {
    render(<Homebody />)
    const heading = screen.getByRole('button')

    expect(heading).toBeInTheDocument()
  })
})

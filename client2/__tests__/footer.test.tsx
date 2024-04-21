

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '@/app/(components)/Footer'
describe('footer page', () => {
  it('renders a footer content', () => {
    render(<Footer/>)

    const myElem = screen.getByText('reserved') 

    expect(myElem).toBeInTheDocument()
  
  })
})


import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Navbar from '@/app/(components)/Navbar'

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(() => [
      {
        user: {
          name: 'John Doe',
        },
      },
      'authenticated',
    ]),
  }));

describe('navbar component page', () => {

  it('renders a navbar components', () => {
    render(<Navbar />)
 
    const myElem = screen.getByText('About Medbot') 

    expect(myElem).toBeInTheDocument()
  })

  it('renders a navbar components', () => {
    render(<Navbar />)
 
    const myElem = screen.getByText('Get Started') 

    expect(myElem).toBeInTheDocument()
  })

  it('renders a navbar components', () => {
    render(<Navbar />)
 
    const myElem = screen.getByText('Login') 

    expect(myElem).toBeInTheDocument()
  })
})

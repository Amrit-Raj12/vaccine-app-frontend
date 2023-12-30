import { render, screen } from '@testing-library/react'
import Modal from './Modal'

test('renders button', () =>{
    render(<Modal  />);
    const button = screen.getByText('open')
    expect(button).toBeInTheDocument();
})
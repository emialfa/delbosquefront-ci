import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Navbar from '.'

describe('<Navbar />', () => {
    test('Component is renderized', () => {
        render(<Navbar />);
        expect(screen.getByText('Productos')).toBeInTheDocument();
        expect(screen.getByText('Categorias')).toBeInTheDocument();
        expect(screen.getByText('Pedidos')).toBeInTheDocument();
    })
})
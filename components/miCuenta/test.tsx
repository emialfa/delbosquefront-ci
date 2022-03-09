import {render, screen} from '@testing-library/react'
import MiCuenta from './';
import '@testing-library/jest-dom'

describe("<miCuenta />", () => {
    test('miCuenta are returned', () => {
        render(<MiCuenta hide={true} setHide={jest.fn()} handleLogout={jest.fn()} />)
        
        expect(screen.getByText('Mis Favoritos')).toBeInTheDocument();
    })
})
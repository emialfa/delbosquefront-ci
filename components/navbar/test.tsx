import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Navbar from '.';
import { createTestStore } from '../../utils/createTestStore';
import { login } from '../../store/actions/user'
 
let store:any;
describe('<Navbar />', () => {
    beforeEach(() => {
        store = createTestStore();
    })
    test('Login user, then menu Mi cuenta are visibled and Ingresar are not visible.', () => {
        store.dispatch(login('test', false))
        render(
            <Provider store={store}>
                <Navbar categories={{lines: [], types: []}} />
            </Provider>
        );
        expect(screen.getByText('Mi cuenta')).toBeVisible()
        expect(screen.queryByText('Ingresar')).toBeNull()
    })
    test('User is null, then menu Mi cuenta are not visible.', () => {
        render(
            <Provider store={store}>
                <Navbar categories={{lines: [], types: []}} />
            </Provider>
        );
        expect(screen.queryByText('Mi cuenta')).toBeNull()
        expect(screen.getByText('Ingresar')).toBeInTheDocument()
    })
})
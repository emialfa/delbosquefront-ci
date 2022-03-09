import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MenuProducts from '.'
import { typeTest } from '../../utils/typeTest'

describe('<MenuProducts />', () => {
    test('Added types of products are returned', () => {
        render(<MenuProducts hide={true} setHide={jest.fn()} categories={{lines: [], types: [typeTest]}}/>)

        expect(screen.getByText(typeTest.name)).toBeInTheDocument()
    })
    test('Component display is none, then types are not returned', () => {
        render(<MenuProducts hide={false} setHide={jest.fn()} categories={{lines: [], types: [typeTest]}}/>)

        expect(screen.getByText(typeTest.name)).not.toBeVisible()
    })
})
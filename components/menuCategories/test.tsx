import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MenuCategories from '.'
import { categoryTest } from '../../utils/categoryTest'

describe('<MenuCategories />', () => {
    test('Added categories are returned',() => {
        render(<MenuCategories hide={true} setHide={jest.fn()} categories={{lines: [categoryTest], types: []}}/>)

        expect(screen.getByText(categoryTest.name)).toBeInTheDocument()
    })
    test('Component display is none, then categories are not visible', () => {
        render(<MenuCategories hide={false} setHide={jest.fn()} categories={{lines: [categoryTest], types: []}}/>)

        expect(screen.getByText(categoryTest.name)).not.toBeVisible()
    })
})
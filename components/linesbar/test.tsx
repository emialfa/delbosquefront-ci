import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LinesBar from '.'
import { categoryTest } from '../../utils/categoryTest'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('<LinesBar />', () => {
    beforeEach(() => {
        useRouter.mockImplementationOnce(() => ({
            query: { name: 'all' },
          }))
    })
    test('Added categories are returned', () => {
        render(<LinesBar categories={{lines: [categoryTest], types: []}}/>)
        expect(screen.getByText(categoryTest.name)).toBeInTheDocument()
    })
})
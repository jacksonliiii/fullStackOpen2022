import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

/* 
*   run tests normally:
*   $env:CI=$true; npm test
*   
*   run tests with coverage:
*   $env:CI=$true; npm test -- --coverage
*   
*   Print HTML of a component to the terminal:
*   screen.debug()
*/

const blog = {
    title: 'Drink Fire',
    author: 'Fire Lord',
    url: 'www.fire.com',
    likes: 66,
    user: {
        username: 'Mark',
        name: 'Mark Ham',
        id: '4'
    }
}

test('renders content and expect certain props to be rendered', () => {
    const { container } = render(<Blog blog={blog} />)

    const lessInfoDiv = container.querySelector('.lessInfo')
    const moreInfoDiv = container.querySelector('.moreInfo')

    expect(lessInfoDiv).toHaveStyle('display: block')
    expect(lessInfoDiv).toHaveTextContent(blog.title)
    expect(lessInfoDiv).toHaveTextContent(blog.author)

    expect(moreInfoDiv).toHaveStyle('display: none')
})

test('renders content, click view and expect all props to be rendered', async () => {
    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('View')

    const lessInfoDiv = container.querySelector('.lessInfo')
    const moreInfoDiv = container.querySelector('.moreInfo')

    const urlText = container.querySelector('.url')
    const likesText = container.querySelector('.likes')

    expect(urlText).not.toBeVisible()
    expect(likesText).not.toBeVisible()

    await user.click(button)
    expect(urlText).toBeVisible()
    expect(likesText).toBeVisible()
    expect(lessInfoDiv).toHaveStyle('display: none')
    expect(moreInfoDiv).toHaveStyle('display: block')

    
})

test('click like button twice and event handler called twice', async () => {
    const mockHandler = jest.fn()
    const clicks = 3

    render(<Blog blog={blog} handleLike={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('Like')
    for (let i = 0; i < clicks; i++) {
        await user.click(button)
    }

    expect(mockHandler.mock.calls).toHaveLength(clicks)
})

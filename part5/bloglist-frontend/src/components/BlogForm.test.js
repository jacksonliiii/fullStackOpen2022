import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('creating a blog calls the event handler with the right prop details', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('Enter title of blog here...')
    const authoreInput = screen.getByPlaceholderText('Enter author of blog here...')
    const urlInput = screen.getByPlaceholderText('Enter URL of blog here...')
    const createButton = screen.getByText('Create Blog')

    await user.type(titleInput, 'Testing Title')
    await user.type(authoreInput, 'Testing Author')
    await user.type(urlInput, 'Testing URL')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Testing Author')
    expect(createBlog.mock.calls[0][0].url).toBe('Testing URL')
})

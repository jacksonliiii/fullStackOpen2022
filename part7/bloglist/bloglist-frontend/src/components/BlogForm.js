import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const resetForm = () => {
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })
        resetForm()
    }

    return (
        <div className='formDiv'>
            <h1>My Blogs</h1>
            <h2>Create a new Blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title: <input
                        value={newTitle}
                        onChange={({ target }) => setNewTitle(target.value)}
                        placeholder='Enter title of blog here...'
                        id='title-input'
                    />
                </div>
                <div>
                    Author: <input
                        value={newAuthor}
                        onChange={({ target }) => setNewAuthor(target.value)}
                        placeholder='Enter author of blog here...'
                        id='author-input'
                    />
                </div>
                <div>
                    URL: <input
                        value={newUrl}
                        onChange={({ target }) => setNewUrl(target.value)}
                        placeholder='Enter URL of blog here...'
                        id='url-input'
                    />
                </div>
                <div>
                    <button type="submit">Create Blog</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm
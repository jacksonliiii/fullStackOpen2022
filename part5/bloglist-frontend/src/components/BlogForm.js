const BlogForm = ({
    addBlog,
    newTitle,
    newAuthor,
    newUrl,
    setNewTitle,
    setNewAuthor,
    setNewUrl
}) => (
    <div>
        <h1>My Blogs</h1>
        <h2>Create a new Blog</h2>
        <form onSubmit={addBlog}>
            <div>
                Title: <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
            </div>
            <div>
                Author: <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
            </div>
            <div>
                URL: <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
            </div>
            <div>
                <button type="submit">Create Blog</button>
            </div>
        </form>
    </div>
)

export default BlogForm
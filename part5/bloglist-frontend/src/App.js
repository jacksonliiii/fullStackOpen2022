import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [info, setInfo] = useState({ message: null })

  const blogFormRef = useRef()

  const notifyWith = (message, type = 'info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null })
    }, 3000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const resetForm = () => {
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const addBlog = (event) => {
    event.preventDefault()

    blogService.create({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }).then(createdBlog => {
      blogFormRef.current.toggleVisibility()
      notifyWith(`A new blog '${createdBlog.title}' by ${createdBlog.author} was added.`)
      setBlogs(blogs.concat(createdBlog))
      resetForm()
    })
  }

  const removeBlog = (blog) => {

    if (window.confirm(`Do you want to remove blog ${blog.title}?`)) {
      blogService
        .remove(blog.id)
        .then(response => {
          notifyWith(`Blog '${blog.title}' was removed.`)
          setBlogs(blogs.filter(currBlog => currBlog.id !== blog.id))
        })
        .catch(error => {
          notifyWith(`${error}`, 'error')
        })
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map((currBlog) => (currBlog.id === blog.id ? updatedBlog : currBlog)))
    } catch (error) {
      notifyWith(`${error}`, 'error')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('Wrong username or password', 'error')
      setTimeout(() => {
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      blogService.setToken('')
      setUser(null)
    } catch (exception) {
      setTimeout(() => {
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h1>Log in to BlogList</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          Password
          <input
            type="text"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>

  )

  const blogPage = () => (
    <div>
      <h2>My Blogs</h2>
      <div>
        <h3>{user.username} logged in</h3>
        <button onClick={handleLogout}>Logout</button>
        <Togglable buttonLabel='Add a new Blog' ref={blogFormRef}>
          <BlogForm
            addBlog={addBlog}
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            setNewTitle={setNewTitle}
            setNewAuthor={setNewAuthor}
            setNewUrl={setNewUrl}
          />
        </Togglable>
      </div>
      {
        blogs
          .sort((blogA, blogB) => blogB.likes - blogA.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              currUser={user}
              handleLike={handleLike}
              removeBlog={removeBlog}
            />
          )
      }
    </div>
  )

  return (
    <div>
      <Notification info={info} />
      {user === null && loginForm()}
      {user !== null && blogPage()}
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
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
      notifyWith(`A new blog '${createdBlog.title}' by ${createdBlog.author} was Added.`)
      setBlogs(blogs.concat(createdBlog))
    })

    resetForm()
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

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification info={info} />

      {!user &&
        <Togglable buttonLabel='Login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }

      {user &&
        <div>
          <h3>{user.username} logged in</h3>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel='New Blog'>
            <BlogForm
              addBlog={addBlog}
              newTitle={newTitle}
              newAuthor={newAuthor}
              newUrl={newUrl}
              setNewTitle={setNewTitle}
              setNewAuthor={setNewAuthor}
              setNewURL={setNewUrl}
            />
          </Togglable>
          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )
          }
        </div>
      }
    </div>
  )
}

export default App
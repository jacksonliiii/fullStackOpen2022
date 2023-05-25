import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

import { useNotificationDispatch } from "./components/NotificationContext";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useNotificationDispatch()

  const [info, setInfo] = useState({ message: null });

  const blogFormRef = useRef();

  const notifyWith = (message, type = "info") => {

    // dispatch({})
    
    setInfo({
      message,
      type,
    });

    setTimeout(() => {
      setInfo({ message: null });
    }, 3000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((createdBlog) => {
      blogFormRef.current.toggleVisibility();
      notifyWith(
        `A new blog '${createdBlog.title}' by ${createdBlog.author} was added.`
      );
      setBlogs(blogs.concat(createdBlog));
    });
  };

  const removeBlog = (blog) => {
    if (window.confirm(`Do you want to remove blog ${blog.title}?`)) {
      blogService
        .remove(blog.id)
        .then((response) => {
          notifyWith(`Blog '${response.title}' was removed.`);
          setBlogs(blogs.filter((currBlog) => currBlog.id !== blog.id));
        })
        .catch((error) => {
          notifyWith(`${error}`, "error");
        });
    }
  };

  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      await blogService.update(blog.id, updatedBlog);
      setBlogs(
        blogs.map((currBlog) =>
          currBlog.id === blog.id ? updatedBlog : currBlog
        )
      );
    } catch (error) {
      notifyWith(`${error}`, "error");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notifyWith("Wrong username or password", "error");
      setTimeout(() => {}, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem("loggedBlogAppUser");
      blogService.setToken("");
      setUser(null);
    } catch (exception) {
      setTimeout(() => {}, 5000);
    }
  };

  const loginPage = () => (
    <div>
      <Togglable buttonLabel="Head to Login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Togglable>
    </div>
  );

  const blogPage = () => (
    <div>
      <h2>My Blogs</h2>
      <div>
        <h3>{user.username} logged in</h3>
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <Togglable buttonLabel="Add a new Blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      <div className="allBlogs">
        <table>
          <tbody>
            {blogs
              .sort((blogA, blogB) => blogB.likes - blogA.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  currUsername={user.username}
                  handleLike={handleLike}
                  removeBlog={removeBlog}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <h1>BlogList</h1>
      <Notification info={info} />
      {user === null && loginPage()}
      {user !== null && blogPage()}
    </div>
  );
};

export default App;

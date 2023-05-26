import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Route, Routes, Link, useNavigate, useParams } from "react-router-dom";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { getUsers } from "./services/users";

import { useNotificationDispatch } from "./components/NotificationContext";
import { useUserValue, useUserDispatch } from "./components/UserContext";

const App = () => {
  const blogResult = useQuery("blogs", blogService.getAll, { retry: 3 });

  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();
  const userValue = useUserValue();
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    getUsers().then((returnedUsers) => {
      setUsers(returnedUsers);
    });
  }, []);

  if (blogResult.isLoading) {
    return <div>Loading blogs...</div>;
  }
  if (blogResult.isError) {
    return <div>Blog service not available due to problems in server!</div>;
  }
  const blogs = blogResult.data;

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((createdBlog) => {
      blogFormRef.current.toggleVisibility();
      notificationDispatch({
        message: `A new blog '${createdBlog.title}' by ${createdBlog.author} was added.`,
        type: "info",
      });
      queryClient.invalidateQueries("blogs");
    });
  };

  const removeBlog = (blog) => {
    if (window.confirm(`Do you want to remove blog ${blog.title}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          notificationDispatch({
            message: `Blog '${blog.title}' was removed.`,
            type: "info",
          });
          queryClient.invalidateQueries("blogs");
        })
        .catch((error) => {
          notificationDispatch({
            message: `${error}`,
            type: "error",
          });
        });
    }
  };

  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      await blogService.update(blog.id, updatedBlog);
      queryClient.invalidateQueries("blogs");
    } catch (error) {
      notificationDispatch({
        message: `${error}`,
        type: "error",
      });
    }
  };

  const handleComment = async (comment, id) => {
    try {
      await blogService.postComment(comment, id);
      queryClient.invalidateQueries("blogs");
    } catch (error) {
      notificationDispatch({
        message: `${error}`,
        type: "error",
      });
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
      userDispatch(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notificationDispatch({
        message: "Wrong username or password",
        type: "error",
      });
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem("loggedBlogAppUser");
      blogService.setToken("");
      userDispatch(null);
    } catch (exception) {
      notificationDispatch({
        message: exception,
        type: "error",
      });
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
        <h3>{userValue.username} logged in</h3>
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div>
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
                <tr key={blog.id}>
                  <td>
                    <Link key={blog.id} to={`/blogs/${blog.id}`}>
                      {blog.title} {blog.author}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const Menu = () => {
    const padding = {
      paddingRight: 10,
    };
    const menuStyle = {
      margin: 20,
    };
    return (
      <div style={menuStyle}>
        <Link to="/" style={padding}>
          Blogs
        </Link>
        <Link to="/users" style={padding}>
          Users
        </Link>
      </div>
    );
  };

  const Users = () => (
    <div>
      <h1>Users Data</h1>
      <table>
        <tbody>
          <tr>
            <th>Users</th>
            <th>Blogs Created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const User = () => {
    const [user, setUser] = useState(null);
    const id = useParams().id;

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const users = await getUsers();
          const foundUser = users.find((user) => user.id === id);
          setUser(foundUser);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUser();
    }, []);
    if (!user) {
      return <div>Loading user...</div>;
    }
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Added Blogs</h2>
        <ul>
          {user.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="container">
      <Menu />
      <h1>BlogList App</h1>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {userValue === null && loginPage()}
              {userValue !== null && blogPage()}
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blogs={blogs}
              handleLike={handleLike}
              handleComment={handleComment}
              remove={removeBlog}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

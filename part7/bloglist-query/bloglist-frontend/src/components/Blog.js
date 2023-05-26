import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserValue } from "./UserContext";
import { Table, Form, Button } from "react-bootstrap";

const Blog = ({ blogs, handleLike, handleComment, removeBlog }) => {
  const [newComment, setNewComment] = useState("");
  const [blog, setBlog] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    const fetchBlog = () => {
      try {
        const allBlogs = blogs;
        const foundBlog = allBlogs.find((b) => b.id === id);
        setBlog(foundBlog);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [handleLike, handleComment]);
  if (!blog) {
    return <div>Loading blog...</div>;
  }

  const addComment = (event) => {
    event.preventDefault();
    handleComment(newComment, id);
    setNewComment("");
  };

  const showToAddedUser = {
    display: useUserValue.username === blog.user.username ? "" : "none",
  };

  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    paddingRIght: 2,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "#ccc",
    marginBottom: 2,
  };

  return (
    <Table striped>
      <tbody>
        <tr style={blogStyle}>
          <td>
            <div>
              <h1>
                {blog.title} {blog.author}
              </h1>
              <a href={blog.url} className="url">
                {blog.url}
              </a>
              <p className="likes">
                {`Likes: ${blog.likes}`}{" "}
                <button className="likeButton" onClick={() => handleLike(blog)}>
                  Like
                </button>
              </p>
              <p>Added by {blog.user.name}</p>
              <button
                id="remove-button"
                style={showToAddedUser}
                onClick={() => removeBlog(blog)}
              >
                Remove
              </button>

              <h1>Comments</h1>
              <form onSubmit={addComment}>
                <input
                  value={newComment}
                  onChange={({ target }) => setNewComment(target.value)}
                  placeholder="Leave a comment..."
                />
                <button type="submit">Add Comment</button>
              </form>
              <div>
                <ul>
                  {blog.comments.map((comment) => {
                    return <li key={comment}>{comment}</li>;
                  })}
                </ul>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Blog;

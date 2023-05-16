import { useState } from 'react'
import { PropTypes } from 'prop-types'

const Blog = ({ blog, currUser, handleLike, removeBlog }) => {
  const [moreInfo, setMoreInfo] = useState(false)
  const hideInfoWhenVisible = { display: moreInfo ? 'none' : '' }
  const showInfoWhenVisible = { display: moreInfo ? '' : 'none' }

  const showToAddedUser = { display: (currUser.username === blog.user.username) ? '' : 'none' }

  const toggleInfo = () => {
    setMoreInfo(!moreInfo)
  }

  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    paddingRIght: 2,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#ccc',
    marginBottom: 2,
  }

  return (
    <div style={blogStyle}>
      <div style={hideInfoWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleInfo}>View</button>
      </div>
      <div style={showInfoWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick={toggleInfo}>Hide</button></p>
        <p>{blog.url}</p>
        <p>{`Likes: ${blog.likes}`} <button onClick={() => handleLike(blog)}>Like</button></p>
        <p>{blog.user.name}</p>
        <button style={showToAddedUser} onClick={() => removeBlog(blog)}>Remove</button>
      </div>
    </div>
  )
}

Blog.displayName = 'Blog'

export default Blog
import { useState } from 'react'

const Blog = ({ blog, currUsername, handleLike, removeBlog }) => {
  const [moreInfo, setMoreInfo] = useState(false)
  const hideInfoWhenVisible = { display: moreInfo ? 'none' : '' }
  const showInfoWhenVisible = { display: moreInfo ? '' : 'none' }

  const showToAddedUser = { display: (currUsername === blog.user.username) ? '' : 'none' }

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
    <div style={blogStyle} className='allInfo'>
      <div style={hideInfoWhenVisible} className='lessInfo'>
        {blog.title} {blog.author} <button onClick={toggleInfo} className='toggleInfo'>View</button>
      </div>
      <div style={showInfoWhenVisible} className='moreInfo'>
        <p>{blog.title} {blog.author} <button onClick={toggleInfo}>Hide</button></p>
        <p className='url'>{blog.url}</p>
        <p className='likes'>{`Likes: ${blog.likes}`} <button onClick={() => handleLike(blog)}>Like</button></p>
        <p>{blog.user.name}</p>
        <button style={showToAddedUser} onClick={() => removeBlog(blog)}>Remove</button>
      </div>
    </div>
  )
}

export default Blog
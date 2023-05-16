import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [moreInfo, setMoreInfo] = useState(false)
  const hideInfoWhenVisible = { display: moreInfo ? 'none' : '' }
  const showInfoWhenVisible = { display: moreInfo ? '' : 'none' }

  const handleLike = (event) => {
    event.preventDefault()

    blogService.update({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    }).then((updatedBlog => {
      console.log(updatedBlog);
    }))
  }

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
        <p>{`Likes: ${blog.likes}`} <button onClick={handleLike}>Like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog
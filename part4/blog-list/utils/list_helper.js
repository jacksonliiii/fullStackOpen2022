const lodash = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => {
  const total = blogs.reduce((acc, obj) => acc + obj.likes, 0);

  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const favorite = blogs.reduce((prev, current) => ((prev.likes > current.likes) ? prev : current));

  return favorite;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  // Count how many blogs exist for each author
  const blogCount = lodash.countBy(blogs, 'author');
  const mostBlogsAuthor = lodash.maxBy(Object.keys(blogCount), (author) => blogCount[author]);

  return {
    author: mostBlogsAuthor,
    blogs: blogCount[mostBlogsAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const mostLikesAuthor = lodash.chain(blogs)
    .groupBy('author')
    .mapValues((authorBlogs) => lodash.sumBy(authorBlogs, 'likes'))
    .toPairs()
    .maxBy(lodash.last)
    .value();

  return {
    author: mostLikesAuthor[0],
    likes: mostLikesAuthor[1],
  };
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
};

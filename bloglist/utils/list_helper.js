const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  let sumLikes = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < blogs.length; i++) {
    sumLikes += blogs[i].likes;
  }
  return sumLikes;
};

const favouriteBlog = (blogs) => {
  let favoriteIndex = 0;
  let maxLikes = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikes) {
      maxLikes = blogs[i].likes;
      favoriteIndex = i;
    }
  }
  return {
    title: blogs[favoriteIndex].title,
    author: blogs[favoriteIndex].author,
    likes: blogs[favoriteIndex].likes,
  };
};

module.exports = {
  totalLikes, dummy, favouriteBlog,
};

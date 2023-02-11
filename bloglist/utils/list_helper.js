const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  let sumLikes = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < blogs.length; i++) {
    sumLikes += blogs[i].likes;
  }
  return sumLikes;
};

module.exports = {
  totalLikes, dummy,
};

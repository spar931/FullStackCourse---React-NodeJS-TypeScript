/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};

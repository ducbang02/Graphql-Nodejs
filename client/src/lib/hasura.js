const axios = require('axios'); // Thêm dòng này để import Axios
require('dotenv').config();


const hasuraAPI = process.env.REACT_APP_API_BASE_URL;
const headers = {
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': process.env.REACT_APP_API_AUTH_TOKEN,
};

module.exports = {hasuraAPI, headers}

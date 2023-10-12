
const axios = require('axios'); // Thêm dòng này để import Axios
require('dotenv').config();


const hasuraAPI = process.env.API_BASE_URL;
const headers = {
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': process.env.API_AUTH_TOKEN,
};

module.exports = {hasuraAPI, headers}


  
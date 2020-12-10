const express = require('express');
const { getComplaint,postComplaint } = require('../controllers/studetController');

const studentRouter = express.Router();

studentRouter
  .route('/complaint')
  .get(getComplaint)
  .post(postComplaint);


module.exports = studentRouter
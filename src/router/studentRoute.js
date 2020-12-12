const express = require('express');
const { getComplaint,postComplaint } = require('../controllers/studentController');

const studentRouter = express.Router();

studentRouter
  .route('/complaint')
  .post(postComplaint);
studentRouter
  .route('/complaint/:id')
  .get(getComplaint)

module.exports = studentRouter
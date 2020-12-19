const express = require('express');
const {
  getComplaint,
  postComplaint,
  studentLogin,
  getDetails
} = require('../controllers/studentController');
const {  isValidAuth } = require('../util/auth');

const studentRouter = express.Router();

studentRouter.route('/login').post(studentLogin);
studentRouter.use(isValidAuth)
studentRouter.route('/complaint').post(postComplaint);
studentRouter.route('/complaint/:id').get(getComplaint);
studentRouter.route('/details/:id').get(getDetails);

module.exports = studentRouter;

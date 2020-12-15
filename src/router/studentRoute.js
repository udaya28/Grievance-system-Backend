const express = require('express');
const {
  getComplaint,
  postComplaint,
  studentLogin,
} = require('../controllers/studentController');
const { authLogout, isValidAuth } = require('../util/auth');

const studentRouter = express.Router();

studentRouter.route('/login').post(studentLogin);
studentRouter.use(isValidAuth)
studentRouter.route('/complaint').post(postComplaint);
studentRouter.route('/complaint/:id').get(getComplaint);

module.exports = studentRouter;

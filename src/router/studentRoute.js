const express = require('express');
const {
  getComplaint,
  postComplaint,
  studentLogin,
} = require('../controllers/studentController');
const { authLogout, isValidAuth } = require('../util/auth');

const studentRouter = express.Router();

studentRouter.route('/login').post(studentLogin);
studentRouter.route('/logout').post(authLogout);
// studentRouter.use(isValidAuth);
studentRouter.route('/complaint', isValidAuth).post(postComplaint);
studentRouter.route('/complaint/:id', isValidAuth).get(getComplaint);

module.exports = studentRouter;

const express = require('express');
const {
  getComplaint,
  postComplaint,
  studentLogin,
  studentLogout,
  studentAuth
} = require('../controllers/studentController');

const studentRouter = express.Router();

studentRouter.route('/complaint').post(postComplaint);
studentRouter.route('/complaint/:id').get(getComplaint);
studentRouter.route('/login').post(studentLogin);
studentRouter.route('/logout').post(studentLogout);
studentRouter.route('/auth').post(studentAuth)

module.exports = studentRouter;

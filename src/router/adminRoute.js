const express = require('express');
const {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  responseComplaint,
  getComplaints,
  adminLogin,
} = require('../controllers/adminController');

const { authLogout, isValidAuth } = require('../util/auth');

const adminRouter = express.Router();

adminRouter.route('/login').post(adminLogin);
adminRouter.route('/logout').post(authLogout);
adminRouter.use(isValidAuth);

adminRouter.route('/studentDetails',isValidAuth).get(getStudent).post(createStudent);

adminRouter
  .route('/studentDetails/:id',isValidAuth)
  .patch(updateStudent)
  .delete(deleteStudent);

adminRouter.route('/complaint',isValidAuth).get(getComplaints).patch(responseComplaint);

module.exports = adminRouter;

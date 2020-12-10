const express = require('express');
const {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  responseComplaint,
  getComplaints
} = require('../controllers/adminController');

const adminRouter = express.Router();
adminRouter
  .route('/studentDetails')
  .get(getStudent)
  .post(createStudent)
  .patch(updateStudent)
  .delete(deleteStudent);

adminRouter
  .route('/complaint')
  .get(getComplaints)
  .patch(responseComplaint);

module.exports = adminRouter;

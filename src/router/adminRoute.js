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


adminRouter
  .route('/complaint')
  .get(getComplaints)
  .patch(responseComplaint);

adminRouter
  .route('/studentDetails/:id')
  .patch(updateStudent)
  .delete(deleteStudent);

module.exports = adminRouter;

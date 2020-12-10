const express = require('express');
const { createStudent ,updateStudent,deleteStudent,getStudent } = require('../controllers/adminController');

const adminRouter = express.Router();
adminRouter
  .route('/studentDetails')
  .get(getStudent)
  .post(createStudent)
  .patch(updateStudent)
  .delete(deleteStudent);



adminRouter.route('/complaints').get((req, res) => {
  res.send('all complaints');
});

module.exports = adminRouter;

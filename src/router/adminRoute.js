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

const { isValidAuth } = require('../util/auth');

const adminRouter = express.Router();

adminRouter.route('/login').post(adminLogin);
adminRouter.use(isValidAuth);
adminRouter.use((req, res, next) => {
  if (req.isAdmin) {
    next();
  } else {
    res.status(401).json({ status: 'fail' });
  }
});
adminRouter.route('/studentDetails').get(getStudent).post(createStudent);

adminRouter
  .route('/studentDetails/:id')
  .patch(updateStudent)
  .delete(deleteStudent);

adminRouter.route('/complaint').get(getComplaints).patch(responseComplaint);

module.exports = adminRouter;

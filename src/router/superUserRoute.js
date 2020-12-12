const express = require('express');
const {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdmin,
} = require('../controllers/superUserController');

const superUserRouter = express.Router();
superUserRouter
  .route('/admin')
  .get(getAdmin)
  .post(createAdmin)
  
superUserRouter
  .route('/admin/:id')  
  .patch(updateAdmin)
  .delete(deleteAdmin);
  

module.exports = superUserRouter;

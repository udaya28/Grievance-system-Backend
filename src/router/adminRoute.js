const express = require('express');

const adminRouter = express.Router();

adminRouter
  .route('/')
  .get((req, res) => {res.send("hello")})
  .post(() => console.log('hi'));


module.exports = adminRouter;
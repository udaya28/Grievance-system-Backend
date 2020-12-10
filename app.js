const express = require('express');
const morgan = require('morgan');
const adminRouter = require('./src/router/adminRoute')
const studentRouter = require('./src/router/studentRoute')
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('  🍀 . 🍀 . 🍀 . 🍀 . 🍀  ');
  next();
});

app.use('/admin',adminRouter);
app.use('/student',studentRouter)
module.exports = app;
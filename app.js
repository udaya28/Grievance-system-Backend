const express = require('express');
const morgan = require('morgan');
const adminRoute = require('./src/router/adminRoute')
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('  🍀 . 🍀 . 🍀 . 🍀 . 🍀  ');
  next();
});

app.use('/admin',adminRoute);
module.exports = app;
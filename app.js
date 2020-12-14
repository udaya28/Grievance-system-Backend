const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
const adminRouter = require('./src/router/adminRoute');
const studentRouter = require('./src/router/studentRoute');
const superUserRouter = require('./src/router/superUserRoute');
const { isValidAuth } = require('./src/util/auth');
app.use((req, res, next) => {
  console.log('  🍀  🍀  🍀  🍀  🍀  ');
  next();
});

// app.use('/', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use('/admin', adminRouter);
app.use('/student', studentRouter);
app.use('/superUser', superUserRouter);

module.exports = app;

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(cors({credentials: true, origin: 'https://udaya28.github.io/'}));
// https://udaya28.github.io/
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
const adminRouter = require('./src/router/adminRoute');
const studentRouter = require('./src/router/studentRoute');
const superUserRouter = require('./src/router/superUserRoute');
const { isValidAuth, checkAuth } = require('./src/util/auth');
app.use((req, res, next) => {
  console.log('  🍀  🍀  🍀  🍀  🍀  ');
  next();
});

app.get('/auth',checkAuth)
app.use('/admin', adminRouter);
app.use('/student', studentRouter);
app.use('/superUser', superUserRouter);

module.exports = app;

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('🍀..🍀..🍀..🍀..🍀');
  next();
});


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);

module.exports = app;
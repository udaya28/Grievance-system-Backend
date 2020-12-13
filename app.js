const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));
const adminRouter = require('./src/router/adminRoute')
const studentRouter = require('./src/router/studentRoute');
const superUserRouter = require('./src/router/superUserRoute');
app.use((req, res, next) => {
  console.log('  🍀  🍀  🍀  🍀  🍀  ');
  next();
});

app.use('/admin',adminRouter);
app.use('/student',studentRouter)
app.use('/superUser',superUserRouter)


app.get('/set-cookies',(req,res)=>{
  
  res.cookie('name','udaya vivek',{maxAge:10000000,httpOnly:true,})
  res.send('send')
})

app.get('/get-cookies',(req,res)=>{
  
  const cookie = req.cookies
  res.send(cookie)
})



module.exports = app;
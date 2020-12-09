const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dotenv = require('dotenv');
const app = require('./app');
  
dotenv.config({ path: './.env' });

const port = process.env.PORT || 8000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

  
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
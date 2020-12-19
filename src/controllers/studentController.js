const Complaint = require('../model/complaintModel');
const jwt = require('jsonwebtoken');
const studentDetails = require('../model/studentModel');
const bcrypt = require('bcrypt');



exports.getDetails = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.userId);
    if (req.userId === id) {
      let details = await studentDetails.find({ _id: id });
      // console.log(...details)
      details[0].password = '';
      res.status(200).json({
        status: 'success',
        details
      });
    }else {
      res.status(401).json({
        status: 'fail',
        message: 'student id does not match with token id',
      });
    }
  } 
  catch (error) {
    console.log(error)
    res.status(404).json({
      status: 'failed in code',
      message: error,
    });
  }
};


exports.getComplaint = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.userId);
    if (req.userId === id) {
      const complaints = await Complaint.find({ studentId: id });
      res.status(200).json({
        status: 'success',
        data: {
          complaints,
        },
      });
    }else {
      res.status(401).json({
        status: 'fail',
        message: 'student id does not match with token id',
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.postComplaint = async (req, res) => {
  try {
    console.log(req.userId);
    if (req.userId === req.body.data.studentId) {
      const createdComplaint = await Complaint.create(req.body.data);
      res.status(201).json({
        status: 'success',
        data: {
          createdComplaint,
        },
      });
    } else {
      res.status(401).json({
        status: 'fail',
        message: 'student id does not match with token id',
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.studentLogin = async (req, res) => {
  const { rollNumber, password } = req.body.data;
  const user = await studentDetails.findOne({ rollNumber });
  // console.log(user,req.body.data)
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: `${1000 * 60 * 30}ms`,//30 min
      });
      // res.cookie('token', token, { httpOnly: true, maxAge: 1296000000  });
      res.status(200).json({ status: 'success', token,id:user._id });
    } else {
      res.status(401).json({ status: 'fail' });
    }
  } else {
    res.status(401).json({ status: 'fail' });
  }
};

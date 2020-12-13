const Complaint = require('../model/complaintModel');
const jwt = require('jsonwebtoken');
const studentDetails = require('../model/studentModel');
const bcrypt = require('bcrypt');
exports.getComplaint = async (req, res) => {
  try {
    const id = req.params.id;
    const complaints = await Complaint.find({ _id: id });
    res.status(200).json({
      status: 'success',
      data: {
        complaints,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.postComplaint = async (req, res) => {
  try {
    const createdComplaint = await Complaint.create(req.body.data);
    res.status(201).json({
      status: 'success',
      data: {
        createdComplaint,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.studentLogin = async (req, res) => {
  const { rollNumber, password } = req.body.data;
  // console.log(rollNumber,password,process.env.JWT_SECRET)
  const user = await studentDetails.findOne({ rollNumber });
  if (user) {
    console.log(user)
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
    
      res.status(200).json({ status: 'success',user });
    } else {
      res.status(401).json({ status: 'fail' });
    }
  } else {
    res.status(401).json({ status: 'fail' });
  }
};

exports.studentLogout = async (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
};

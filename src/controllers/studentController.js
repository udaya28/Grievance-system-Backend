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
  // console.log(rollNumber, password, typeof process.env.JWT_SECRET);
  const user = await studentDetails.findOne({ rollNumber });
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '15d',
      });
      res.cookie('token', token, { httpOnly: true, maxAge: 1296000000 });
      res.status(200).json({ status: 'success' });
    } else {
      res.status(400).json({ status: 'fail' });
    }
  } else {
    res.status(400).json({ status: 'fail' });
  }
};

exports.studentLogout = async (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.status(200).send();
};

exports.studentAuth = async (req, res) => {
  console.log(req.cookies)
  if (req.cookies.token) {
    const token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(400).json({ status: 'fail' });
      }
      console.log(decodedToken);
      res.status(200).send();
    });
  } else {
    res.status(400).json({ status: 'fail' });
  }
};

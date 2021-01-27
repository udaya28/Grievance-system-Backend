const complaint = require('../model/complaintModel');
const studentDetails = require('../model/studentModel');
const AdminDetails = require('../model/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getStudent = async (req, res) => {
  try {
    const Students = await studentDetails.find({});
    res.status(200).json({
      status: 'success',
      data: {
        Students,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const data = req.body.data;
    const {
      firstName,
      secondName,
      rollNumber,
      password,
      departmentName,
      jointYear,
      gender,
      dateOfBirth,
    } = data;
    const arrData = [
      firstName,
      secondName,
      rollNumber,
      password,
      departmentName,
      jointYear,
      gender,
      dateOfBirth,
    ];
    const flag = arrData.every((data)=>{
      return data !== undefined
    })
    // console.log(flag)
    // console.log(arrData)
    if(flag){
      const isExist = await userAlreadyExist(data.rollNumber);
      if (!isExist) {
        const createdStudent = await studentDetails.create(req.body.data);
        res.status(201).json({
          status: 'success',
          data: {
            createdStudent,
          },
        });
      } else {
        res.status(404).json({
          status: 'fail',
          message: 'User already exist',
        });
      }
    }else{
      res.status(404).json({
        status: 'fail',
        message: 'data missing',
      });
    }
    
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedStudent = await studentDetails.updateOne(
      { _id: id },
      req.body.data
    );
    res.status(200).json({
      status: 'success',
      data: {
        updatedStudent,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedStudent = await studentDetails.deleteOne({ _id: id });
    if (deletedStudent.deletedCount === 1) {
      res.status(204).json({
        status: 'success',
      });
    } else {
      res.status(200).json({
        status: 'fail',
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const allComplaints = await complaint.find({});
    res.status(200).json({
      status: 'success',
      data: {
        allComplaints,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.responseComplaint = async (req, res) => {
  try {
    const { id, data } = { ...req.body.data };
    const { response } = data;
    const currentComplaint = await complaint.findOne(id);
    // console.log(currentComplaint);
    if (typeof response !== 'string') {
      res.status(404).json({
        status: 'fail',
        message: 'invalid payload',
      });
    }
    if (currentComplaint.response === '') {
      const responseMade = await complaint.updateOne(id, {
        response,
        status: 'replayed',
      });
      res.status(200).json({
        status: 'success',
        data: {
          responseMade,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'already responded',
      });
    }
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const userAlreadyExist = async (data) => {
  const user = await studentDetails.find({ rollNumber: data });
  if (user.length === 0) {
    return false;
  } else {
    return true;
  }
};

exports.adminLogin = async (req, res) => {
  const { userName, password } = req.body.data;
  const user = await AdminDetails.findOne({ userName });
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign(
        { id: user._id, isAdmin: true },
        process.env.JWT_SECRET,
        {
          expiresIn: `${1000 * 60 * 30}ms`, //30 min
        }
      );
      // res.cookie('token', token, { httpOnly: true, maxAge: 60*30*1000 });
      res.status(200).json({ status: 'success', token });
    } else {
      res.status(401).json({ status: 'fail' });
    }
  } else {
    res.status(401).json({ status: 'fail' });
  }
};

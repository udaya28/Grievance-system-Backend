const complaint = require('../model/complaintModel');
const studentDetails = require('../model/studentModel');

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
    const isExist = await userAlreadyExist(data.rollNumber);
    if(!isExist){
      const createdStudent = await studentDetails.create(req.body.data);
      res.status(201).json({
        status: 'success',
        data: {
          createdStudent,
        },
      });
    }else{
      res.status(404).json({
        status: 'fail',
        message: "User already exist",
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
    const updatedStudent = await studentDetails.updateOne(
      req.body.data.old,
      req.body.data.new
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
    const updatedStudent = await studentDetails.deleteOne(req.body.data);
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
    const responseMade = await complaint.updateOne(id, data);
    res.status(200).json({
      status: 'success',
      data: {
        responseMade,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};


const userAlreadyExist = async data =>{
  const user = await studentDetails.find({rollNumber:data})
  if(user.length === 0){
    return false
  }else{
    return true
  }

}
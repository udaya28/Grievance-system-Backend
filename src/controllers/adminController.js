const studentDetails = require('../model/userModel');

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
    const createdStudent = await studentDetails.create(req.body.data);
    res.status(201).json({
      status: 'success',
      data: {
        createdStudent,
      },
    });
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

const complaint = require('../model/complaintModel');
const studentDetails = require('../model/studentModel');
const AdminDetails = require('../model/AdminModel');


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
    const id = req.params.id
    const updatedStudent = await studentDetails.updateOne(
      {_id:id},
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
    const id = req.params.id
    const deletedStudent = await studentDetails.deleteOne({_id:id});
    if(deletedStudent.deletedCount === 1){
      res.status(204).json({
      status: 'success',
    });
    }else{
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



exports.adminLogin = async (req, res) => {
  const { userName, password } = req.body.data;
  const user = await AdminDetails.findOne({ userName });
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 60*30,
      });
      res.cookie('token', token, { httpOnly: true, maxAge: 60*30*1000 });
      res.status(200).json({ status: 'success' });
    } else {
      res.status(400).json({ status: 'fail' });
    }
  } else {
    res.status(400).json({ status: 'fail' });
  }
};



const AdminDetails = require('../model/AdminModel');

exports.getAdmin = async (req, res) => {
  try {
    const Admins = await AdminDetails.find({});
    res.status(200).json({
      status: 'success',
      data: {
        Admins,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const data = req.body.data;
    const isExist = await adminAlreadyExist(data.userName);
    console.log(isExist)
    if(!isExist){
      const createdAdmin = await AdminDetails.create(req.body.data);
      res.status(201).json({
        status: 'success',
        data: {
          createdAdmin,
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

exports.updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await AdminDetails.updateOne(
      req.body.data.old,
      req.body.data.new
    );
    res.status(200).json({
      status: 'success',
      data: {
        updatedAdmin,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const updatedAdmin = await AdminDetails.deleteOne(req.body.data);
    res.status(200).json({
      status: 'success',
      data: {
        updatedAdmin,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const adminAlreadyExist = async data =>{
    const user = await AdminDetails.find({userName:data})
    if(user.length === 0){
      return false
    }else{
      return true
    }
  
  }
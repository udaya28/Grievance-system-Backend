const Complaint = require('../model/complaintModel');

exports.getComplaint = async (req, res) => {
    try {
      const complaints = await Complaint.find(req.body.id);
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

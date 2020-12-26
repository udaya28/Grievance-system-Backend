const jwt = require('jsonwebtoken');
exports.isValidAuth = async (req, res, next) => {
  // console.log()
  if (req.headers.token) {
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ status: 'fail' });
      }
      req.userId = decodedToken.id;
      req.isAdmin = decodedToken.isAdmin && true 
      req.isStudent = decodedToken.isStudent && true 
      // console.log(decodedToken)
      // console.log(req.userId,req.isAdmin)
      next();
    });
  } else {
    res.status(401).json({ status: 'fail' });
  }
};




exports.checkAuth = async (req, res, next) => {
  // console.log(req)
  if (req.headers.token) {
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ status: 'fail' });
      }
      // console.log(decodedToken);
      if (decodedToken) {
        // console.log(Date.now() , decodedToken.exp * 1000)
        if (Date.now() <= decodedToken.exp * 1000) {
          req.user = decodedToken.id;
          res.status(200).json({ status: 'success', id: decodedToken.id });
        } else {
          res.status(401).json({ status: 'fail' });
        }
      }
    });
  } else {
    res.status(401).json({ status: 'fail' });
  }
};
